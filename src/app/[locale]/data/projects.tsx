import { Project } from "@/app/[locale]/types/project";

/*
  Example project object:
  {
    id: "lorem-ipsum",
    image: "/images/placeholder.svg",
    status: "in-progress",
    category: "personal",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
    repoUrl: "https://github.com/lorem-ipsum/lorem-ipsum",
    demoUrl: "https://lorem-ipsum-demo.vercel.app",
  },
*/

export const PROJECTS: Project[] = [
    {
    id: "ukinory",
    image: "/images/projects/ukinory/hero_ukinory.jpeg",
    status: "live",
    category: "personal",
    technologies: [
      "Python",
      "Django",
      "Redis",
      "PostgreSQL",
      "TypeScript",
      "React",
      "Tailwind CSS",
    ],
    repoUrl: "https://github.com/xultimatex8/ukinory",
    demoUrl: "https://ukinory.vercel.app",
  },
  {
    id: "ultimateggx",
    image: "/images/projects/ultimateggx/hero_ultimateggx.jpeg",
    status: "live",
    category: "personal",
    technologies: [
      "C#",
      ".NET",
      "PostgreSQL",
      "TypeScript",
      "Angular",
      "Tailwind CSS",
    ],
    repoUrl: "https://github.com/xultimatex8/UltimateGGx",
    demoUrl: "https://ultimateggx.vercel.app",
  },
  {
    id: "ultimatewatch",
    image: "/images/projects/ultimatewatch/hero_ultimatewatch.jpeg",
    status: "offline",
    category: "academic",
    technologies: [
      "TypeScript",
      "NestJS",
      "Socket.IO",
      "PostgreSQL",
      "React",
      "Tailwind CSS",
    ],
    repoUrl: "https://github.com/xultimatex8/UltimateWatch",
  },
  {
    id: "keakit",
    image: "/images/projects/keakit/hero_keakit.jpeg",
    status: "offline",
    category: "academic",
    technologies: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "TypeScript",
      "React",
    ],
    repoUrl: "https://github.com/KeaKit/KeaKit",
  },
  {
    id: "zeolite",
    image: "/images/projects/zeolite/hero_zeolite.jpeg",
    status: "offline",
    category: "academic",
    technologies: ["Python", "FastAPI", "Neo4j", "TypeScript", "React"],
    repoUrl: "https://github.com/AdrianChabrera/zeolite",
  },
  {
    id: "movies-ir",
    image: "/images/projects/movies-ir/hero_movies-ir.jpeg",
    status: "live",
    category: "academic",
    technologies: [
      "Python",
      "Jupyter",
      "Whoosh",
      "NLTK",
      "Scikit-learn",
    ],
    repoUrl: "https://github.com/xultimatex8/movie-ir",
    demoUrl:
      "https://mybinder.org/v2/gh/xultimatex8/movie-ir/HEAD?urlpath=%2Fdoc%2Ftree%2FRecuperacionDeLaInformacionMovies.ipynb",
  },
];