export function LessonVideo({ src, title }: { src: string; title?: string }) {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-sm border border-border bg-black">
      <iframe
        src={src}
        title={title || 'Lesson video'}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}
