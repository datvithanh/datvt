# CC Content Site — Project Instructions

This migrated checkout deploys from `datvithanh/datvt` branch `v4`; follow the
root README and push `v4`, not `main`. The upstream CC source stays separate.

**Edit ledger:** every commit that changes the site appends an entry to
`docs/edit-ledger.md` in the same commit: date, a short title, what a visitor
would notice, why (meeting, doc or person), and anything still provisional.
Append at the bottom; never rewrite earlier entries.

## Writing Content

When writing articles, course lessons, or any teaching content for this site, you MUST follow the CC Writing Style Guide at `docs/references/cc_writing_style_guide.md`. Read it before writing any content.

Key principles:
- **Precision over vagueness** — every sentence load-bearing, no filler
- **Warmth without sentimentality** — care embedded in directness
- **No spiritual platitudes** — never "trust the process" or "you are already whole"
- **No marketing language** — never "transform your life" or "unlock your potential"
- **Assume the reader is sophisticated** — they have 5+ years of practice, they've read the maps
- **Name the pattern, then reframe it** — show them where they are before showing what's possible
- **End with compression** — a single line that hits like a bell, not a summary

### Target Audience: SAM Persona

Read `docs/references/sam_persona_sales_doc.md` before writing. SAM Level 2 is the core target:
- Early-to-mid 30s, 5-8 years practice, has worked with a teacher
- Hit a ceiling — compartmentalization between cushion and daily life
- Sophisticated meditator, reactive pattern-runner by noon
- Needs a relational field, not more technique

---

## Complete Article Production Pipeline

Follow ALL steps in order. Do not skip any step.

### Step 1: Write the Article

- Read the source material (transcript, slides, or reference doc)
- Read the style guide: `docs/references/cc_writing_style_guide.md`
- Read first 100 lines of `docs/references/phase2_combustion_purification_illumination.md` for voice calibration
- Write 800-1000 words following the article structure: hook → reframe → teaching → practice implication → compressed close
- Do NOT reference "the video," "the talk," "the transcript" — standalone articles only
- Use CC vocabulary where natural (voltage, container, mirror, flinch, exits, fourth option)

### Step 2: Humanize

Run `/humanizer` on the text to remove AI writing patterns. Provide the CC style guide and Taylor's Phase 2 doc as voice calibration samples.

### Step 3: Editor Pass

A separate agent must review every article for:
- **Readability** — Flow, rhythm (compression/expansion alternation), no filler
- **Impact** — Opening hooks, close lands, clear reframe the reader carries
- **Philosophical rigor** — No vagueness masquerading as depth
- **Voice consistency** — Sounds like CC, not a meditation blog. Check against Taylor's Phase 2 doc.
- **AI writing patterns** — No "profoundly," "transformative," "moreover," "journey," "powerful," "resonates." No lists-of-three with escalating intensity. No concluding paragraphs that summarize.

### Step 4: Buddhadharma Accuracy Review

A SEPARATE agent must check every Buddhist reference:
- **Pali/Sanskrit terms** — correct spelling, diacritics, and meaning
- vedanā = feeling-tone (pleasant/unpleasant/neutral), NOT emotion
- saṅkhāra = formations/fabrications, NOT "subconscious"
- papañca = conceptual proliferation (Pali, NOT Sanskrit)
- **Doctrinal claims** — accurate representation, no tradition conflation
- **No pop-Buddhism** — no "everything is an illusion," no "ego death," no Western psych "attachment"
- **CC vocabulary** — NOT claimed as traditional Buddhist terms (voltage, exits, flinch are CC's framework)
- If unsure about a Buddhist claim, leave it out entirely
- Fix errors directly in the file

### Step 5: Save the Article

Save as MDX with frontmatter:
```yaml
---
title: "Article Title"
date: YYYY-MM-DD
excerpt: "One-line hook that makes SAM want to read"
image: /images/articles/article-slug.jpg
tags: [tag1, tag2]
---
```

**Tags** — use only these 6: `practice`, `view`, `purification`, `absorption`, `container`, `identity`. Each article gets 2-3 tags.

### Step 6: Generate Hero Image

Use the Gemini API to generate a hero image for the article.

**Style prompt:**
```
High-end digital art. NOT fantasy, NOT magical. Think scientific visualization meets fine art photography. Like something from a physics research lab rendered as gallery art. Predominantly monochrome — dark charcoal, silver, ash. One subtle warm amber accent element comprising less than 10% of the image. Background very dark. Cinematic lighting with dramatic contrast. Textural and detailed. No people, no figures, no faces, no silhouettes. No text. 16:9.

[Concept specific to the article — describe abstractly, not literally]
```

**API setup:**
```python
import os, io
from google import genai
from google.genai import types
from PIL import Image as PILImage, ImageEnhance

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

response = client.models.generate_content(
    model="gemini-3-pro-image-preview",
    contents=[prompt],
    config=types.GenerateContentConfig(
        response_modalities=['TEXT', 'IMAGE'],
        image_config=types.ImageConfig(aspect_ratio="16:9"),
    ),
)

# Post-process: desaturate, darken slightly, warm tint
for part in response.parts:
    if part.inline_data:
        img = PILImage.open(io.BytesIO(part.inline_data.data)).convert("RGB")
        img = ImageEnhance.Color(img).enhance(0.2)
        img = ImageEnhance.Brightness(img).enhance(0.65)
        img = ImageEnhance.Contrast(img).enhance(1.3)
        r, g, b = img.split()
        r = r.point(lambda x: min(255, int(x * 1.05)))
        b = b.point(lambda x: int(x * 0.93))
        img = PILImage.merge("RGB", (r, g, b))
        img.save("public/images/articles/article-slug.jpg", quality=92)
```

**Do NOT pass any reference image.** Describe the style entirely in the text prompt.

Save to: `public/images/articles/article-slug.jpg`

### Step 7: Generate Infographics

Generate 1-2 educational infographic slides and insert inline.

**Style prompt prefix (use for ALL infographics):**
```
Create an educational infographic slide. Dark background (#0f0f12 to #1a1c2a gradient).
Warm amber/gold glow effects (#c4a35a) used sparingly for emphasis and borders.
Elegant typography — clean, readable, high contrast against dark bg.
Translucent card elements with thin borders and subtle glass-morphism effects.
High production quality — premium presentation slide quality.

Design a completely original layout suited to the concept. Do NOT reuse layouts.
Be creative — diagrams, flowcharts, circular models, timelines, spectrums, matrices,
field guides, comparison charts, or any structure that best serves the concept.

16:9 aspect ratio. NO watermarks. NO logos. NO attribution text.
```

**CRITICAL: Do NOT pass any reference image to the API.** This causes watermark reproduction.

Save to: `public/images/infographics/article-slug-1.jpg` (and `-2.jpg` if needed)

Insert in MDX with: `![Description](/images/infographics/article-slug-1.jpg)`

The `InfographicImage` component auto-handles lightbox and full-width display.

Place at natural break points — after introducing a concept, before developing it.

### Step 8: Build and Push

```bash
cd projects/cc-content-site
npm run build  # Verify it compiles
cd ../..
git add projects/cc-content-site/
git commit -m "feat: add article — Article Title"
git push origin v4
```

Netlify auto-deploys from main.

---

## Source Materials

Transcripts and reference docs for article source material:
- `docs/references/foundation-teachings/transcripts/` — Foundation week 1-6 transcripts
- `docs/references/foundation-teachings/slides/` — Foundation week slide PDFs
- `docs/references/fov-teachings/transcripts/` — FOV week 1-5, 7 transcripts
- `docs/references/illumination_101.md` — Illumination 101 course content
- `docs/references/phase2_combustion_purification_illumination.md` — Taylor's Phase 2 (voice gold standard)
- YouTube transcripts — fetch with `yt-dlp --write-auto-sub --sub-lang en --skip-download`

## Content Structure

- Articles: `content/articles/*.mdx`
- Course lessons: `content/courses/<course-slug>/*.mdx`
- Hero images: `public/images/articles/*.jpg`
- Infographics: `public/images/infographics/*.jpg`
- Article tags: `practice`, `view`, `purification`, `absorption`, `container`, `identity`

## Technical

- Next.js 16 with App Router, Tailwind v4, TypeScript
- Fonts: Rubik (headings, uppercase), Courier Prime (body, monospace)
- Color: monochrome grey with subtle warm amber accent
- Content loaded from MDX via `lib/content.ts`
- Path alias `@/*` maps to project root
- Site URL: `https://mindtraining.cc`
- Infographic images use `InfographicImage` component (lightbox, full-width) — triggered by `/infographics/` in image path

## Agent Skills

- YouTube clips and media manifests: use `.claude/skills/youtube-manifest-clips/SKILL.md`.
  It documents adding clips from/to YouTube, updating `content/media/*.json`, wiring landing pages from manifests, and running `node scripts/audit-video-manifests.mjs`.
