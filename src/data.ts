export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Interactive Web' | 'Creative Tech' | 'Digital Narrative';
  year: string;
  client: string;
  role: string;
  shortDesc: string;
  description: string;
  longStory: string;
  metrics: { value: string; label: string }[];
  techStack: string[];
  customColor: 'cyan' | 'gold' | 'purple' | 'emerald';
  imageSeed: string;
  galleryThemes: string[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
}

export const PROJECTS: Project[] = [
  {
    id: 'nova',
    title: 'Nova Stellar Map',
    subtitle: 'Cosmic WebGL charting console',
    category: 'Interactive Web',
    year: '2026',
    client: 'Celestial Observatory Ltd.',
    role: 'Lead Creative Developer',
    shortDesc: 'A real-time deep-space charting console rendering over one million stellar coordinates in smooth 60fps.',
    description: 'Nova reimagines celestial navigation by placing raw astronomical dataset APIs into a beautiful, lightweight browser context. Built to evoke the awe-inspiring experience of navigating an interactive, infinite stellar nebula with gravity-bound panning and depth maps.',
    longStory: 'Working alongside an astrophysicist team, we engineered a custom canvas particle coordinate map that fetches active galactic datasets. By optimizing particle buffers and utilizing instanced mesh vertex structures, we moved heavy coordinate queries directly to WebGL contexts. The result is a highly responsive web application that runs seamlessly on mobile devices and desktops alike.',
    metrics: [
      { value: '1.2M+', label: 'Stellar Positions' },
      { value: '60 FPS', label: 'Rendering Performance' },
      { value: '-45%', label: 'Memory Consumption' }
    ],
    techStack: ['WebGL / GLSL', 'React Three Fiber', 'Zustand', 'ASTRO API', 'Tailwind CSS'],
    customColor: 'cyan',
    imageSeed: 'space-stars',
    galleryThemes: [
      'Interactive galaxy orbit mapping UI with telemetry feeds.',
      'Sleek translucent floating side panels for star filtering.',
      'A deep-space gravitational heat-map visualizer.'
    ]
  },
  {
    id: 'kairos',
    title: 'Kairos Chronos',
    subtitle: 'Temporal workflow visualizer',
    category: 'Creative Tech',
    year: '2025',
    client: 'Linear Labs',
    role: 'Interactive Designer',
    shortDesc: 'An elegant procedural clockwork experience translating standard task schedules into stellar, rotating orbits.',
    description: 'Kairos abandons standard rectangular gantt charts in favor of custom orbital concentric paths. Highly interactive, each project segment is mapped to individual gravity levels and orbits, making visual task planning feel relaxing, intuitive, and deeply satisfying.',
    longStory: 'We designed Kairos in an effort to reduce digital work anxiety. The concept was inspired by physical astrolabes and clockwork. By translating task dependencies into magnetic celestial alignments, users can physically "feel" their project timelines spin, with micro-click events emitting gentle harmonic tones.',
    metrics: [
      { value: '98%', label: 'Team Adoption Rate' },
      { value: '12ms', label: 'Interpolation Latency' },
      { value: '30+', label: 'Awwwards Citations' }
    ],
    techStack: ['HTML5 Canvas 2D', 'Framer Motion', 'Web Audio API', 'TypeScript', 'Tailwind CSS'],
    customColor: 'gold',
    imageSeed: 'luxury-clockwork',
    galleryThemes: [
      'Concentric golden task rings spinning around a glowing central clock.',
      'Interactive Gantt timeline transforming into stellar gravity waves.',
      'Micro-detail popups showing harmonic project checkpoints.'
    ]
  },
  {
    id: 'aura',
    title: 'Aura Soundscape',
    subtitle: 'Generative frequency canvas',
    category: 'Digital Narrative',
    year: '2025',
    client: 'Acoustic Arts Museum',
    role: 'Technical Sound Artist',
    shortDesc: 'An audio-reactive physics canvas translating multi-channel atmospheric audio streams into organic visual waves.',
    description: 'Aura is a digital soundscape installation that connects users directly with generative sound. By capturing micro-auditory inputs from the client browser or microphone, it computes fluid dynamics onto a cellular grid, creating an infinite kaleidoscope of dreamcore visuals.',
    longStory: 'Aura was developed for the Tokyo Digital Expression Fair. The algorithm uses a custom fast Fourier transform (FFT) analysis pipeline. Values are mapped directly into fluid velocity fields. Sound peaks create ripples that shift the color spectrum seamlessly from calming deep blues to electric sunset shades.',
    metrics: [
      { value: '300k+', label: 'Digital Attendees' },
      { value: '8ms', label: 'Audio Latency Buffer' },
      { value: 'Infinite', label: 'Generative Visual States' }
    ],
    techStack: ['Web Audio FFT', 'Custom Fragment Shaders', 'React Canvas API', 'Cubic-Bezier Interpolation'],
    customColor: 'purple',
    imageSeed: 'abstract-waves',
    galleryThemes: [
      'Neon fluid waves crashing in response to baseline drum beats.',
      'Minimalist oscilloscope mode stripping graphics down to single glowing threads.',
      'Atmospheric color shifts mapping low and high pitch ratios.'
    ]
  },
  {
    id: 'vesper',
    title: 'Vesper Commerce',
    subtitle: 'Spatial luxury experience',
    category: 'Interactive Web',
    year: '2024',
    client: 'Vesper Luxury Group',
    role: 'Lead UI/UX Architect',
    shortDesc: 'A spatial storefront introducing organic physical weight & float mechanics to standard product selections.',
    description: 'Vesper completely overhauls the static catalog table. Products float in an anti-gravity layout, responding dynamically to cursor proximity, allowing customers to experience three-dimensional structural details with organic, weight-simulated hover physics.',
    longStory: 'Built for a premium Swiss watchmaker, Vesper was designed to capture the luxury experience of holding a heavy, exquisitely crafted timepieces. Users interact with floating modules that expand on click with physical micro-movements, bringing the tactility of high-end physical products directly onto high-refresh-rate screens.',
    metrics: [
      { value: 'x3.4', label: 'E-commerce Conversion' },
      { value: '4.9/5', label: 'User Satisfaction' },
      { value: '0.4s', label: 'Average Interaction Load' }
    ],
    techStack: ['Reactive Hover Springs', 'Tailwind Grid Systems', 'WebGL Shaders', 'Framer Motion Spring Engine'],
    customColor: 'emerald',
    imageSeed: 'emerald-crystals',
    galleryThemes: [
      'Product modules sliding under custom glass refraction layers.',
      'Immersive full-screen carousel rotating clocks at high resolution.',
      'Elegant floating checkout card utilizing biometric UX cues.'
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    period: '2024 — Present',
    role: 'Senior Creative Technologist',
    company: 'Nexus Creative Lab',
    description: 'Leading front-end design, interaction architecture, and high-performance layout engines for luxury branding agencies globally.',
    tags: ['Awwwards Standard', 'Interactive Design', 'WebGL Tuning', 'Tailwind System Design']
  },
  {
    period: '2022 — 2024',
    role: 'Interactive Developer',
    company: 'Stellar Interactive',
    description: 'Spearheaded 2D/3D physics setups, canvas particle engines, and micro-audio interactions for commercial storytelling landing pages.',
    tags: ['HTML5 Canvas', 'Framer Motion Lab', 'Web Audio APIs', 'UI Performance Tuning']
  },
  {
    period: '2020 — 2022',
    role: 'UI Designer & Prototyper',
    company: 'Aether Digital',
    description: 'Crafted low-latency web interfaces, fluid layouts, and brand motion guidelines using precise design systems.',
    tags: ['Design Systems', 'Advanced CSS', 'Interactive Mockups', 'Typography Pairing']
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Motion & Interactivity',
    skills: [
      { name: 'Framer Motion Spring Physics', level: 95 },
      { name: 'HTML5 Canvas 2D Engine Rendering', level: 90 },
      { name: 'Custom GLSL Refraction Shaders', level: 85 },
      { name: 'Smooth Scroll & Lerp Mechanics', level: 98 }
    ]
  },
  {
    category: 'Art Direction & Design',
    skills: [
      { name: 'Cinematic Typography Pairing', level: 96 },
      { name: 'Asymmetrical High-End Layouts', level: 92 },
      { name: 'Color Psychology & Ambient Glows', level: 90 },
      { name: 'Micro-Interactions & Hover Feedback', level: 97 }
    ]
  },
  {
    category: 'Architecture & Performance',
    skills: [
      { name: 'Next.js / Vite React Architecture', level: 95 },
      { name: 'Canvas Buffer Optimization & Tuning', level: 88 },
      { name: 'Tailwind Utility Composition', level: 99 },
      { name: 'SEO & Core Web Vitals Tuning', level: 94 }
    ]
  }
];
