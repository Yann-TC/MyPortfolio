import { experience } from '../../data/experience';
import { Section } from '../layout/Section';
import { Card } from '../ui/Card';

export function Experience() {
  return (
    <Section
      id="experience"
      label="Experience"
      title="Production context and teaching support"
      intro="Hands-on frontend delivery on a production SaaS product, paired with mentoring, code review, and evaluation responsibilities at EPITECH."
    >
      <div className="timeline">
        {experience.map((item) => (
          <Card key={`${item.role}-${item.company}`} className="experience-card">
            <div className="experience-card__meta">
              <p>{item.company}</p>
              <span>{item.period}</span>
            </div>
            <h3>{item.role}</h3>
            <p>{item.summary}</p>
            <ul>
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
