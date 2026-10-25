import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Search, X, Menu } from 'lucide-react';
import gsap from 'gsap';
import { PROFILE, EXPERIENCE } from './constants';
import { projects } from './data/projects';
import { useProjects } from './lib/use-projects';
import { filterProjects, projectCategory, projectTags } from './lib/catalog';
import type { PublicProject } from './types';
import SteelSculpture from './components/SteelSculpture';
import ProjectArt from './components/ProjectArt';
import SelectedWork, { SourceTag } from './components/SelectedWork';
import CommitDate from './components/CommitDate';
import ProjectProgress from './components/ProjectProgress';

const categories = ['All', ...new Set(projects.map(projectCategory))];
const technologies = ['All', ...new Set(projects.flatMap(projectTags))].sort((a, b) => a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b));
const skillGroups = [
  { title: 'Systems & simulation', skills: 'C++, Python, OpenCV, CUDA', project: 'tt-trajectory-engine', proof: 'From footage to ball trajectories.' },
  { title: 'Interfaces & applications', skills: 'React, TypeScript, Flutter', project: 'famgpslink', proof: 'Useful tools, made approachable.' },
  { title: 'Data & machine learning', skills: 'PyTorch, Pandas, FastAPI', project: 'neural-world-model', proof: 'Models, experiments, and their limits.' },
];

function ProjectDialog({ project, onClose }: { project: PublicProject | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (project && ref.current && !ref.current.open) ref.current.showModal();
    else if (!project) ref.current?.close();
  }, [project]);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="dialog-title" onClose={onClose} onCancel={onClose} onClick={(event) => {
    if (event.target === event.currentTarget) {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close();
    }
  }}>
    {project && <>
      <button className="dialog-close icon-button" aria-label="Close project" onClick={() => ref.current?.close()}><X size={24} /></button>
      <div className="dialog-art">{project.media ? <img src={project.media.src} alt={project.media.alt} width="1630" height="1003" /> : <ProjectArt kind={project.illustration} />}</div>
      <div className="dialog-copy">
        <h2 id="dialog-title">{project.title}</h2>
        <p className="project-meta">{project.category}{project.status ? ` / ${project.status}` : ''}</p>
        <CommitDate project={project} />
        <div className="dialog-description">{(project.readme?.overview.length ? project.readme.overview : project.description.split('\n\n')).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        {project.readme && <a className="readme-attribution text-link" href={project.readme.url} target="_blank" rel="noreferrer">From the repository README <ArrowUpRight size={15} /></a>}
        {(project.readme?.features.length || project.highlights.length) > 0 && <><h3 className="dialog-subheading">What it does</h3><ul className="project-highlights">{(project.readme?.features.length ? project.readme.features : project.highlights).map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></>}
        {!!project.limitations?.length && <><h3 className="dialog-subheading">Scope & limitations</h3><ul className="project-highlights">{project.limitations.map(item => <li key={item}>{item}</li>)}</ul></>}
        <p className="technology-line">{project.tags.join(' · ')}</p>
        <div className="dialog-links">
          {project.source === 'public' && project.github && <a className="button button-dark" href={project.github} target="_blank" rel="noreferrer">View source <ArrowUpRight size={19} /></a>}
          {project.demo && <a className="text-link" href={project.demo} target="_blank" rel="noreferrer">Open project <ArrowUpRight size={18} /></a>}
        </div>
      </div>
    </>}
  </dialog>;
}

function App() {
  const { catalog, checkedAt } = useProjects();
  const root = useRef<HTMLDivElement>(null);
  const cut = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState<PublicProject | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [technology, setTechnology] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const results = useMemo(() => filterProjects(catalog, { query, category, technology }), [catalog, query, category, technology]);
  const featured = useMemo(() => catalog.filter(project => project.featuredOrder !== undefined).sort((a, b) => a.featuredOrder! - b.featuredOrder!), [catalog]);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.hero-intro > *, .hero-bottom > *', { y: 16, duration: .6, stagger: .065, delay: .2, clearProps: 'all' });
        const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.fromTo(entry.target, { y: 22, opacity: .55 }, { y: 0, opacity: 1, duration: .65, ease: 'power2.out', clearProps: 'all' });
          observer.unobserve(entry.target);
        }), { threshold: .12 });
        root.current?.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node));
        return () => observer.disconnect();
      }, root);
      return () => ctx.revert();
    });
    return () => media.revert();
  }, []);


  function explore(event: MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !cut.current) return;
    event.preventDefault();
    gsap.timeline()
      .set(cut.current, { display: 'block', scaleX: 0, transformOrigin: 'left center' })
      .to(cut.current, { scaleX: 1, duration: .3, ease: 'power3.in' })
      .call(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' });
        window.history.replaceState(null, '', '#projects');
        document.getElementById('projects-heading')?.focus({ preventScroll: true });
      })
      .set(cut.current, { transformOrigin: 'right center' })
      .to(cut.current, { scaleX: 0, duration: .45, ease: 'power3.out' })
      .set(cut.current, { display: 'none' });
  }
  function resetFilters() { setQuery(''); setCategory('All'); setTechnology('All'); }

  return <div ref={root}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header page-frame">
      <a className="wordmark" href="#" aria-label="Adi Maitre, home">am<span className="brand-slash" aria-hidden="true" /></a>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation" id="main-navigation">
        {['Projects', 'Archive', 'About'].map((label) => <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={18} /></a>
      <button className="mobile-menu icon-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <main id="main">
      <section className="hero page-frame" aria-labelledby="hero-title">
        <h1 className="hero-name" id="hero-title"><span>Adi</span> <span>Maitre</span><span className="name-period" aria-hidden="true">.</span></h1>
        <div className="hero-body">
          <div className="hero-intro">
            <p className="hero-statement">A builder’s mind.<br />A sharper perspective.</p>
            <p className="hero-description">I build software, explore machine learning, and turn complex ideas into things you can use.</p>
            <a className="button button-accent" href="#projects" onClick={explore}>Explore projects <ArrowDown size={19} /></a>
          </div>
          <SteelSculpture />
        </div>
        <div className="hero-bottom">
          <p>Code Shinigami <span className="secondary">/ Builder & IT student</span></p>
          <p className="hero-location">{PROFILE.location}<span className="location-mark" aria-hidden="true" /></p>
        </div>
      </section>
      <SelectedWork featuredProjects={featured} onOpenProject={setOpened} />
      <section className="archive-section page-frame section-frame" id="archive" aria-labelledby="archive-heading">
        <div className="section-intro" data-reveal><h2 id="archive-heading">The full collection</h2><p>Working tools, experiments,<br />and everything in between.</p></div>
        <div className="archive-controls" data-ui="project-search" role="search" aria-label="Find a project">
          <label className="search-field"><Search size={20} aria-hidden="true" /><span className="sr-only">Search projects</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, ideas, or tools" /></label>
          <label className="filter-field"><span>Collection</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="filter-field"><span>Technology</span><select value={technology} onChange={(event) => setTechnology(event.target.value)}>{technologies.map((item) => <option key={item}>{item}</option>)}</select></label>
        </div>
        <div className="archive-status" data-ui="search-results"><p role="status">{results.length} {results.length === 1 ? 'project' : 'projects'}{query || category !== 'All' || technology !== 'All' ? ' found' : ' in the collection'}</p>{(query || category !== 'All' || technology !== 'All') && <button className="text-link" onClick={resetFilters}>Clear filters <X size={16} /></button>}</div>
        <div className="project-list">
          {results.map((project) => project.source === 'private'
            ? <article className="project-row is-private" key={project.id}><div className="row-identity"><span className="row-title">{project.title}</span><SourceTag project={project} /><CommitDate project={project} /></div><p className="row-summary">{project.summary}</p></article>
            : <button className="project-row" key={project.id} onClick={() => setOpened(project)} aria-label={`Read about ${project.title}`}><span className="row-identity"><span className="row-title">{project.title}</span>{project.status && <span className="row-status">{project.status}</span>}<CommitDate project={project} /></span><span className="row-summary">{project.summary}</span><span className="row-category">{project.category}</span><span className="row-open" aria-hidden="true">View</span></button>)}
          {results.length === 0 && <div className="empty-state"><h3>No projects match yet</h3><p>Try a different keyword or clear your filters.</p><button className="button button-dark" onClick={resetFilters}>Show all projects <ArrowRight size={18} /></button></div>}
        </div>
        <a className="archive-github text-link" href={PROFILE.github} target="_blank" rel="noreferrer">Follow the work on GitHub <ArrowUpRight size={18} /></a>
      </section>
      <section className="about-section" id="about" aria-labelledby="about-heading">
        <div className="page-frame section-frame">
          <div className="about-intro" data-reveal><h2 id="about-heading">Behind the work</h2><div><p className="about-statement">Curiosity starts it.<br />Building makes it real.</p><p>I’m Adi, an IT student based in Pune. I move between systems, interfaces, and machine learning—following the problem rather than a single stack.</p><p>Outside the code, I work with communities and partnerships. It’s taught me to listen closely, make the complicated clear, and care about the people using what I build.</p></div></div>
          <div className="skill-section" aria-labelledby="skills-heading"><h3 id="skills-heading" data-reveal>Tools with a purpose</h3><div className="skill-list">{skillGroups.map((group) => {
            const project = catalog.find((item) => item.id === group.project);
            return <div className="skill-group" key={group.title} data-reveal><h4>{group.title}</h4><p className="skill-tools">{group.skills}</p><p>{group.proof}</p>{project?.source === 'public' && <button className="text-link" onClick={() => setOpened(project)}>See {project.title} <ArrowUpRight size={17} /></button>}</div>;
          })}</div></div>
          <div className="experience-section" aria-labelledby="experience-heading"><h3 id="experience-heading" data-reveal>Beyond the code</h3><div className="experience-list">{EXPERIENCE.map((item) => <article className="experience-item" key={`${item.company}-${item.period}`} data-reveal><div><h4>{item.company}</h4><p className="experience-date">{item.period}</p></div><div><p className="experience-role">{item.role}</p><p>{item.description}</p></div></article>)}</div></div>
        </div>
      </section>
    </main>
    <footer className="contact-section section-dark" id="contact" aria-labelledby="contact-heading">
      <div className="page-frame">
        <div className="contact-top" data-reveal><h2 id="contact-heading">Have an<br />idea?</h2><div><p>A project, an idea, or a good conversation.<br />I’d like to hear it.</p><a className="button button-accent" href={`mailto:${PROFILE.email}`}>Let’s talk <ArrowUpRight size={20} /></a></div></div>
        <a className="contact-email" href={`mailto:${PROFILE.email}`}>{PROFILE.email}<ArrowUpRight size={32} /></a>
        <div className="footer-socials"><div>{[{ title: 'GitHub', href: PROFILE.github }, { title: 'LinkedIn', href: PROFILE.linkedin }, { title: 'Instagram', href: PROFILE.instagram }, { title: 'X / Twitter', href: PROFILE.twitter }].map((social) => <a href={social.href} key={social.title} target="_blank" rel="noreferrer">{social.title}<ArrowUpRight size={16} /></a>)}</div><a className="back-top" href="#">Back to top <ArrowUpRight size={16} /></a></div>
        <p className="footer-name" aria-hidden="true">Adi Maitre<span>.</span></p>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Adi Maitre</p><p>Built with intent. Ink & Steel.</p></div>
        <ProjectProgress projects={catalog} checkedAt={checkedAt} />
      </div>
    </footer>
    <div ref={cut} className="ink-cut" aria-hidden="true" />
    <ProjectDialog project={opened ? catalog.find(project => project.id === opened.id && project.source === 'public') as PublicProject : null} onClose={() => setOpened(null)} />
  </div>;
}
export default App;
