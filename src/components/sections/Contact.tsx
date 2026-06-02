import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Section } from '../layout/Section';

export function Contact() {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Available for internship conversations."
      intro="Software Development Internship target: 1 April - 31 August 2027, open to France, Switzerland, Germany, and remote opportunities across Europe."
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
          <a href="https://github.com/Yann-TC" target="_blank" rel="noreferrer">
            <Github size={16} aria-hidden="true" />
            github.com/Yann-TC
          </a>
          <a
            href="https://www.linkedin.com/in/yann-toison-chabane"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={16} aria-hidden="true" />
            linkedin.com/in/yann-toison-chabane
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
