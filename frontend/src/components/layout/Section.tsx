import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, label, title, children }: SectionProps) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section__heading" data-reveal>
        <p className="section__label">{label}</p>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
