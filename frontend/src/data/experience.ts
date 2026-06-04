export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: 'Frontend Developer Intern',
    company: 'AkorD',
    period: 'Aug. - Dec. 2025',
    summary:
      'Contributed to Kare, a SaaS digitalizing fire-safety registers for buildings open to the public, inside a 7-person product team.',
    highlights: [
      'Shipped major UI work: public landing page, reusable attachment component with PDF / .eml support, mobile technician intervention flows, and AI anomaly-extraction interface.',
      'Worked in a TypeScript monorepo using Domain-Driven Design, React, Ant Design, and Cypress.',
      'Rebuilt key Cypress regression tests and supported production delivery through reviews, bug fixes, hotfixes, and the Oskare to Kare rebrand.',
    ],
  },
  {
    role: 'Assistant EPITECH Région',
    company: 'EPITECH',
    period: 'Feb. - July 2026',
    summary:
      'Mentoring and evaluating first-year EPITECH students through C projects.',
    highlights: [
      'Provides code reviews, debugging support, architecture guidance, and methodology follow-up.',
      'Evaluates projects and defenses against EPITECH criteria with technical feedback on correctness, maintainability, and rigor.',
      'Runs Coding Clubs, programming initiation workshops for high-school students.',
    ],
  },
];
