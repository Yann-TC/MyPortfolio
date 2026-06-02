import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function Section({ id, label, title, intro, children }: SectionProps) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section__heading">
        <p className="section__label">{label}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        {intro ? <p className="section__intro">{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}
