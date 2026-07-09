export const TECHNOLOGY_ICONS = {
  "Python": "devicon-python-plain colored",
  "FastAPI": "devicon-fastapi-plain colored",
  "Neo4j": "devicon-neo4j-plain colored",
  "React": "devicon-react-original colored",
  "TypeScript": "devicon-typescript-plain colored",
  "Java": "devicon-java-plain colored",
  "Spring Boot": "devicon-spring-plain colored",
  "PostgreSQL": "devicon-postgresql-plain colored",
  "NestJS": "devicon-nestjs-plain colored",
  "Socket.IO": "devicon-socketio-plain colored",
  "Tailwind CSS": "devicon-tailwindcss-plain colored",
  "Jupyter": "devicon-jupyter-plain colored",
  "Whoosh": "devicon-whoosh-plain colored",
  "NLTK": "devicon-nltk-plain colored",
  "Scikit-learn": "devicon-scikitlearn-plain colored"
} as const;

export type Technology = keyof typeof TECHNOLOGY_ICONS;

export type ProjectStatus = "done" | "in-progress";
export type ProjectCategory = "personal" | "academic" | "professional";

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  category: ProjectCategory;
  technologies: Technology[];
}