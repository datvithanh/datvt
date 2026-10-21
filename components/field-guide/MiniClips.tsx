import { WorkshopPlaylist } from '@/components/content/WorkshopPlaylist'
import { getPackageClips } from '@/lib/media'

export function MiniClips() {
  const playlist = getPackageClips('transmission-101-staying-present').filter(clip => clip.priority).map(clip => ({ youtubeId: clip.youtubeId, title: clip.title, sub: clip.ledBy ? `Transmission 101 · Led by ${clip.ledBy}` : 'Transmission 101', description: clip.summary, start: clip.start, duration: clip.duration }))
  return <section id="videos" className="wrap fg-native-modules"><h2>A taste of the practice.</h2><WorkshopPlaylist videos={playlist} queueTitle="Transmission 101 — Selected Clips" /></section>
}
