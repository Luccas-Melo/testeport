import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ArrowRight, ExternalLink, Calendar, Code, Activity, ShieldCheck } from 'lucide-react';
import { PROJECTS, Project } from '../data';
import { audioController } from '../utils/audio';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export default function Projects({ onSelectProject }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Interactive Web' | 'Creative Tech' | 'Digital Narrative'>('all');

  const categories = [
    { id: 'all', label: 'TODAS AS OBRAS' },
    { id: 'Interactive Web', label: 'INTERACTIVE WEB' },
    { id: 'Creative Tech', label: 'CREATIVE TECH' },
    { id: 'Digital Narrative', label: 'DIGITAL NARRATIVE' }
  ];

  const handleHoverEvent = () => {
    audioController.playHoverChime();
  };

  const handleFilterClick = (filterId: any) => {
    audioController.playClick();
    setActiveFilter(filterId);
  };

  // Filter project lists
  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  // Gradient themes for beautiful custom covers
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'cyan':
        return {
          bg: 'from-cyan-950/20 via-slate-950 to-neutral-950',
          glow: 'rgba(0, 240, 255, 0.15)',
          border: 'border-[#00F0FF]/25 group-hover:border-[#00F0FF]/60',
          text: 'text-[#00F0FF]',
          badge: 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/20'
        };
      case 'gold':
        return {
          bg: 'from-amber-950/10 via-slate-950 to-neutral-950',
          glow: 'rgba(234, 179, 8, 0.11)',
          border: 'border-amber-500/20 group-hover:border-[#00F0FF]/40',
          text: 'text-amber-400',
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
        };
      case 'purple':
        return {
          bg: 'from-purple-950/20 via-slate-950 to-neutral-950',
          glow: 'rgba(168, 85, 247, 0.12)',
          border: 'border-purple-500/20 group-hover:border-[#00F0FF]/40',
          text: 'text-purple-400',
          badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20'
        };
      case 'emerald':
        return {
          bg: 'from-emerald-950/15 via-slate-950 to-neutral-950',
          glow: 'rgba(16, 185, 129, 0.11)',
          border: 'border-emerald-500/20 group-hover:border-[#00F0FF]/40',
          text: 'text-emerald-400',
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
        };
      default:
        return {
          bg: 'from-zinc-900 via-slate-950 to-neutral-950',
          glow: 'rgba(255, 255, 255, 0.05)',
          border: 'border-white/10',
          text: 'text-white',
          badge: 'bg-white/5 text-gray-300'
        };
    }
  };

  return (
    <section className="relative px-6 md:px-12 lg:px-24 py-24 z-10 w-full max-w-7xl mx-auto border-t border-white/5 select-none">
      
      {/* Editorial Title */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-4 text-left">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-mono text-xs text-[#00F0FF] tracking-widest uppercase flex items-center space-x-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <span>02 / TRABALHOS EM DESTAQUE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-serif text-white tracking-tight mt-3"
          >
            Showcase de Obras
          </motion.h2>
        </div>
        
        {/* Navigation / Filters Pill container */}
        <div className="flex flex-wrap gap-2 max-w-xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterClick(cat.id as any)}
              className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all rounded-none cursor-none ${
                activeFilter === cat.id
                  ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-medium'
                  : 'bg-transparent text-gray-500 hover:text-gray-300 border border-transparent'
              }`}
              onMouseEnter={handleHoverEvent}
              data-cursor="hover"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid mapping of featured works */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => {
            const styles = getColorClasses(proj.customColor);

            return (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  audioController.playImpactRipple();
                  onSelectProject(proj);
                }}
                className={`group glass-panel rounded-none flex flex-col justify-between overflow-hidden cursor-none hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 border ${styles.border}`}
                onMouseEnter={handleHoverEvent}
                data-cursor="view"
                data-cursor-text="ABRIR CASE"
              >
                {/* Visual Cover Box container simulating physical device mockup */}
                <div className={`relative h-64 md:h-72 w-full bg-gradient-to-b ${styles.bg} flex items-center justify-center p-8 overflow-hidden border-b border-white/5`}>
                  
                  {/* Glowing absolute backing background vector */}
                  <div
                    className="absolute w-44 h-44 rounded-full filter blur-3xl opacity-30 transition-all duration-700 group-hover:scale-135"
                    style={{ backgroundColor: styles.glow }}
                  />

                  {/* Wireframe grids detail */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                  {/* Beautiful customized abstract high-end UX design element rather than a raw mock */}
                  <div className="relative w-full max-w-xs h-36 rounded-none glass-panel-heavy border-white/5 flex flex-col justify-between p-4 shadow-2xl transition-all duration-500 group-hover:translate-y-[-6px] group-hover:rotate-[1deg]">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div className="flex space-x-1.5">
                        <span className="w-2 h-2 rounded-none bg-red-500/20 border border-red-500/40" />
                        <span className="w-2 h-2 rounded-none bg-amber-500/20 border border-amber-500/40" />
                        <span className="w-2 h-2 rounded-none bg-green-500/20 border border-green-500/40" />
                      </div>
                      <span className="font-mono text-[8px] text-gray-500 tracking-wider">CONSOLE_MONITOR_v1.0</span>
                    </div>

                    {/* Animated visual waveform/particles lines within card */}
                    <div className="flex-1 flex items-center justify-center space-x-1.5 py-4">
                      {[0.3, 0.8, 0.5, 0.9, 0.4, 0.7, 0.2].map((h, hIdx) => (
                        <motion.div
                          key={hIdx}
                          animate={{ height: [`${h * 24}px`, `${(1 - h) * 44}px`, `${h * 24}px`] }}
                          transition={{ duration: 1.5 + hIdx * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-1.5 rounded-none bg-gradient-to-t"
                          style={{
                            backgroundImage: proj.customColor === 'cyan'
                              ? 'linear-gradient(to top, rgba(0,240,255,0.1), rgba(0,240,255,0.8))'
                              : proj.customColor === 'gold'
                              ? 'linear-gradient(to top, rgba(234,179,8,0.1), rgba(234,179,8,0.8))'
                              : proj.customColor === 'purple'
                              ? 'linear-gradient(to top, rgba(168,85,247,0.1), rgba(168,85,247,0.8))'
                              : 'linear-gradient(to top, rgba(16,185,129,0.1), rgba(16,185,129,0.8))'
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5 font-mono text-[8px] text-gray-500">
                      <span>FPS: 60.00</span>
                      <span className={styles.text}>CORE_OK</span>
                    </div>
                  </div>

                  {/* Absolute Corner telemetries */}
                  <div className="absolute top-4 left-4 font-mono text-[8px] text-gray-500 tracking-widest uppercase">
                    YEAR: {proj.year}
                  </div>
                  <div className="absolute top-4 right-4 font-mono text-[8px] text-gray-500 tracking-widest uppercase flex items-center">
                    <Activity className="w-3 h-3 mr-1 text-[#00F0FF] animate-pulse" />
                    LIVE MODEL
                  </div>
                </div>

                {/* Information Footer block inside card */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-none border ${styles.badge}`}>
                        {proj.category}
                      </span>
                      <span className="font-mono text-[10px] text-gray-500">{proj.year}</span>
                    </div>

                    <h3 className="text-2xl font-serif text-white tracking-tight mt-3 font-light group-hover:text-[#00F0FF] transition-colors duration-300">
                      {proj.title}
                    </h3>
                    <p className="text-gray-400 font-sans tracking-wide text-xs md:text-sm leading-relaxed mt-2 font-light">
                      {proj.shortDesc}
                    </p>
                  </div>

                  {/* Stack pills and open arrow */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 max-w-[80%]">
                      {proj.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[10px] font-mono text-gray-500">
                          #{tech.split(' ')[0]}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono text-[#00F0FF] group-hover:text-[#00F0FF] transition-colors duration-300">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">ESTUDAR</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
