'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { JournalArticle } from '@/lib/field-guide-content'

export function FieldGuideJournal({ articles }: { articles: JournalArticle[] }) {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('all')
  const topics = [...new Set(articles.flatMap(article => article.tags))].sort()
  const visible = articles.filter(article => (topic === 'all' || article.tags.includes(topic)) && `${article.title} ${article.excerpt} ${article.tags.join(' ')}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
  return <>
    <section className="resource-intro journal-intro wrap"><h1 className="resource-title">Notes from<br /> <em>practice.</em></h1><p className="resource-deck">The maps, the blind spots, and the places where practice meets the rest of your life.</p></section>
    <section className="journal-library wrap" aria-label="Article library">
      <div className="journal-controls"><div className="topic-filters" role="group" aria-label="Filter articles by topic">{['all',...topics].map(tag => <button key={tag} type="button" aria-pressed={topic === tag} onClick={() => setTopic(tag)}>{tag === 'all' ? 'All topics' : tag.charAt(0).toUpperCase()+tag.slice(1)}</button>)}</div>
        <div className="journal-search"><label htmlFor="journal-search">Find an article</label><input id="journal-search" type="search" placeholder="Search the journal" autoComplete="off" value={query} onChange={e => setQuery(e.target.value)} /></div>
      </div>
      <p className="journal-results eyebrow" aria-live="polite">{visible.length} {visible.length === 1 ? 'ESSAY' : 'ESSAYS'} TO EXPLORE</p>
      <div className="journal-grid">{visible.map((article,index) => <Link className={`journal-card ${index === 0 ? 'featured-reading' : ''}`} href={`/articles/${article.slug}`} key={article.slug}>
        <div className="journal-image">{article.image && <img src={article.image} alt="" loading="lazy" />}<span className="reading-number" aria-hidden="true">{String(index+1).padStart(2,'0')}</span></div>
        <div className="journal-card-copy"><p className="eyebrow">{article.tags[0]} / {article.readingTime} MIN READ</p><h2>{article.title}</h2><p>{article.excerpt}</p><span className="reading-link">Read the article <span aria-hidden="true">↗</span></span></div>
      </Link>)}</div>
      {visible.length === 0 && <div className="journal-empty"><h2>No essays match that search.</h2><p>Try another phrase or return to all topics.</p><button type="button" onClick={() => {setQuery('');setTopic('all')}}>Show all essays ↗</button></div>}
    </section>
  </>
}
