import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Project } from './data';
import { audioController } from './utils/audio';

// Subcomponents import
import CustomCursor from './components/CustomCursor';
import ParticleCanvas, { ParticleMode } from './components/ParticleCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import QuantumSandbox from './components/QuantumSandbox';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [particleMode, setParticleMode] = useState<ParticleMode>('ambient');
  const [particleColor, setParticleColor] = useState<string>('cyan');
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  // Layout Viewport Section Target Refs
  const projectsSectionRef = useRef<HTMLDivElement | null>(null);
  const sandboxSectionRef = useRef<HTMLDivElement | null>(null);

  // Handle programmatic scroll actions
  const handleScrollToProjects = () => {
    projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleScrollToSandbox = () => {
    sandboxSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Toggle Atmospheric Drone sound synthesis
  const handleToggleAudio = () => {
    const nextState = !isAudioActive;
    const finalState = audioController.toggleAudio(nextState);
    setIsAudioActive(finalState);
  };

  // Safe gesture-unblock trigger: Browser autoplay safety
  // If the user clicks anywhere on the site for the first time AND audio is requested to start,
  // we ensure AudioContext gets activated without issues.
  useEffect(() => {
    const handleInitialUserGesture = () => {
      if (isAudioActive) {
        audioController.toggleAudio(true);
      }
    };
    window.addEventListener('click', handleInitialUserGesture, { once: true });
    return () => window.removeEventListener('click', handleInitialUserGesture);
  }, [isAudioActive]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F7] font-sans antialiased overflow-x-hidden selection:bg-[#00F0FF] selection:text-black">
      
      {/* 1. Precise Trailing Custom Cursor Pointer */}
      <CustomCursor />

      {/* 2. Cinematic Film Grain Noise Overlay (Dynamic physical texture) */}
      <div className="film-grain" />

      {/* 3. Deep-Core Interactive Canvas Background Particle Reactor */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <ParticleCanvas mode={particleMode} />
      </div>

      {/* Geometric Balance Ambient background layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#0A1A2F] rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#1A0A2F] rounded-full blur-[120px] opacity-25"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/[0.03] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-white/[0.02] rounded-full"></div>
      </div>

      {/* 4. Scrollable Core Page Columns */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* HERO INSTANCE */}
        <Hero
          onScrollToProjects={handleScrollToProjects}
          onScrollToSandbox={handleScrollToSandbox}
          isAudioEnabled={isAudioActive}
          onToggleAudio={handleToggleAudio}
        />

        {/* BIOGRAPHY & ROLES INSTANCE */}
        <About />

        {/* PROJECTS GALLERIES INSTANCE */}
        <div ref={projectsSectionRef} className="w-full scroll-mt-6">
          <Projects onSelectProject={setSelectedProject} />
        </div>

        {/* QUANTUM SANDBOX INSTANCE */}
        <div ref={sandboxSectionRef} className="w-full scroll-mt-6">
          <QuantumSandbox
            currentMode={particleMode}
            onModeChange={setParticleMode}
            particleColor={particleColor}
            onColorChange={setParticleColor}
            isAudioEnabled={isAudioActive}
            onToggleAudio={handleToggleAudio}
          />
        </div>

        {/* FOOTER & CONNECT CHANNELS INSTANCE */}
        <Contact />
      </div>

      {/* 5. Cinematic Case study modal with sliding Framer-Motion transition */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
