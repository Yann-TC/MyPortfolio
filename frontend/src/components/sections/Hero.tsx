import { FileText, Github, Linkedin } from 'lucide-react';
import { routes } from '../../app/routes';
import type { ProfileSettings } from '../../data/profile';
import { internshipDateRange } from '../../lib/internship';
import { scrollToSection } from '../../lib/scroll';
import { Button } from '../ui/Button';

type HeroProps = {
  profile: ProfileSettings;
};

export function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__meta" aria-label="Internship target">
        <span>{profile.searchZones.join(' - ')}</span>
        <span>{internshipDateRange(profile)}</span>
        <span>{profile.internshipLabel}</span>
      </div>

      <div className="hero__type">
        <p className="hero__kicker">{profile.fullName}</p>
        <h1 id="hero-title">{profile.headline}</h1>
        <p className="hero__script">{profile.subtitle}</p>
      </div>

      <div className="hero__content">
        <p className="hero__subtitle">Learning at EPITECH</p>
        <p className="hero__stack">
          React - TypeScript - C++ - C - Unity - Python
        </p>
        <p className="hero__copy">
          Building clear, production-minded software with a focus on a clean frontend
          craft.
          I also love lower-level programming, game development, and exploring new technologies.
        </p>
      </div>

      <div className="hero__actions" aria-label="Portfolio actions">
        <button
          className="button button--ghost"
          type="button"
          onClick={() => scrollToSection(routes.documents)}
        >
          Documents
          <FileText size={17} aria-hidden="true" />
        </button>
        <Button variant="ghost" href={profile.githubUrl}>
          GitHub
          <Github size={17} aria-hidden="true" />
        </Button>
        <Button variant="ghost" href={profile.linkedinUrl}>
          LinkedIn
          <Linkedin size={17} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
