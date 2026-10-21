import { lessons } from '@/lib/transmission'

export function CourseOutline() {
  return <div className="lesson-list">{lessons.map(lesson => <details className="lesson-outline" key={lesson.n} open={lesson.n === 1}>
    <summary><span className="lesson-n">{String(lesson.n).padStart(2,'0')}</span><span className="lesson-summary-copy"><strong>{lesson.title}</strong><small>{lesson.line}</small></span><span className="lesson-toggle" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 10h12" /><path className="lesson-toggle-vertical" d="M10 4v12" /></svg></span></summary>
    <div className="lesson-detail">
      {lesson.description.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <p className="eyebrow">IN THIS LESSON</p><ul>{lesson.covers.map(item => <li key={item}>{item}</li>)}</ul>
      <p className="eyebrow">A PRACTICE TO EXPLORE</p><p className="lesson-practice">{lesson.practice}</p>
    </div>
  </details>)}</div>
}
