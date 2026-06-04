import type { SkillGroup } from '../../data/skills';
import { Section } from '../layout/Section';
import { Badge } from '../ui/Badge';

type SkillsProps = {
  skills: SkillGroup[];
};

export function Skills({ skills }: SkillsProps) {
  return (
    <Section
      id="skills"
      label="Toolbox"
      title="A typed, practical engineering stack"
      intro="Balanced between frontend production work, backend fundamentals, systems programming, and game-oriented tooling."
    >
      <div className="skills-grid">
        {skills.map((group, index) => (
          <div
            className="skill-group"
            key={group.category}
            data-reveal
            style={{ '--reveal-index': index % 3 }}
          >
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
