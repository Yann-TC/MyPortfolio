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

export const projects: Project[] = [
  {
    title: 'Zappy',
    eyebrow: 'Network Game Simulation',
    summary:
      'EPITECH second year team project with three binaries: a C++ server managing a real-time game world and TCP protocol, a graphical client, and an autonomous AI player.',
    stack: ['C++', 'Networking', 'AI', 'Python', 'SFML'],
    links: [
      //{ label: 'GitHub', isPlaceholder: true },
      { label: 'Private' },
      //{ label: ' ', isPlaceholder: true },
    ],
  },
  {
    title: 'Animap',
    eyebrow: 'Zoo Collaboration',
    summary:
      'Team project for Mulhouse Zoo: visitor-experience web app with interactive map, GPS routing, augmented reality experience, and AI chatbot.',
    awards: ['Event winner'],
    stack: ['React', 'TypeScript', 'AI Chatbot', 'Augmented Reality'],
    links: [{ label: 'Presentation', href: 'https://www.linkedin.com/posts/yann-toison-chabane_aujourdhui-vient-de-se-terminer-une-semaine-activity-7417963466323349506-iOIy?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFM8CXUBt5lKWZs7tUN1ZKfdEv8zY_zdBsU' }],
  },
  {
    title: 'Anamorph',
    eyebrow: 'EPITECH Game Jam',
    summary:
      'Game jam entry shipped by a team of 6 in 3 days on the theme Illusion.',
    awards: ['Event winner'],
    stack: ['Unity', 'C#', 'Game Design'],
    links: [
      //{ label: 'GitHub', isPlaceholder: true },
      { label: 'Demo', href: 'https://www.youtube.com/watch?v=iXvxTeBBGbk' },
    ],
  },
  {
    title: 'Cartridge',
    eyebrow: 'Game Boy Multi-Game Cartridge',
    summary:
      'EPITECH second year team project: a runtime engine and game collection targeting Game Boy (GBDK), with a scene system, audio/render subsystems, and SRAM saves across multiple cartridges.',
    stack: ['Modular C', 'GBDK', 'Game Boy', 'Embedded'],
    links: [{ label: 'GitHub', href: 'https://github.com/Yann-TC/Cartridge' }],
  },
  {
    title: 'BaselHack 2025',
    eyebrow: 'Hackathon / Endress+Hauser Challenge',
    summary:
      'Selected the Endress+Hauser sponsored challenge and built a survey platform to create questionnaires, gather opinions, analyze results with AI, and assist users with AI-generated survey questions.',
    stack: ['Flutter', 'Dart', 'Fastify', 'TypeScript', 'Python', 'AI Agent'],
    links: [
      { label: 'GitHub', href: 'https://github.com/mael-bertocchi/baselhack-2025' },
      { label: 'Presentation', href: 'https://www.linkedin.com/posts/yann-toison-chabane_hackathon-baselhack2025-epitech-activity-7391748608741707776-0rn_?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFM8CXUBt5lKWZs7tUN1ZKfdEv8zY_zdBsU' }
      //{ label: 'Demo', isPlaceholder: true },
    ],
  },
  {
    title: 'Kare Landing Page',
    eyebrow: 'Production Frontend / AkorD',
    summary:
      'Public landing page for Kare, a SaaS product for digitized safety registers and regulatory building obligations.',
    stack: ['React', 'TypeScript', 'Responsive UI', 'Production delivery'],
    links: [
      { label: 'Private' },
      { label: 'Demo', href: 'https://kare-app.fr' },
    ],
  },
];
