import type { ProfileSettings } from '../../data/profile';
import { internshipMonthRange, internshipYear } from '../../lib/internship';
import { Section } from '../layout/Section';

type AboutProps = {
  profile: ProfileSettings;
};

export function About({ profile }: AboutProps) {
  return (
    <Section
      id="about"
      label="Profile"
      title={profile.profileTitle}
      intro={profile.profileIntro}
    >
      <div className="about-grid" data-reveal>
        <figure className="about-portrait">
          <img
            src="/documents/self_picture.jpeg"
            alt="Portrait of Yann TOISON CHABANE"
          />
          <figcaption>Me</figcaption>
        </figure>
        <p>{profile.profileLead}</p>
        <p>{profile.profileExperience}</p>
        <p>
          For {internshipYear(profile)}, I am looking for a development internship
          in {profile.searchZones.join(', ')}.
        </p>
        <p className="placeholder-note">{profile.profileProjects}</p>
        <figure className="about-event about-event--wide">
          <img
            src="/documents/31-Baselhack_2025.JPEG"
            alt="Yann working with teammates at BaselHack 2025"
          />
          <figcaption>BaselHack 2025</figcaption>
        </figure>
        <div className="about-focus" aria-label="Internship availability">
          <span>{internshipMonthRange(profile)}</span>
          <strong>{internshipYear(profile)}</strong>
          <small>{profile.internshipLabel}</small>
        </div>
      </div>
    </Section>
  );
}
