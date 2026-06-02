import { Download, Eye, Github, Linkedin } from 'lucide-react';
import { routes } from '../../app/routes';
import { Button } from '../ui/Button';

const resumeUrl = '/documents/resume.pdf';

const navItems = [
  ['About', routes.about],
  ['Projects', routes.projects],
  ['Experience', routes.experience],
  ['Skills', routes.skills],
  ['Contact', routes.contact],
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Header() {
  return (
    <header className="site-header">
      <button
        className="site-header__home"
        type="button"
        onClick={() => scrollToSection('top')}
        aria-label="Back to top"
      >
        Yann Toison Chabane
      </button>
      <nav className="site-header__nav" aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <button key={id} type="button" onClick={() => scrollToSection(id)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="site-header__actions">
        <Button
          variant="ghost"
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Preview CV"
        >
          <Eye size={16} aria-hidden="true" />
          <span>CV</span>
        </Button>
        <Button variant="ghost" href={resumeUrl} download aria-label="Download CV">
          <Download size={16} aria-hidden="true" />
          <span>CV</span>
        </Button>
        <Button variant="ghost" href="https://github.com/Yann-TC" aria-label="GitHub profile">
          <Github size={16} aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          href="https://www.linkedin.com/in/yann-toison-chabane"
          aria-label="LinkedIn profile"
        >
          <Linkedin size={16} aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
