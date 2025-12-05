import { useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from "@/components/Hero";
import Footer from "./components/Footer";
import ContinuousBackground from './components/ContinuousBackground';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load components for better performance
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  // Ensure dark mode is enabled
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Loading fallback component
  const LoadingFallback = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse rounded-full h-12 w-12 bg-primary"></div>
    </div>
  );

  return (
    <div className="App text-light">
      <ContinuousBackground>
        <Header />
        <main>
          <Hero />
          
          <AnimatePresence mode="wait">
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<LoadingFallback />}>
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </ContinuousBackground>
    </div>
  );
}

export default App;
