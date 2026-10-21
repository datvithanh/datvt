import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { PostFooterData } from '@/lib/content'

// The per-post signature footer — the featured user's signature (optional banner image
// + markdown text), with an attribution line that links the hub when published. Rendered
// only when the page resolves a non-null footer (see getArticleFooter).
export function PostFooter({ footer }: { footer: PostFooterData }) {
  return (
    <div className="mt-16 pt-8 border-t border-border-subtle">
      {footer.signatureImage && (
        <img
          src={footer.signatureImage}
          alt={`${footer.name} signature`}
          className="w-full max-w-md rounded-sm mb-4"
        />
      )}
      {footer.signatureText && (
        <div className="prose">
          <MDXRemote source={footer.signatureText} />
        </div>
      )}
      <p className="font-heading text-[0.6rem] uppercase tracking-[0.15em] text-text-muted mt-3">
        {footer.href ? (
          <Link href={footer.href} className="hover:text-accent transition-colors">&mdash; {footer.name}</Link>
        ) : (
          <>&mdash; {footer.name}</>
        )}
      </p>
    </div>
  )
}
