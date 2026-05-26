import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Terminal, Briefcase, Award } from 'lucide-react';
import { EXPERIENCES, SKILL_GROUPS } from '../data';
import { audioController } from '../utils/audio';

export default function About() {
  const [activeSkillGroup, setActiveSkillGroup] = useState<number>(0);
  const [hoveredOrbit, setHoveredOrbit] = useState<string | null>(null);

  const stats = [
    { value: '+6', label: 'ANOS CRIANDO' },
    { value: '40+', label: 'INTERACTIVIDADES' },
    { value: '18', label: 'INDICAÇÕES AWARDS' },
    { value: '0.2s', label: 'LATÊNCIA ALVO' }
  ];

  const handleHoverEvent = () => {
    audioController.playHoverChime();
  };

  const handleGroupClick = (idx: number) => {
    audioController.playClick();
    setActiveSkillGroup(idx);
  };

  // Orbital items representing the core dev stack
  const orbitalNodes = [
    { id: 'webgl', label: 'WebGL/GLSL Shaders', angle: 0, distance: 95, color: '#00F0FF' },
    { id: 'framer', label: 'Framer Motion Spring', angle: 72, distance: 95, color: '#F5F5F7' },
    { id: 'audio', label: 'Web Audio Synthesizer', angle: 144, distance: 135, color: '#00F0FF' },
    { id: 'ux', label: 'Asymmetric Editorial UX', angle: 216, distance: 135, color: '#F5F5F7' },
    { id: 'react', label: 'React 19 Rendering', angle: 288, distance: 95, color: '#00F0FF' }
  ];

  return (
    <section className="relative px-6 md:px-12 lg:px-24 py-24 z-10 w-full max-w-7xl mx-auto border-t border-white/5 select-none">
      
      {/* Editorial Title Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-mono text-xs text-[#00F0FF] tracking-widest uppercase flex items-center space-x-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <span>01 / O CORE DA ALQUIMIA</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-serif text-white tracking-tight mt-3"
          >
            Estética &amp; Código
          </motion.h2>
        </div>
        <div className="md:col-span-8 flex items-end">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-gray-400 font-sans font-light tracking-wide max-w-2xl text-left"
          >
            Acreditamos que softwares não devem ser apenas úteis, mas profundamente contemplativos. Cada transição é calibrada com físicas de molas realistas, texturas cromáticas e micro-audios para redefinir as possibilidades do navegador web.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Interactive Orbit System */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[380px] py-6">
          <div className="absolute inset-0 bg-cyan-500/5 rounded-full filter blur-3xl opacity-40 pointer-events-none" />
          
          {/* Central Core Globe (The Brand Mark) */}
          <div className="relative w-72 h-72 rounded-full border border-white/5 flex items-center justify-center">
            
            {/* Soft pulsing glassmorphic back drops */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute w-60 h-60 rounded-full border border-dashed border-white/5 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute w-44 h-44 rounded-full border border-dashed border-cyan-400/10 pointer-events-none"
            />

            {/* Central orb with glowing glassmorphic core */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-full glass-panel flex flex-col items-center justify-center z-20 text-center p-3 relative group overflow-hidden border-cyan-400/25 cursor-none"
              onMouseEnter={handleHoverEvent}
              data-cursor="magnetic"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/5 to-purple-400/5 group-hover:opacity-100 transition-opacity duration-300" />
              <Terminal className="w-6 h-6 text-cyan-400 mb-1.5 animate-pulse" />
              <span className="font-mono text-[9px] tracking-widest text-[#f3f4f6]">Æ-CORE</span>
              <span className="font-sans text-[10px] text-gray-400 mt-1">COGNITIVE</span>
            </motion.div>

            {/* Interactive Orbit Nodes */}
            {orbitalNodes.map((node) => {
              // Convert angles to polar coordinate offsets
              const radius = node.distance;
              const rad = (node.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              const isFocused = hoveredOrbit === node.id;

              return (
                <motion.div
                  key={node.id}
                  className="absolute z-30 cursor-none flex flex-col items-center justify-center"
                  style={{
                    left: `calc(50% + ${x}px - 14px)`,
                    top: `calc(50% + ${y}px - 14px)`,
                  }}
                  onMouseEnter={() => {
                    handleHoverEvent();
                    setHoveredOrbit(node.id);
                  }}
                  onMouseLeave={() => setHoveredOrbit(null)}
                  whileHover={{ scale: 1.25 }}
                  data-cursor="hover"
                >
                  {/* Glowing Atom Dot */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 relative group"
                    style={{
                      borderColor: isFocused ? node.color : 'rgba(255,255,255, 0.1)',
                      backgroundColor: isFocused ? `${node.color}15` : 'rgba(10,10,15, 0.8)'
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full transition-transform duration-300"
                      style={{
                        backgroundColor: node.color,
                        boxShadow: isFocused ? `0 0 12px ${node.color}` : 'none'
                      }}
                    />
                  </div>

                  {/* Tooltip detail popping outward dynamically */}
                  <AnimatePresence>
                    {isFocused && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: -4, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-950/95 border border-white/10 px-3 py-1.5 rounded-sm shadow-xl z-50 pointer-events-none"
                      >
                        <span className="font-mono text-[9px] tracking-wider text-white uppercase flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: node.color }} />
                          <span>{node.label}</span>
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <p className="text-gray-500 font-mono text-[10px] text-center mt-12 uppercase tracking-widest max-w-xs leading-relaxed animate-pulse">
            // PARE O PONTEIRO SOBRE A CONSTELAÇÃO PARA REVELAR ATRIBUTOS
          </p>
        </div>

        {/* Right Column: Bio Narrative & Stats */}
        <div className="lg:col-span-7 flex flex-col justify-start space-y-12">
          
          {/* Beautiful Narrative Biography */}
          <div className="space-y-6 text-gray-300 font-sans font-light tracking-wide text-left leading-relaxed">
            <p>
              Me chamo <strong className="text-white font-medium">Alan Silveira</strong>, tecnólogo sênior que opera na intersecção entre o design estético de vanguarda e arquiteturas web de altíssimo desempenho. Minhas obras reinterpretam layouts digitais lineares para criar cenários multidimensionais.
            </p>
            <p>
              Ao longo dos últimos anos, venho projetando interfaces WebGL fluidas e sistemas sensoriais para marcas premium de design, fintech, e startups inovadoras. Recuso padrões estáticos; cada pixel deve se mover sob regras dinâmicas de aceleração, peso e fricção.
            </p>
          </div>

          {/* Quick Stat Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * i }}
                className="glass-panel p-4 rounded-none border-white/5 flex flex-col justify-center items-start text-left relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00F0FF] to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="text-2xl font-serif text-white font-semibold leading-none">{st.value}</span>
                <span className="text-[9px] font-mono tracking-widest text-[#00F0FF] mt-2 block">{st.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Skill group visual breakdown tabs */}
          <div className="border border-white/5 rounded-none p-6 bg-white/[0.01]">
            <div className="flex flex-wrap border-b border-white/5 pb-4 mb-6 gap-2">
              {SKILL_GROUPS.map((grp, idx) => (
                <button
                  key={grp.category}
                  onClick={() => handleGroupClick(idx)}
                  className={`px-4 py-2 text-[10px] font-mono tracking-widest uppercase transition-all rounded-none cursor-none ${
                    activeSkillGroup === idx
                      ? 'bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30'
                      : 'bg-transparent text-gray-400 hover:text-gray-200'
                  }`}
                  data-cursor="hover"
                >
                  {grp.category}
                </button>
              ))}
            </div>

            {/* Dynamic expanding bars details */}
            <div className="space-y-5">
              {SKILL_GROUPS[activeSkillGroup].skills.map((skill, sIdx) => (
                <div key={skill.name} className="space-y-2 text-left">
                  <div className="flex justify-between text-xs font-mono text-gray-400">
                    <span className="tracking-wide uppercase text-white font-light">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-none overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="absolute top-0 bottom-0 left-0 rounded-none bg-gradient-to-r from-[#00F0FF] to-cyan-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Experience history tree - Bottom Part of About */}
      <div className="mt-24 pt-16 border-t border-white/5">
        <div className="flex items-center space-x-3 mb-12">
          <Terminal className="w-4 h-4 text-[#00F0FF]" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#00F0FF]">// CRONOLOGIA PROFISSIONAL</h3>
        </div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, expIdx) => (
            <motion.div
              key={expIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.1 * expIdx }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 relative group border-b border-white/5 pb-8"
            >
              {/* Year column */}
              <div className="md:col-span-3 text-left">
                <span className="font-mono text-xs text-[#00F0FF] block mb-1">{exp.period}</span>
                <span className="font-sans text-xs text-gray-500 uppercase tracking-widest flex items-center">
                  <Briefcase className="w-3 h-3 mr-1 text-gray-650" />
                  {exp.company}
                </span>
              </div>

              {/* Title and role column */}
              <div className="md:col-span-9 text-left">
                <h4 className="text-xl font-serif text-white tracking-tight font-light group-hover:text-[#00F0FF] transition-colors duration-300">
                  {exp.role}
                </h4>
                <p className="text-gray-400 font-sans font-light tracking-wide text-sm mt-2 leading-relaxed max-w-3xl">
                  {exp.description}
                </p>

                {/* Sub tags pillows */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono tracking-wider uppercase text-gray-400 border border-white/5 bg-white/[0.01] px-2.5 py-1 rounded-none group-hover:border-[#00F0FF]/20 group-hover:text-[#00F0FF] transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
