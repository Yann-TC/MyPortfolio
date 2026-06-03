import { Download, Eye, Github, Linkedin } from 'lucide-react';
import { routes } from '../../app/routes';
import type { ProfileSettings } from '../../data/profile';
import { Button } from '../ui/Button';

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

type HeaderProps = {
  profile: ProfileSettings;
};

export function Header({ profile }: HeaderProps) {
  return (
    <header className="site-header">
      <button
        className="site-header__home"
        type="button"
        onClick={() => scrollToSection('top')}
        aria-label="Back to top"
      >
        {profile.fullName}
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
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Preview CV"
        >
          <Eye size={16} aria-hidden="true" />
          <span>CV</span>
        </Button>
        <Button variant="ghost" href={profile.resumeUrl} download aria-label="Download CV">
          <Download size={16} aria-hidden="true" />
          <span>CV</span>
        </Button>
        <Button variant="ghost" href={profile.githubUrl} aria-label="GitHub profile">
          <Github size={16} aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          href={profile.linkedinUrl}
          aria-label="LinkedIn profile"
        >
          <Linkedin size={16} aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
