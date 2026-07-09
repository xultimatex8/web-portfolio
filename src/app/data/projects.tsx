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
      id: "keakit",
      title: "KeaKit",
      description:
        `
          Digital platform that connects people to rent items and hire services in a single place, 
          allowing users to build personalized "kits" that combine both according to their needs. Its 
          two-sided approach makes it easy for users to quickly find what they need, while enabling others 
          to earn money from unused items, all through a centralized, flexible and hassle-free process.
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
  ];