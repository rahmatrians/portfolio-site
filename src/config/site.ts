// Site configuration - Easy to update personal information
export const siteConfig = {
  // Personal Info
  name: "Rahmat Riansyah",
  role: "Software Engineer",
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
      href: "#projects",
    },
  },

  // Avatar/Profile Image
  avatar: {
    src: "/images/avatar.svg", // Replace with actual avatar path
    alt: "Profile avatar",
  },

  // SEO
  seo: {
    title: "Portfolio - Software Engineer",
    description:
      "Professional portfolio website showcasing projects and skills as a Software Engineer.",
    keywords: ["software engineer", "portfolio", "developer", "web development"],
    ogImage: "/images/og-image.png",
    siteUrl: "https://yourportfolio.com", // Replace with actual URL
  },

  // Social Links (for future use)
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "your.email@example.com",
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
  },
};

export type SiteConfig = typeof siteConfig;
