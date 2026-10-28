import type { ProjectImage } from "./projects";

// A single contact entry in the Contact section
export interface ContactLink {
  label: string;
  // Text shown to the user
  value: string;
  // mailto: or https: URL
  href: string;
}

// A single job in the About > Work Experience timeline (newest first)
export interface Experience {
  jobTitle: string;
  company: string;
  location: string;
  // Free-form range, e.g. "2022 - Present"
  period: string;
  // Company logo under /public; gray placeholder if omitted
  logo?: ProjectImage;
}

// Site configuration - Easy to update personal information
export const siteConfig = {
  // Personal Info
  name: "Rahmat Riansyah",
  role: "Software Engineer",
  // Rotating text shown after the role in the hero, one at a time
  roleExtras: [
    ", also Graphic Designer",
    ", that love playing Games",
    ", and IoT Enthusiast",
  ],
  greeting: "Hello, I'm",

  // Navigation
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  // CTA Buttons
  cta: {
    primary: {
      label: "Get in touch",
      href: "#contact",
    },
    secondary: {
      label: "Explore more",
      href: "#about",
    },
  },

  // Avatar/Profile Image
  avatar: {
    src: "/images/avatar.svg", // Replace with actual avatar path
    alt: "Profile avatar",
  },

  // SEO
  seo: {
    title: "Portfolio - Rahmat Riansyah",
    description:
      "Professional portfolio website showcasing projects and skills as a Software Engineer.",
    keywords: [
      "software engineer",
      "portfolio",
      "developer",
      "web development",
    ],
    ogImage: "/images/og-image.png",
    siteUrl: "https://yourportfolio.com", // Replace with actual URL
  },

  // Contact Section - replace placeholders with real links
  contact: {
    titleAccent: "Get",
    titleMain: "in Touch",
    subtitle: "Hit me up, below!",
    links: [
      {
        label: "Email",
        value: "justsample@email.com",
        href: "mailto:justsample@email.com",
      },
      {
        label: "github",
        value: "github.com/namehere",
        href: "https://github.com/namehere",
      },
      {
        label: "linkedin",
        value: "linked.in/@namehere",
        href: "https://linkedin.com/in/namehere",
      },
      {
        label: "instagram",
        value: "instagram.com/@namehere",
        href: "https://instagram.com/namehere",
      },
    ] as ContactLink[],
  },

  // About Section
  about: {
    titleAccent: "Lil a bit",
    titleMain: "About me",
    subtitle: "Lemme introduce myself",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
    cvButton: {
      label: "Download CV",
      href: "/cv.pdf", // Replace with actual CV path
    },
    // Work Experience timeline - replace placeholders with real jobs
    experience: {
      title: "Work Experience",
      items: [
        {
          jobTitle: "Job Title",
          company: "Company Name",
          location: "City, Country",
          period: "20XX - 20XX",
        },
        {
          jobTitle: "Job Title",
          company: "Company Name",
          location: "City, Country",
          period: "20XX - 20XX",
        },
        {
          jobTitle: "Job Title",
          company: "Company Name",
          location: "City, Country",
          period: "20XX - 20XX",
        },
        {
          jobTitle: "Job Title",
          company: "Company Name",
          location: "City, Country",
          period: "20XX - 20XX",
        },
        {
          jobTitle: "Job Title",
          company: "Company Name",
          location: "City, Country",
          period: "20XX - 20XX",
        },
      ] as Experience[],
    },
  },

  // Projects Section
  projects: {
    titleAccent: "Explore",
    titleMain: "my Projects",
    subtitle: "Lorem Ipsum",
    // Number of cards visible before the "show more" arrow is pressed
    initialCount: 8,
    seeLabel: "See",
  },

  // Project detail page (/projects/[slug])
  projectDetail: {
    back: { label: "Projects", href: "/#projects" },
    hire: { label: "Hire me", href: "#contact" },
    stackLabel: "Tech Stacks",
  },
};

export type SiteConfig = typeof siteConfig;
