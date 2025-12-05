import { useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import DigitalSerenity from "@/components/ui/digital-serenity-animated-landing-page";
import Footer from "./components/Footer";
import ContinuousBackground from './components/ContinuousBackground';

function App() {
  // Ensure dark mode is enabled
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="App text-light">
      <ContinuousBackground>
        <Header />
        <main>
          <DigitalSerenity />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </ContinuousBackground>
    </div>
  );
}

export default App;
