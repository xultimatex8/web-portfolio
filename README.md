# Alejandro González Macías — Portfolio

Personal portfolio built with Next.js, showcasing my background, academic projects, and ways to get in touch. Live at **[alejandro-gonzalez.vercel.app](https://alejandro-gonzalez.vercel.app)**.

## Features

- **Home** — introduction, photo, and a short "About Me" section.
- **Education** — academic timeline.
- **Experience** — current status and background.
- **Projects** — filterable grid of projects, each with its own detail page rendered from MDX content.
- **Contact** — direct links to email, LinkedIn, GitHub, and a downloadable CV.
- **AI chat assistant** — a floating widget that answers visitor questions about my background, experience, and projects, grounded only in the portfolio's own content.
- **English / Spanish** — fully localized, including the AI chat assistant's responses.
- Fully responsive, from mobile up to desktop.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX for individual project pages
- **Internationalization:** [next-intl](https://next-intl.dev/) — English and Spanish
- **AI chat:** [Vercel AI SDK](https://sdk.vercel.ai/) + [Google Gemini](https://ai.google.dev/) (via `@ai-sdk/google`), streamed from an Edge Function
- **Rate limiting:** [Upstash Redis](https://upstash.com/) (`@upstash/ratelimit`)
- **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

### Environment variables

The AI chat assistant needs the following in `.env.local` (see `.env.example`):

```bash
GOOGLE_GENERATIVE_AI_API_KEY=   # Google AI Studio API key (free tier)
UPSTASH_REDIS_REST_URL=         # Upstash Redis REST URL, used for rate limiting
UPSTASH_REDIS_REST_TOKEN=       # Upstash Redis REST token
```

Without these, the rest of the site works fine — only the chat widget will fail.

## Internationalization

The site is localized with [next-intl](https://next-intl.dev/), routed through a `[locale]` segment (`en` / `es`). All copy lives in `src/messages/`, one JSON file per locale (`en.json`, `es.json`).

Project **metadata** (id, image, status, category, technologies, links) lives in `src/data/projects.ts` and is not localized — but each project's **display text** (`title`, `description`) is looked up from `ProjectData[id]` in the active locale's message file, keyed by the same `id` used in `projects.ts`. This keeps translatable copy out of the data file and in one place per language.

The AI chat's responses are also localized — not through `next-intl`, but because the system prompt (`src/lib/portfolio-context.ts`) explicitly instructs the model to reply in whichever language the visitor writes in, regardless of the site's active locale.

### Adding a new project

1. Add its metadata to `src/data/projects.ts`: `id`, `image`, `status`, `category`, `technologies`, and optionally `repoUrl` / `demoUrl`.
2. Add the matching `title` and `description` under `ProjectData.<id>` in **every** `src/messages/*.json` file — the project won't render its name/description in a locale you forget to update.
3. Create a matching `src/app/content/(en/es)/projects/<id>.mdx` file with the project's write-up.
4. Add the corresponding images and demo media under `public/images/projects/<id>/` and `public/videos/projects/<id>/`.

### Updating the AI chat's knowledge

The assistant only knows what's in `src/lib/portfolio-context.ts`. When you update your experience, education, or projects elsewhere in the site, update that file too — it isn't generated automatically from `projects.ts`, the message files, or the MDX content.

## Deployment

The site is deployed on [Vercel](https://vercel.com/), with automatic deployments on every push to `main`. Remember to add the environment variables above in the Vercel project settings as well.

## License

The code in this repository is licensed under the [MIT License](./LICENSE) — feel free to use it as a reference or starting point for your own portfolio.

Personal content (photos, videos, CV, resume, biographical text, and project write-ups) is **not** covered by this license and is not licensed for reuse.

## Contact

- **Email:** alegonzmac@gmail.com
- **LinkedIn:** [linkedin.com/in/alejandro-gonzalez-macias-agm](https://linkedin.com/in/alejandro-gonzalez-macias-agm)
- **GitHub:** [github.com/xultimatex8](https://github.com/xultimatex8)