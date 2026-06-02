import { skills } from '../../data/skills';
import { Section } from '../layout/Section';
import { Badge } from '../ui/Badge';

export function Skills() {
  return (
    <Section
      id="skills"
      label="Toolbox"
      title="A typed, practical engineering stack"
      intro="Balanced between frontend production work, backend fundamentals, systems programming, and game-oriented tooling."
    >
      <div className="skills-grid">
        {skills.map((group) => (
          <div className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <div className="tag-list">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
