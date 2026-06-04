export type ProfileSettings = {
  fullName: string;
  headline: string;
  subtitle: string;
  searchZones: string[];
  internshipStart: string;
  internshipEnd: string;
  internshipLabel: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
};

export type ProjectLink = {
  label: 'GitHub' | 'Demo' | 'Private' | 'Presentation';
  href?: string;
  isPlaceholder?: boolean;
};

export type Project = {
  title: string;
  eyebrow: string;
  summary: string;
  awards?: string[];
  stack: string[];
  links: ProjectLink[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type PortfolioData = {
  profile: ProfileSettings;
  projects: Project[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
};
