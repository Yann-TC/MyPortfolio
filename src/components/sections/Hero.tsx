import { Download, Eye, Github, Linkedin } from 'lucide-react';
import type { ProfileSettings } from '../../data/profile';
import { Button } from '../ui/Button';

type HeroProps = {
  profile: ProfileSettings;
  onPreviewCv: () => void;
};

function formatInternshipWindow(profile: ProfileSettings) {
  const start = new Date(`${profile.internshipStart}T00:00:00`);
  const end = new Date(`${profile.internshipEnd}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return '1 April - 31 August 2027';
  }

  return `${start.getDate()} ${start.toLocaleString('en', {
    month: 'long',
  })} - ${end.getDate()} ${end.toLocaleString('en', {
    month: 'long',
  })} ${end.getFullYear()}`;
}

export function Hero({ profile, onPreviewCv }: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__meta" aria-label="Internship target">
        <span>{profile.searchZones.join(' - ')}</span>
        <span>{formatInternshipWindow(profile)}</span>
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
          className="button button--secondary"
          type="button"
          onClick={onPreviewCv}
        >
          Preview CV
          <Eye size={17} aria-hidden="true" />
        </button>
        <Button href={profile.resumeUrl} download>
          Download CV
          <Download size={17} aria-hidden="true" />
        </Button>
        <Button variant="ghost" href={profile.githubUrl}>
          GitHub
          <Github size={17} aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          href={profile.linkedinUrl}
        >
          LinkedIn
          <Linkedin size={17} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
