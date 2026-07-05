import { z } from 'zod';

export const profileSettingsSchema = z.object({
  fullName: z.string(),
  headline: z.string(),
  subtitle: z.string(),
  searchZones: z.array(z.string()),
  internshipStart: z.string(),
  internshipEnd: z.string(),
  internshipLabel: z.string(),
  resumeUrl: z.string(),
  recommendationLetterUrl: z.string(),
  githubUrl: z.string(),
  linkedinUrl: z.string(),
});

export const projectLinkSchema = z.object({
  label: z.enum(['GitHub', 'Demo', 'Private', 'Presentation']),
  href: z.string().optional(),
  isPlaceholder: z.boolean().optional(),
});

export const projectSchema = z.object({
  title: z.string(),
  eyebrow: z.string(),
  summary: z.string(),
  awards: z.array(z.string()).optional(),
  stack: z.array(z.string()),
  links: z.array(projectLinkSchema),
});

export const experienceItemSchema = z.object({
  role: z.string(),
  company: z.string(),
  period: z.string(),
  summary: z.string(),
  highlights: z.array(z.string()),
});

export const skillGroupSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

export const portfolioDataSchema = z.object({
  profile: profileSettingsSchema,
  projects: z.array(projectSchema),
  experience: z.array(experienceItemSchema),
  skills: z.array(skillGroupSchema),
});

export type ProfileSettings = z.infer<typeof profileSettingsSchema>;
export type ProjectLink = z.infer<typeof projectLinkSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type PortfolioData = z.infer<typeof portfolioDataSchema>;
