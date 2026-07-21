import { Project } from "@/types/project";

/*
  Example project object:
  {
    id: "lorem-ipsum",
    title: "Lorem ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt vel sapien in rhoncus.",
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
      id: "ultimatewatch",
      title: "UltimateWatch",
      description:
        `
        Web application that unifies streaming catalogs into a single search experience and 
        lets users host synchronized watch parties with real-time chat and shared playlists.
        `,
      image: "/images/projects/ultimatewatch/hero_ultimatewatch.jpeg",
      status: "done",
      category: "academic",
      technologies: ["TypeScript", "NestJS", "Socket.IO", "PostgreSQL", "React", "Tailwind CSS"],
      repoUrl: "https://github.com/xultimatex8/UltimateWatch",
    },
    {
      id: "keakit",
      title: "KeaKit",
      description:
        `
        Marketplace platform for renting items, hiring services, and creating personalized 
        kits, making it easy to connect users with available resources.
        `,
      image: "/images/projects/keakit/hero_keakit.jpeg",
      status: "done",
      category: "academic",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "TypeScript", "React"],
      repoUrl: "https://github.com/KeaKit/KeaKit",
    },
    {
      id: "zeolite",
      title: "Zeolite",
      description:
        `
        Web application for organizing fictional universes through graph visualization, 
        custom entities, and automatic detection of narrative inconsistencies.
        `,
      image: "/images/projects/zeolite/hero_zeolite.jpeg",
      status: "done",
      category: "academic",
      technologies: ["Python", "FastAPI", "Neo4j", "TypeScript", "React"],
      repoUrl: "https://github.com/AdrianChabrera/zeolite",
    },
    {
      id: "movies-ir",
      title: "Movies Info Retrieval",
      description:
        `Collaborative information retrieval project for searching and analyzing movie 
        reviews using both Boolean and TF-IDF retrieval models.
        `,
      image: "/images/projects/movies-ir/hero_movies-ir.jpeg",
      status: "done",
      category: "academic",
      technologies: ["Python", "Jupyter", "Whoosh", "NLTK", "Scikit-learn"],
      repoUrl: "https://github.com/xultimatex8/movie-ir",
      demoUrl: "https://mybinder.org/v2/gh/xultimatex8/movie-ir/HEAD?urlpath=%2Fdoc%2Ftree%2FRecuperacionDeLaInformacionMovies.ipynb",
    },
  ];