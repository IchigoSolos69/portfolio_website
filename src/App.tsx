import { useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import DigitalSerenity from "@/components/DigitalSerenity";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load components for better performance
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Organizations = lazy(() => import('./components/Organizations'));
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
    <div className="App text-light overflow-x-hidden w-full">
        <Header />
        <main className="overflow-x-hidden w-full">
          <DigitalSerenity />
          
          <AnimatePresence mode="wait">
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="overflow-x-hidden w-full"
            >
              <Suspense fallback={<LoadingFallback />}>
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Organizations />
                <Contact />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
    </div>
  );
}

export default App;
