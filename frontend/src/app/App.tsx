import { useEffect, useLayoutEffect, useState } from 'react';
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Experience } from '../components/sections/Experience';
import { Hero } from '../components/sections/Hero';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { CvPreviewModal } from '../components/ui/CvPreviewModal';
import { fallbackPortfolioData, type PortfolioData } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { loadPortfolioData } from '../lib/portfolioData';

export function App() {
  const [portfolioData, setPortfolioData] =
    useState<PortfolioData>(fallbackPortfolioData);
  const [isDataStale, setIsDataStale] = useState(false);
  const [isCvPreviewOpen, setIsCvPreviewOpen] = useState(false);

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }, []);

  useEffect(() => {
    let isMounted = true;

    loadPortfolioData().then(({ data, isStale }) => {
      if (isMounted) {
        setPortfolioData(data);
        setIsDataStale(isStale);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useScrollReveal([portfolioData]);

  return (
    <>
      <Header
        profile={portfolioData.profile}
        onPreviewCv={() => setIsCvPreviewOpen(true)}
      />
      {isDataStale ? (
        <p className="data-warning" role="status">
          Live data could not be loaded. Some information may be outdated.
        </p>
      ) : null}
      <main>
        <Hero
          profile={portfolioData.profile}
          onPreviewCv={() => setIsCvPreviewOpen(true)}
        />
        <About profile={portfolioData.profile} />
        <Projects projects={portfolioData.projects} />
        <Experience experience={portfolioData.experience} />
        <Skills skills={portfolioData.skills} />
        <Contact profile={portfolioData.profile} />
      </main>
      <Footer />
      <CvPreviewModal
        resumeUrl={portfolioData.profile.resumeUrl}
        isOpen={isCvPreviewOpen}
        onClose={() => setIsCvPreviewOpen(false)}
      />
    </>
  );
}
