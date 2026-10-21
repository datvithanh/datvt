'use client'

import { useState, useEffect } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isUrgent: boolean
  hasExpired: boolean
}

function calculateTimeLeft(targetDate: Date, urgentDays: number = 7): TimeLeft {
  const now = new Date().getTime()
  const target = targetDate.getTime()
  const difference = target - now

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isUrgent: true, hasExpired: true }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    isUrgent: Math.floor(difference / (1000 * 60 * 60 * 24)) <= urgentDays,
    hasExpired: false,
  }
}

export function CountdownTimer({ targetDate, label }: { targetDate: Date; label?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  if (timeLeft.hasExpired) {
    return null
  }

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hrs' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Sec' },
  ]

  return (
    <div className="text-center py-4">
      <p className={`font-heading text-xs uppercase tracking-[0.2em] mb-4 ${timeLeft.isUrgent ? 'text-accent' : 'text-text-muted'}`}>
        {label || 'Applications Close In'}
      </p>
      <div className="flex justify-center gap-6 sm:gap-8">
        {units.map(u => (
          <div key={u.label} className="text-center">
            <span className={`font-heading text-2xl sm:text-3xl tabular-nums ${timeLeft.isUrgent ? 'text-accent' : 'text-text-primary'}`}>
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="block font-body text-xs text-text-muted uppercase tracking-wider mt-1">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
