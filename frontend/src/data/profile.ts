export type ProfileSettings = {
  fullName: string;
  headline: string;
  subtitle: string;
  profileTitle: string;
  profileIntro: string;
  profileLead: string;
  profileExperience: string;
  profileProjects: string;
  searchZones: string[];
  internshipStart: string;
  internshipEnd: string;
  internshipLabel: string;
  resumeUrl: string;
  recommendationLetterUrl: string;
  githubUrl: string;
  linkedinUrl: string;
};

export const profile: ProfileSettings = {
  fullName: 'Yann TOISON CHABANE',
  headline: 'SOFTWARE',
  subtitle: 'Engineer Student',
  profileTitle: 'Engineering student with production frontend experience.',
  profileIntro:
    'Focused on building reliable, readable software across modern frontend, backend services, and lower-level systems.',
  profileLead:
    'Third-year student at EPITECH Mulhouse, building a profile between product interfaces and lower-level engineering fundamentals.',
  profileExperience:
    'At AkorD, I worked on Kare in a production TypeScript monorepo: landing page, attachment flows, mobile interventions, and Cypress regression work.',
  profileProjects:
    'Outside client work, I like projects where code has to move: network games, graphics experiments, hackathons, and teaching sessions.',
  searchZones: ['France', 'Switzerland', 'Germany', 'Remote Europe'],
  internshipStart: '2027-04-01',
  internshipEnd: '2027-08-31',
  internshipLabel: 'Software Development Internship',
  resumeUrl: '/documents/resume.pdf',
  recommendationLetterUrl: '/documents/lettre_recommandation_yann_tc_akord.pdf',
  githubUrl: 'https://github.com/Yann-TC',
  linkedinUrl: 'https://www.linkedin.com/in/yann-toison-chabane',
};
