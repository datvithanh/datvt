import { getLibraryVideos } from '@/lib/media'
import { YouTubeEmbed } from '@/components/ui/YouTubeEmbed'

// Video IDs and titles verified against YouTube oEmbed on 2026-10-17.
const showEpisodes = [
  { number: '03', videoId: '6epuY_IToKU', title: 'You Had the Spiritual Experience. Now What?' },
  { number: '02', videoId: 'wYWkNf9O2cA', title: 'How Rushing Spiritual Progress is Keeping You Stuck' },
  { number: '01', videoId: 'U22O-PqnScw', title: 'The Bootcamp Built Around Anattā' },
]

export function MediaContent() {
  const library = getLibraryVideos()
  const videos = ['enlightenment-team-sport', 'integration-after-awakening', 'embodiment-workshop-1-qa'].flatMap(id => {
    const video = library.find(item => item.id === id)
    return video ? [video] : []
  })
  const [featured, ...earlier] = showEpisodes
  return <>
    <section className="resource-intro conversation-intro wrap">
      <h1 className="resource-title">Media.<br /><em>In conversation.</em></h1>
      <p className="resource-deck">The BDSM show, past YouTube conversations, and observations from the CC community on Instagram.</p>
    </section>
    <div className="media-columns wrap">
      <section id="bdsm-show" className="bdsm-feature" aria-labelledby="bdsm-heading">
        <div className="media-section-heading">
          <h2 id="bdsm-heading">The BDSM show.</h2>
        </div>
        <article className="show-latest">
          <div className="video-frame"><YouTubeEmbed videoId={featured.videoId} title={featured.title} variant="field-guide" /></div>
          <p className="eyebrow">EPISODE {featured.number}</p>
          <h3>{featured.title}</h3>
        </article>
        <div className="show-earlier">{earlier.map(episode => <article className="show-episode" key={episode.videoId}>
          <div className="video-frame"><YouTubeEmbed videoId={episode.videoId} title={episode.title} variant="field-guide" /></div>
          <p className="eyebrow">EPISODE {episode.number}</p>
          <h3>{episode.title}</h3>
        </article>)}</div>
      </section>
      <aside className="media-sidebar">
        <section id="watch" className="past-media" aria-labelledby="past-media-heading">
          <div className="media-section-heading"><h2 id="past-media-heading">Past media.</h2><p className="eyebrow">ON YOUTUBE</p></div>
          <div className="past-media-list">{videos.map(video => <article className="past-media-item" key={video.id}>
            <div className="video-frame"><YouTubeEmbed videoId={video.youtubeId} title={video.title} start={video.start} variant="field-guide" /></div>
            <h3>{video.title}</h3>
          </article>)}</div>
        </section>
        <section id="instagram" className="instagram-panel" aria-labelledby="instagram-heading">
          <h2 id="instagram-heading">On Instagram.</h2>
          <p>Short provocations and observations from the CC community. Follow the original posts and join the conversation on Instagram.</p>
          <a className="text-link" href="https://www.instagram.com/contemplativecrossfit/">@contemplativecrossfit ↗</a>
        </section>
      </aside>
    </div>
  </>
}
