import { Download, Eye, Github, Linkedin } from 'lucide-react';
import { Button } from '../ui/Button';

const resumeUrl = '/documents/resume.pdf';

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__meta" aria-label="Internship target">
        <span>France - Switzerland - Germany - Remote Europe</span>
        <span>1 April - 31 August 2027</span>
        <span>Software Development Internship</span>
      </div>

      <div className="hero__type">
        <p className="hero__kicker">Yann TOISON CHABANE</p>
        <h1 id="hero-title">SOFTWARE</h1>
        <p className="hero__script">Developer Student</p>
      </div>

      <div className="hero__content">
        <p className="hero__subtitle">Software Engineering Student @ EPITECH</p>
        <p className="hero__stack">
          React - TypeScript - C++ - C - Full Stack
        </p>
        <p className="hero__copy">
          Building clear, production-minded software with a focus on frontend
          craft, systems fundamentals, and full-stack engineering.
        </p>
      </div>

      <div className="hero__actions" aria-label="Portfolio actions">
        <Button variant="secondary" href={resumeUrl} target="_blank" rel="noreferrer">
          Preview CV
          <Eye size={17} aria-hidden="true" />
        </Button>
        <Button href={resumeUrl} download>
          Download CV
          <Download size={17} aria-hidden="true" />
        </Button>
        <Button variant="ghost" href="https://github.com/Yann-TC">
          GitHub
          <Github size={17} aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          href="https://www.linkedin.com/in/yann-toison-chabane"
        >
          LinkedIn
          <Linkedin size={17} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
