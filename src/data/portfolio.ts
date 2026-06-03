import { experience, type ExperienceItem } from './experience';
import { profile, type ProfileSettings } from './profile';
import { projects, type Project } from './projects';
import { skills, type SkillGroup } from './skills';

export type PortfolioData = {
  profile: ProfileSettings;
  projects: Project[];
  experience: ExperienceItem[];
  skills: SkillGroup[];
};

export const fallbackPortfolioData: PortfolioData = {
  profile,
  projects,
  experience,
  skills,
};
