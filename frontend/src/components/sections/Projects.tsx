import { ExternalLink, Github, Linkedin } from 'lucide-react';
import type { Project } from '../../data/projects';
import { Section } from '../layout/Section';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  return (
    <Section
      id="projects"
      label="Selected work"
      title="Featured projects"
      intro="A compact selection spanning network programming, production frontend work, hackathon products, games, and graphics-oriented engineering."
    >
      <div className="project-grid">
        {projects.map((project, index) => (
          <Card
            key={project.title}
            className="project-card"
            data-reveal
            style={{ '--reveal-index': index % 3 }}
          >
            <div className="project-card__top">
              <p>{project.eyebrow}</p>
              {project.awards?.length ? (
                <div className="award-list" aria-label={`${project.title} awards`}>
                  {project.awards.map((award) => (
                    <span className="award-badge" key={award}>
                      {award}
                    </span>
                  ))}
                </div>
              ) : (
                <span aria-hidden="true">/</span>
              )}
            </div>
            <h3>{project.title}</h3>
            <p className="project-card__summary">{project.summary}</p>
            <div className="tag-list" aria-label={`${project.title} stack`}>
              {project.stack.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <div className="project-card__links">
              {project.links.map((link) => (
                link.label === 'Private' || link.isPlaceholder || !link.href ? (
                  <span
                    key={link.label}
                    className="project-card__link project-card__link--muted"
                    aria-label={`${project.title} ${link.label} unavailable`}
                  >
                    {link.label === 'Presentation' ? (
                      <Linkedin size={16} aria-hidden="true" />
                    ) : link.label === 'Demo' ? (
                      <ExternalLink size={16} aria-hidden="true" />
                    ) : (
                      <Github size={16} aria-hidden="true" />
                    )}
                    <span>
                      {link.label}
                      {link.isPlaceholder ? ' [Placeholder]' : ''}
                    </span>
                  </span>
                ) : (
                  <a
                    key={link.label}
                    className="project-card__link"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} ${link.label}${link.isPlaceholder ? ' placeholder' : ''}`}
                  >
                    {link.label === 'Presentation' ? (
                      <Linkedin size={16} aria-hidden="true" />
                    ) : link.label === 'GitHub' ? (
                      <Github size={16} aria-hidden="true" />
                    ) : (
                      <ExternalLink size={16} aria-hidden="true" />
                    )}
                    <span>
                      {link.label}
                      {link.isPlaceholder ? ' [Placeholder]' : ''}
                    </span>
                  </a>
                )
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
