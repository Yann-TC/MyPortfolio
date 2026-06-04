export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'Ant Design', 'HTML / CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'DDD basics'],
  },
  {
    category: 'Systems',
    items: ['C', 'C++', 'Linux', 'Networking', 'Multithreading', 'Rust'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'Jira', 'Cypress', 'Docker', 'Agile'],
  },
  {
    category: 'Game / Graphics',
    items: ['Unity', 'C#', 'SFML', 'Raycasting'],
  },
];
