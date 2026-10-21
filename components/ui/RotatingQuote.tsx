'use client'

import { useState, useEffect } from 'react'

const quotes = [
  "Intensity without capacity is just a more sophisticated form of avoidance.",
  "What burns is not the practitioner. What burns is everything the practitioner mistook for themselves.",
  "The fire was never the problem. The problem was what you did in the first half-second after it lit.",
  "The face you have been looking for is the one you have been afraid to show.",
  "The self is not what you are. It is what being does when it forgets it is moving.",
  "The structure built to protect the path becomes the last thing the path needs you to release.",
  "Meaning is not discovered. It is fabricated. And the one who fabricates it is also fabricated.",
  "Reactivity does not begin with your reaction. It begins with a preference you never noticed forming.",
  "Purification ends not when nothing remains, but when nothing needs to.",
  "Awakening does not end the question. It relocates it — from what you know to how you meet what is here.",
]

export function RotatingQuote() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * quotes.length))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % quotes.length)
        setVisible(true)
      }, 600)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <blockquote
      className={`font-body text-base sm:text-lg text-text-secondary italic leading-relaxed transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      &ldquo;{quotes[index]}&rdquo;
    </blockquote>
  )
}
