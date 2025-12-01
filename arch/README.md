# Portfolio Website

The site features dynamic animations inspired by anime-themed aesthetics, technical skill highlights, project showcases, and seamless user interactions.

***

The website is currently deployed and publicly accessible at : https://adimaitre.pages.dev

***

## Features

- **Cinematic Loading Animation**: Engaging diagonal glow trail synchronized with audio, followed by a stylish diagonal split reveal.
- **Hero Section**: Animated introduction with gradient text and an interactive typing effect highlighting multiple roles.
- **About Section**: Detailed professional biography supported by skill progress bars with interactive hover effects.
- **Projects Section**: Cleanly presented project cards with technology stacks and quick access to GitHub repositories.
- **Achievements Section**: Highlights of academic, professional, and research milestones.
- **Contact Section**: Quick access links for email, GitHub, and LinkedIn.
- **Responsive Design**: Mobile-first and desktop compatible layouts.
- **Modern Tech Stack**:
  - React + TypeScript for robust frontend development.
  - Tailwind CSS for utility-first styling and animations.
  - Framer Motion and CSS keyframe animations for smooth, performant transitions.

***

## Website Deployment and Availability

It is hosted on **Cloudflare Pages**, which provides continuous deployment from the GitHub repository and ensures very high availability - the site is accessible 24/7 with minimal downtime.

This setup guarantees fast global delivery and automatic updates whenever changes are pushed to the main branch.

***

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/IchigoSolos69/portfolio_website.git
   cd portfolio_website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port shown) to view the site locally.

***

## Customization

- **Content Editing**: Modify the `src/pages/Home.tsx` file to update your introduction, projects, skills, and achievements.
- **Animations**: Edit CSS keyframes and utility classes in `src/index.css`.
- **Assets**: Add or replace images, sound effects (e.g., sword slashes), and fonts in the `public` directory.
- **Theme Settings**: Tailwind CSS configuration is available in `tailwind.config.js` for color and spacing adjustments.

***

## Folder Structure

```
portfolio_website/
│
├── public/                ← Static assets (images, icons, fonts, sounds)
│
├── src/                   ← Source code
│   │
│   ├── components/        ← Reusable UI elements (cards, badges, loaders, animations)
│   │
│   ├── data/              ← Portfolio/project/skills/achievements data (JSON or TS)
│   │
│   ├── hooks/             ← Custom React hooks (e.g., theme toggle, media queries)
│   │
│   ├── pages/             ← Route-level sections (Home, About, Contact, etc.)
│   │
│   ├── styles/            ← Tailwind/global CSS, custom stylesheets
│   │
│   ├── App.tsx            ← Root React component
│   │
│   └── main.tsx           ← App entry point (mounts to DOM)
│
├── index.html             ← HTML template (metadata, favicon, root element)
│
├── tailwind.config.js     ← Tailwind configuration (colors, fonts, breakpoints)
│
├── postcss.config.js      ← PostCSS setup (for Tailwind & autoprefixing)
│
├── tsconfig.json          ← TypeScript configuration
│
├── vite.config.ts         ← Vite build tool configuration
│
└── package.json           ← Project metadata, dependencies, scripts
```

***

## Contribution

Contributions, bug reports, and feature requests are welcome!  
Please fork the repo and submit pull requests for your improvements.

***

*Crafted with passion and spiritual energy.*
