#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const mediaDir = path.join(root, 'content', 'media')
const PLAYLIST_SLUG = /^lesson-\d+$/

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (err) {
    return { __parseError: err.message }
  }
}

function fail(errors, message) {
  errors.push(message)
}

function warn(warnings, message) {
  warnings.push(message)
}

if (!fs.existsSync(mediaDir)) {
  console.error(`Missing media directory: ${mediaDir}`)
  process.exit(1)
}

const files = fs.readdirSync(mediaDir)
  .filter(file => file.endsWith('.json'))
  .sort()

const packages = new Map()
const errors = []
const warnings = []

for (const file of files) {
  const filePath = path.join(mediaDir, file)
  const pkg = readJson(filePath)
  if (pkg.__parseError) {
    fail(errors, `${file}: invalid JSON (${pkg.__parseError})`)
    continue
  }

  if (!pkg.id) fail(errors, `${file}: missing package id`)
  if (!pkg.title) fail(errors, `${file}: missing package title`)
  if (!pkg.topic) fail(errors, `${file}: missing package topic`)
  if (!Array.isArray(pkg.videos)) fail(errors, `${file}: videos must be an array`)
  if (pkg.id && packages.has(pkg.id)) fail(errors, `${file}: duplicate package id "${pkg.id}"`)
  if (pkg.id) packages.set(pkg.id, { file, pkg })
}

const globalVideoKeys = new Map()
const globalYouTubeIds = new Map()
const videoRefs = []
const packageRefs = []

for (const { file, pkg } of packages.values()) {
  const videos = Array.isArray(pkg.videos) ? pkg.videos : []
  const ids = new Set()
  const lessons = new Set((pkg.lessons ?? []).map(lesson => lesson.day))

  if (pkg.packages && !Array.isArray(pkg.packages)) {
    fail(errors, `${file}: packages must be an array when present`)
  }

  for (const ref of pkg.packages ?? []) {
    if (!ref.id) fail(errors, `${file}: package ref missing id`)
    else if (!packages.has(ref.id)) fail(errors, `${file}: package ref "${ref.id}" does not exist`)
  }

  for (const video of videos) {
    const label = `${pkg.id}:${video.id ?? '(missing id)'}`

    for (const field of ['id', 'title', 'summary', 'youtubeId']) {
      if (!video[field]) fail(errors, `${file}: ${label} missing ${field}`)
    }

    if (video.id) {
      if (ids.has(video.id)) fail(errors, `${file}: duplicate video id "${video.id}"`)
      ids.add(video.id)
      if (PLAYLIST_SLUG.test(video.id)) {
        fail(errors, `${file}: video id "${video.id}" is reserved for playlist routes`)
      }

      const key = `${pkg.id}:${video.id}`
      if (globalVideoKeys.has(key)) {
        fail(errors, `${file}: duplicate global video key "${key}" also in ${globalVideoKeys.get(key)}`)
      }
      globalVideoKeys.set(key, file)
    }

    if (video.youtubeId) {
      const prior = globalYouTubeIds.get(video.youtubeId)
      if (prior) warn(warnings, `${file}: YouTube id "${video.youtubeId}" also used by ${prior}`)
      else globalYouTubeIds.set(video.youtubeId, label)
    }

    if (video.clipOf && !videos.some(candidate => candidate.id === video.clipOf)) {
      fail(errors, `${file}: ${label} clipOf "${video.clipOf}" does not exist in package`)
    }

    if (video.lesson != null && typeof video.lesson !== 'number') {
      fail(errors, `${file}: ${label} lesson must be a number`)
    }

    if (video.lesson != null && lessons.size > 0 && !lessons.has(video.lesson)) {
      warn(warnings, `${file}: ${label} references lesson ${video.lesson}, not listed in package lessons`)
    }

    for (const ref of video.relatedMedia ?? []) {
      if (ref.type === 'video') videoRefs.push({ file, label, ref })
      else if (ref.type === 'article') {
        if (!ref.slug) fail(errors, `${file}: ${label} related article missing slug`)
      } else {
        fail(errors, `${file}: ${label} relatedMedia has unknown type "${ref.type}"`)
      }
    }
  }

  for (const ref of pkg.relatedMedia ?? []) {
    if (ref.type === 'video') packageRefs.push({ file, ref })
    else if (ref.type === 'article') {
      if (!ref.slug) fail(errors, `${file}: package related article missing slug`)
    } else {
      fail(errors, `${file}: package relatedMedia has unknown type "${ref.type}"`)
    }
  }
}

for (const { file, label, ref } of videoRefs) {
  const target = `${ref.packageId}:${ref.id}`
  if (!globalVideoKeys.has(target)) fail(errors, `${file}: ${label} related video "${target}" does not exist`)
}

for (const { file, ref } of packageRefs) {
  const target = `${ref.packageId}:${ref.id}`
  if (!globalVideoKeys.has(target)) fail(errors, `${file}: package related video "${target}" does not exist`)
}

const packageCount = packages.size
const videoCount = Array.from(packages.values()).reduce((sum, { pkg }) => sum + (pkg.videos?.length ?? 0), 0)
const staticVideoCount = Array.from(packages.values()).reduce(
  (sum, { pkg }) => sum + (pkg.videos ?? []).filter(video => video.id && !PLAYLIST_SLUG.test(video.id)).length,
  0,
)
const playlistCount = Array.from(packages.values()).reduce((sum, { pkg }) => {
  const days = new Set((pkg.lessons ?? []).map(lesson => lesson.day))
  for (const video of pkg.videos ?? []) {
    if (video.lesson != null) days.add(video.lesson)
  }
  return sum + days.size
}, 0)

for (const message of warnings) console.warn(`WARN ${message}`)
for (const message of errors) console.error(`ERROR ${message}`)

console.log(`Checked ${packageCount} media packages, ${videoCount} videos.`)
console.log(`Static routes: ${packageCount} package pages, ${staticVideoCount} watch pages, ${playlistCount} playlist pages.`)

if (errors.length > 0) process.exit(1)
