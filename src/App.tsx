import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import DigitalSerenity from "@/components/ui/digital-serenity-animated-landing-page";
import Footer from "./components/Footer";
import SmoothPageTransition from './components/SmoothPageTransition';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Define background colors for each page
  const backgroundColors = {
    home: '#0f172a', // dark slate (navy blue)
    about: '#1e293b', // slate 900
    skills: '#000000', // black
    projects: '#0f172a', // dark slate
    experience: '#000000', // black
    contact: '#0f172a', // dark slate
  };

  // Update current page when scrolling or navigating
  useEffect(() => {
    // Ensure dark mode is enabled
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentPage(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App text-light">
      <Header />
      <SmoothPageTransition 
        currentPage={currentPage} 
        backgroundColors={backgroundColors}
      >
        <main>
          <DigitalSerenity />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </SmoothPageTransition>
      <Footer />
    </div>
  );
}

export default App;
