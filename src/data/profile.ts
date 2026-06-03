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

export const profile: ProfileSettings = {
  fullName: 'Yann TOISON CHABANE',
  headline: 'SOFTWARE',
  subtitle: 'Engineer Student',
  searchZones: ['France', 'Switzerland', 'Germany', 'Remote Europe'],
  internshipStart: '2027-04-01',
  internshipEnd: '2027-08-31',
  internshipLabel: 'Software Development Internship',
  resumeUrl: '/documents/resume.pdf',
  githubUrl: 'https://github.com/Yann-TC',
  linkedinUrl: 'https://www.linkedin.com/in/yann-toison-chabane',
};
