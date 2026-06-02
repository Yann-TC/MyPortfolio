import { Section } from '../layout/Section';

export function About() {
  return (
    <Section
      id="about"
      label="Profile"
      title="Engineering student with production frontend experience."
      intro="Focused on building reliable, readable software across modern frontend, backend services, and lower-level systems."
    >
      <div className="about-grid">
        <figure className="about-portrait">
          <img
            src="/documents/self_picture.jpeg"
            alt="Portrait of Yann TOISON CHABANE"
          />
          <figcaption>Yann TOISON CHABANE</figcaption>
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
          For 2027, I am looking for a development internship in France,
          Switzerland, Germany, or remote across Europe.
        </p>
        <p className="placeholder-note">
          Outside client work, I like projects where code has to move: network
          games, graphics experiments, hackathons, and teaching sessions.
        </p>
        <div className="about-focus" aria-label="Internship availability">
          <span>April - August</span>
          <strong>2027</strong>
          <small>Software development internship</small>
        </div>
      </div>
    </Section>
  );
}
