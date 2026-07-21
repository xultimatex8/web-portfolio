# Alejandro González Macías — Portfolio

Personal portfolio built with Next.js, showcasing my background, academic projects, and ways to get in touch. Live at **[alejandro-gonzalez.vercel.app](https://alejandro-gonzalez.vercel.app)**.

## Features

- **Home** — introduction, photo, and a short "About Me" section.
- **Education** — academic timeline.
- **Experience** — current status and background.
- **Projects** — filterable grid of projects, each with its own detail page rendered from MDX content.
- **Contact** — direct links to email, LinkedIn, GitHub, and a downloadable CV.
- Fully responsive, from mobile up to desktop.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** MDX for individual project pages
- **Deployment:** [Vercel](https://vercel.com/)

## Project Structure

```
src/
├── app/
│   ├── components/          # Page-level sections
│   ├── content/
│   │   └── projects/        # One .mdx file per project
│   ├── projects/
│   │   └── [slug]/          # Dynamic project detail page, renders the matching .mdx
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # Shared UI components
├── data/
│   └── projects.ts          # Project metadata
├── helpers/                 # Style maps
└── types/                   # Shared TypeScript types
```

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

### Adding a new project

1. Add its metadata to `src/data/projects.ts` (`id`, `title`, `description`, `image`, `status`, `category`, `technologies`, and optionally `repoUrl` / `demoUrl`).
2. Create a matching `src/app/content/projects/<id>.mdx` file with the project's write-up.
3. Add the corresponding images and demo media under `public/images/projects/<id>/` and `public/videos/projects/<id>/`.

## Deployment

The site is deployed on [Vercel](https://vercel.com/), with automatic deployments on every push to `main`.

## License

The code in this repository is licensed under the [MIT License](./LICENSE) — feel free to use it as a reference or starting point for your own portfolio.

Personal content (photos, videos, CV, resume, biographical text, and project write-ups) is **not** covered by this license and is not licensed for reuse.

## Contact

- **Email:** alegonzmac@gmail.com
- **LinkedIn:** [linkedin.com/in/alejandro-gonzalez-macias-agm](https://linkedin.com/in/alejandro-gonzalez-macias-agm)
- **GitHub:** [github.com/xultimatex8](https://github.com/xultimatex8)
