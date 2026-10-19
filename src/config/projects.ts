// Project data shared by the home page grid and /projects/[slug].
// Replace the placeholders below with real projects.

export interface ProjectImage {
  // Path under /public (e.g. "/images/projects/foo-1.png"); gray placeholder if omitted
  src?: string;
  alt: string;
}

export interface Project {
  // URL segment: /projects/{slug}
  slug: string;
  title: string;
  category: string;
  // First image doubles as the card thumbnail
  gallery: ProjectImage[];
  description: string[];
  // Full list for the detail page; cards show the first three as dots
  stack: string[];
}

const PLACEHOLDER_DESCRIPTION = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inriatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

const PLACEHOLDER_STACK = [
  "Typescript",
  "Shadcn",
  "Spring Boot",
  "Web Socket",
  "Java",
  "Nginx",
  "PostgreSQL",
  "Typescript",
  "TailwindCSS",
  "TailwindCSS",
];

export const projects: Project[] = Array.from({ length: 10 }, (_, i) => ({
  slug: `project-${i + 1}`,
  title: "This is Title",
  category: "Category",
  gallery: [1, 2, 3].map((n) => ({ alt: `Project ${i + 1} screenshot ${n}` })),
  description: PLACEHOLDER_DESCRIPTION,
  stack: PLACEHOLDER_STACK,
}));

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const getProjectHref = (slug: string) => `/projects/${slug}`;
