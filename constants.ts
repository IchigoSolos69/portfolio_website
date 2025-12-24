
import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Adi Maitre",
  role: "Code Shinigami | B.Tech IT Student",
  bio: "I am a B.Tech IT student and a self-described 'Code Shinigami' dedicated to slicing through complex bugs and bringing order to the digital Soul Society. I am a builder by nature, constantly breaking and remixing projects in pursuit of the 'Bankai' of perfect UI, where high-level functionality meets seamless aesthetics. I’m focused on leaving a lasting legacy in the cloud, one clean line of code at a time. Because in my world, the mission is simple: if it runs, it’s Bankai.",
  skills: [
    { subject: 'Core Logic', level: 69, fullMark: 100, value: "Python, C, C++, Java, HTML, CSS, JavaScript, TypeScript" },
    { subject: 'System Design', level: 89, fullMark: 100 },
    { subject: 'UI/Creative', level: 90, fullMark: 100, value: "Framer Motion, Tailwind, WebGL, Three.js, GSAP, Shaders" },
    { subject: 'Cloud/Git', level: 100, fullMark: 100, value: "GitHub, Vercel, Netlify, Cloudflare" },
    { subject: 'Problem Solving', level: 80, fullMark: 100 },
    { subject: 'Soft Skills', level: 100, fullMark: 100, value: "Communication, Adaptability, Creativity, Management, Leadership" },
  ],
  journey: [
    {
      year: "June 2025 — Present",
      title: "Partnership Manager",
      company: "Ghast.io",
      description: "Leading strategic partnerships and turning high-level vision into community growth. Specializing in long-term collaborator relationships and engagement strategies."
    },
    {
      year: "May 2025 — Present",
      title: "Customer Experience Specialist & Team Manager",
      company: "Hone.gg",
      description: "Leading partnership management and internal operations. Turning complex logistics into smooth, high-standard community experiences and driving collaborator relationships."
    },
    {
      year: "May 2024 — May 2025",
      title: "Tester & Support Volunteer",
      company: "Hone.gg",
      description: "Contributed to early-stage feature testing under NDA. Moderated community activity and enforced safety guidelines to ensure a stable user environment."
    }
  ],
  projects: [
    {
      id: "portfolio-website",
      title: "Shinigami Portfolio",
      category: "Web Dev",
      description: "A high-end, reactive portfolio website featuring modern design systems, Framed Motion animations, and a tactical HUD aesthetic. Built for peak digital performance.",
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200",
      tags: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      github: "https://github.com/IchigoSolos69/portfolio_website"
    },
    {
      id: "web-browser",
      title: "Tactical Browser",
      category: "Software",
      description: "A custom web browser with an inbuilt ad blocker, optimized for speed and distraction-free exploration of the digital Soul Society.",
      image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&q=80&w=1200",
      tags: ["Python", "PyQt", "Automation"],
      github: "https://github.com/IchigoSolos69/Web-Browser"
    },
    {
      id: "irc-analysis",
      title: "IRC Data Analysis",
      category: "Data Science",
      description: "Data analysis project for the IR club, processing and visualizing complex datasets to reveal tactical insights and trends.",
      image: "https://images.unsplash.com/photo-1551288049-bbbda536ad37?auto=format&fit=crop&q=80&w=1200",
      tags: ["Python", "Pandas", "Matplotlib", "Jupyter"],
      github: "https://github.com/IchigoSolos69/IRC"
    },
    {
      id: "weather-system",
      title: "Weather Oracle",
      category: "Software",
      description: "Real-time weather application that fetches and processes meteorological data, providing precise atmospheric conditions.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&q=80&w=1200",
      tags: ["Python", "API", "JSON"],
      github: "https://github.com/IchigoSolos69/Weather-System"
    },
    {
      id: "inventory-mgmt",
      title: "Inventory Command",
      category: "Software",
      description: "Robust inventory management system designed to bring order to resource tracking and logistical operations.",
      image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=1200",
      tags: ["Java", "OOP", "Swing"],
      github: "https://github.com/IchigoSolos69/Inventory-Management-System"
    }
  ],
  contact: {
    email: "adimaitre56@gmail.com",
    linkedin: "linkedin.com/in/adimaitre",
    github: "github.com/IchigoSolos69",
    twitter: "twitter.com/adi_maitre",
    instagram: "instagram.com/adi_maitre"
  }
};
