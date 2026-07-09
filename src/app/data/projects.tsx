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
  },
*/

  export const PROJECTS: Project[] = [
    {
      id: "ultimatewatch",
      title: "UltimateWatch",
      description:
        `
          Web application that unifies movie and TV show catalogs from multiple streaming platforms 
          into a single search experience, while enabling users to coordinate real-time viewing sessions. 
          Its social core lets a host synchronize a timer, manage an interactive playlist, and 
          chat with friends, all within virtual rooms using WebSockets.
        `,
      image: "/images/projects/ultimatewatch/hero_ultimatewatch.jpeg",
      status: "done",
      category: "academic",
      technologies: ["TypeScript", "NestJS", "Socket.IO", "PostgreSQL", "React", "Tailwind CSS"],
    },
    {
      id: "keakit",
      title: "KeaKit",
      description:
        `
          Digital platform that connects people to rent items and hire services in a single place, 
          allowing users to build personalized "kits" according to their needs. Its two-sided approach 
          makes it easy for users to quickly find what they need, while enabling others to earn money 
          from unused items, all through a centralized and flexible process.
        `,
      image: "/images/projects/keakit/hero_keakit.jpeg",
      status: "done",
      category: "academic",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "TypeScript", "React"],
    },
    {
      id: "zeolite",
      title: "Zeolite",
      description:
        `
          Web application for organizing and analyzing stories and fictional universes. It provides 
          a visual graph-based workspace for managing entities such as characters, events and locations, 
          along with custom attributes, while automatically detecting narrative inconsistencies through a 
          dashboard.
        `,
      image: "/images/projects/zeolite/hero_zeolite.jpeg",
      status: "done",
      category: "academic",
      technologies: ["Python", "FastAPI", "Neo4j", "TypeScript", "React"],
    },
    {
      id: "movies-ir",
      title: "Movies Information Retrieval",
      description:
        `
          Collaborative information retrieval project featuring a Jupyter application for searching and
          analyzing movie reviews. It implements both Boolean retrieval and TF-IDF-based free-text retrieval
          models, allowing users to compare their behavior and performance.
        `,
      image: "/images/projects/movies-ir/hero_movies-ir.jpeg",
      status: "done",
      category: "academic",
      technologies: ["Python", "Jupyter", "Whoosh", "NLTK", "Scikit-learn"],
    },
  ];