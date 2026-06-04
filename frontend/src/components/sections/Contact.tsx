import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import type { ProfileSettings } from '../../data/profile';
import { Section } from '../layout/Section';

type ContactProps = {
  profile: ProfileSettings;
};

function formatDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return `${parsedDate.getDate()} ${parsedDate.toLocaleString('en', {
    month: 'long',
  })}`;
}

function formatContactIntro(profile: ProfileSettings) {
  const end = new Date(`${profile.internshipEnd}T00:00:00`);
  const year = Number.isNaN(end.getTime()) ? '2027' : String(end.getFullYear());

  return `${profile.internshipLabel} target: ${formatDate(
    profile.internshipStart,
  )} - ${formatDate(profile.internshipEnd)} ${year}, open to ${profile.searchZones.join(
    ', ',
  )}.`;
}

function readableProfileUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export function Contact({ profile }: ContactProps) {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Available for internship conversations."
      intro={formatContactIntro(profile)}
    >
      <div className="contact-panel">
        <div>
          <p className="contact-panel__label">Email</p>
          <a href="mailto:yann.toison-chabane@epitech.eu" target="_blank" rel="noreferrer">
            <Mail size={16} aria-hidden="true" />
            yann.toison-chabane@epitech.eu
          </a>
          <a href="tel:+33672603283" target="_blank" rel="noreferrer">
            <Phone size={16} aria-hidden="true" />
            +33 6 72 60 32 83
          </a>
        </div>
        <div>
          <p className="contact-panel__label">Profiles</p>
          <a href={profile.githubUrl} target="_blank" rel="noreferrer">
            <Github size={16} aria-hidden="true" />
            {readableProfileUrl(profile.githubUrl)}
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={16} aria-hidden="true" />
            {readableProfileUrl(profile.linkedinUrl)}
          </a>
        </div>
        <div>
          <p className="contact-panel__label">Location</p>
          <p>
            <MapPin size={16} aria-hidden="true" />
            Issenheim, 68500 France
          </p>
        </div>
      </div>
    </Section>
  );
}
