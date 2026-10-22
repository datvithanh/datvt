import Link from 'next/link'
import { getFieldGuideArticles } from '@/lib/field-guide-content'
import { NextStep } from './NextStep'

export function ResourcesContent() {
  const articles = getFieldGuideArticles().slice(0, 6)
  return <>
    <section className="resource-intro resource-hub-intro wrap"><h1 className="resource-title">Get a feel<br /> for the practice.</h1><p className="resource-deck">Free courses and writing for your practice. Begin with Transmission 101, or explore the blog.</p></section>
    <div className="resource-columns wrap">
      <section className="resource-course" aria-labelledby="resource-course-heading"><h2 id="resource-course-heading">Free courses.</h2>
        <article className="course-discovery"><Link className="course-discovery-image" href="/transmission-101" aria-label="Explore Transmission 101"><img src="/images/ppw-hero.jpg" alt="A teacher seated for a Transmission 101 practice session" /></Link>
          <div className="course-discovery-copy"><p className="eyebrow">FREE / SELF-PACED / 5 LESSONS</p><h3>Transmission 101</h3><p>Five lessons on the small, constant act of leaving the present, and what it takes to stay.</p><Link className="button" href="/transmission-101">Explore the course <span aria-hidden="true">↗</span></Link></div>
        </article>
      </section>
      <section className="resource-blog" aria-labelledby="resource-blog-heading"><h2 id="resource-blog-heading">Notes from practice.</h2><p>Essays on the structures that keep practice separate from the life you actually lead.</p><Link className="text-link" href="/articles">Browse all essays ↗</Link>
        <div className="resource-readings">{articles.map(article => <Link className="resource-reading" href={`/articles/${article.slug}`} key={article.slug}>
          {article.image && <img src={article.image} alt="" loading="lazy" />}<div><p className="eyebrow">{article.tags[0]} / {article.readingTime} MIN READ</p><h3>{article.title}</h3><p>{article.excerpt}</p></div>
        </Link>)}</div>
      </section>
    </div>
    <NextStep />
  </>
}
