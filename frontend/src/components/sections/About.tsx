import type { ProfileSettings } from '../../data/profile';
import { Section } from '../layout/Section';

type AboutProps = {
  profile: ProfileSettings;
};

function getInternshipYear(profile: ProfileSettings) {
  const end = new Date(`${profile.internshipEnd}T00:00:00`);

  if (Number.isNaN(end.getTime())) {
    return '2027';
  }

  return String(end.getFullYear());
}

function getInternshipMonths(profile: ProfileSettings) {
  const start = new Date(`${profile.internshipStart}T00:00:00`);
  const end = new Date(`${profile.internshipEnd}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 'April - August';
  }

  return `${start.toLocaleString('en', {
    month: 'long',
  })} - ${end.toLocaleString('en', {
    month: 'long',
  })}`;
}

export function About({ profile }: AboutProps) {
  return (
    <Section
      id="about"
      label="Profile"
      title="Engineering student with production frontend experience."
      intro="Focused on building reliable, readable software across modern frontend, backend services, and lower-level systems."
    >
      <div className="about-grid" data-reveal>
        <figure className="about-portrait">
          <img
            src="/documents/self_picture.jpeg"
            alt="Portrait of Yann TOISON CHABANE"
          />
          <figcaption>Me</figcaption>
        </figure>
        <p>
          Second-year student at EPITECH Mulhouse, building a profile between
          product interfaces and lower-level engineering fundamentals.
        </p>
        <p>
          At AkorD, I worked on Kare in a production TypeScript monorepo:
          landing page, attachment flows, mobile interventions, and Cypress
          regression work.
        </p>
        <p>
          For {getInternshipYear(profile)}, I am looking for a development
          internship in {profile.searchZones.join(', ')}.
        </p>
        <p className="placeholder-note">
          Outside client work, I like projects where code has to move: network
          games, graphics experiments, hackathons, and teaching sessions.
        </p>
        <figure className="about-event about-event--wide">
          <img
            src="/documents/31-Baselhack_2025.JPEG"
            alt="Yann working with teammates at BaselHack 2025"
          />
          <figcaption>BaselHack 2025</figcaption>
        </figure>
        <div className="about-focus" aria-label="Internship availability">
          <span>{getInternshipMonths(profile)}</span>
          <strong>{getInternshipYear(profile)}</strong>
          <small>{profile.internshipLabel}</small>
        </div>
      </div>
    </Section>
  );
}
