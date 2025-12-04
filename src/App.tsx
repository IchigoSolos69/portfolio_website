import { useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import DigitalSerenity from "@/components/ui/digital-serenity-animated-landing-page";
import { PulseBeamsFirstDemo } from "@/components/ui/pulse-beams-demo";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Ensure dark mode is enabled
    document.documentElement.classList.add('dark');
  }, []);

    return (
    <div className="App bg-dark text-light">
      <Header />
      <main>
        <DigitalSerenity />
        <PulseBeamsFirstDemo />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
