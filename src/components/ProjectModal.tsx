import { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, User, Briefcase, Award, CheckCircle2, Terminal, ArrowRight, ExternalLink } from 'lucide-react';
import { Project } from '../data';
import { audioController } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  
  // Disable body scroll when modal is active to prevent background scrolling jitters
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  const handleActionClick = () => {
    audioController.playClick();
  };

  const getColorTheme = (color: string) => {
    switch (color) {
      case 'cyan':
        return {
          glow: 'rgba(0, 240, 255, 0.2)',
          text: 'text-[#00F0FF]',
          border: 'border-[#00F0FF]/20',
          bullet: 'bg-[#00F0FF]',
          gradient: 'from-[#00F0FF]/10 to-transparent'
        };
      case 'gold':
        return {
          glow: 'rgba(234, 179, 8, 0.15)',
          text: 'text-amber-400',
          border: 'border-amber-500/20',
          bullet: 'bg-amber-400',
          gradient: 'from-amber-500/10 to-transparent'
        };
      case 'purple':
        return {
          glow: 'rgba(168, 85, 247, 0.2)',
          text: 'text-purple-400',
          border: 'border-purple-500/20',
          bullet: 'bg-purple-400',
          gradient: 'from-purple-500/10 to-transparent'
        };
      case 'emerald':
        return {
          glow: 'rgba(16, 185, 129, 0.15)',
          text: 'text-emerald-400',
          border: 'border-emerald-500/20',
          bullet: 'bg-emerald-400',
          gradient: 'from-emerald-500/10 to-transparent'
        };
      default:
        return {
          glow: 'rgba(255, 255, 255, 0.1)',
          text: 'text-white',
          border: 'border-white/10',
          bullet: 'bg-white',
          gradient: 'from-white/10 to-transparent'
        };
    }
  };

  const theme = getColorTheme(project.customColor);

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-0 md:p-6 overflow-hidden">
      {/* Absolute Blurred Dark Backdrop Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          audioController.playClick();
          onClose();
        }}
        className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-none"
      />

      {/* Main Container Layer of Modal Case */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ type: 'spring', damping: 26, stiffness: 170 }}
        className="relative w-full h-full md:h-[90vh] md:max-w-6xl bg-[#08080c] md:rounded-none border border-white/5 flex flex-col justify-between overflow-hidden z-20 shadow-2xl"
      >
        {/* Upper Floating Header Panel with Close Action */}
        <div className="flex justify-between items-center px-6 md:px-10 py-5 border-b border-white/5 bg-[#0a0a10]/95 backdrop-blur-md z-30 select-none">
          <div className="flex items-center space-x-3">
            <span className={`w-2 h-2 rounded-full ${theme.bullet} animate-pulse`} />
            <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
              CASE STUDY // PROJETO: {project.id.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-none border border-white/10 hover:border-white/30 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-none bg-white/5"
            data-cursor="hover"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Core Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-12">
          
          {/* Main Huge Editorial Cover Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start select-none">
            
            {/* Title & Description Column */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <span className={`text-xs font-mono tracking-widest uppercase ${theme.text}`}>
                {project.category}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight leading-none font-light">
                {project.title}
              </h2>
              <p className="text-gray-400 font-sans text-sm md:text-base tracking-wide leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {/* Quick Metadata Block */}
            <div className="lg:col-span-4 glass-panel p-6 rounded-none space-y-4 border-white/5 z-20 text-left">
              <h4 className="font-mono text-[9px] tracking-widest text-[#00F0FF] uppercase pb-2 border-b border-white/5">// METADADOS DE ENGENHARIA</h4>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase tracking-wide">CLIENTE</span>
                  <span className="text-gray-300 font-light mt-1 block">{project.client}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase tracking-wide">LANÇAMENTO</span>
                  <span className="text-gray-300 font-light mt-1 block">{project.year}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase tracking-wide">FUNÇÃO</span>
                  <span className="text-gray-300 font-light mt-1 block">{project.role}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase tracking-wide">PERFORMANCE</span>
                  <span className="text-emerald-400 font-medium mt-1 block flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    60 FPS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Case Study Narrative Storytelling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/5 text-left">
            
            {/* Detailed narrative (LongStory) */}
            <div className="lg:col-span-7 space-y-6 font-sans font-light tracking-wide text-gray-300 leading-relaxed text-sm md:text-base">
              <h3 className="text-xl font-serif text-white tracking-tight font-light flex items-center space-x-2">
                <Terminal className={`w-4 h-4 ${theme.text}`} />
                <span>Instalação, Conceito &amp; Desafios</span>
              </h3>
              <p>{project.longStory}</p>
              <p>
                A arquitetura focou primordialmente em renderizações de latência ultrabaixa. Ao centralizar as coordenadas de física matemática em pilhas vetorizadas dentro de estruturas locales, eliminamos o jitter de frames em dispositivos menores, atingindo tempos de resposta estáveis na ordem de milissegundos.
              </p>

              {/* Technologies pillow tags */}
              <div className="pt-4">
                <span className="font-mono text-[10px] text-gray-500 block uppercase tracking-widest mb-3">// PILHA DE FERRAMENTAS UTILIZADAS:</span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-[#0a0a10] border border-white/5 hover:border-[#00F0FF]/30 text-gray-400 hover:text-white font-mono text-[10px] rounded-none transition-colors duration-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics column */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] flex items-center space-x-2">// MÉTRICAS EXPONENCIAIS</h3>
              <div className="space-y-4 pt-2">
                {project.metrics.map((met, mIdx) => (
                  <div key={mIdx} className="glass-panel p-5 rounded-none border-white/5 bg-white/[0.01] flex justify-between items-center group relative overflow-hidden transition-all duration-300 hover:border-[#00F0FF]/25">
                    <div className="z-10 text-left">
                      <span className="text-[10px] font-mono tracking-widest text-gray-500 block uppercase">{met.label}</span>
                      <span className="text-3xl font-serif text-white mt-1.5 block font-semibold">{met.value}</span>
                    </div>

                    {/* Miniature glowing decorative waveform graphics */}
                    <div className="w-16 h-10 flex items-end justify-between space-x-1 opacity-20 group-hover:opacity-60 transition-opacity duration-300">
                      {[0.3, 0.6, 0.4, 0.9, 0.5].map((sh, sIdx) => (
                        <div
                          key={sIdx}
                          className="w-1 rounded-none bg-[#00F0FF]"
                          style={{ height: `${sh * 36}px` }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Visual Slides Horizontal Gallery mockups */}
          <div className="pt-8 border-t border-white/5 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00F0FF] flex items-center space-x-2 text-left">// GALERIA DE SINAL INTERATIVO</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.galleryThemes.map((desc, idx) => (
                <div
                  key={idx}
                  className="glass-panel-heavy p-6 rounded-none border-white/5 h-64 flex flex-col justify-between text-left relative overflow-hidden group hover:border-[#00F0FF]/25 transition-all duration-500 hover:shadow-xl"
                >
                  {/* Neon laser decorative overlays */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00F0FF]/35 via-transparent to-transparent" />
                  
                  {/* Decorative abstract technical background design */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-30" />
                  
                  <div className="flex justify-between items-center z-10 font-mono text-[9px] text-gray-500">
                    <span>SEÇÃO {idx + 1}</span>
                    <span className="text-[#00F0FF]">CHANNEL_ACTIVE</span>
                  </div>

                  {/* Elegant micro coordinate diagrams */}
                  <div className="h-20 flex items-center justify-center relative">
                    <div className="w-16 h-16 rounded-none border border-dashed border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <div className="w-10 h-10 rounded-none border border-[#00F0FF]/20 flex items-center justify-center group-hover:border-[#00F0FF]/50">
                        <div className="w-4 h-4 rounded-none bg-[#00F0FF]/20 animate-ping" />
                      </div>
                    </div>
                  </div>

                  <div className="z-10">
                    <span className="font-mono text-[8px] text-[#00F0FF] tracking-widest block uppercase mb-1 flex items-center">
                      <Terminal className="w-2.5 h-2.5 mr-1" />
                      PLOT MODEL_THEME
                    </span>
                    <p className="text-gray-400 font-sans text-xs font-light leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lower Metadata Rail Footer */}
        <div className="flex flex-wrap justify-between items-center px-6 md:px-10 py-4 border-t border-white/5 bg-[#0a0a10] text-[9px] font-mono tracking-widest text-gray-500 select-none gap-4">
          <div>LICENSE: APACHE-2.0 / ESTÚDIO ALAN</div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => {
                handleActionClick();
                onClose();
              }}
              className="text-[#00F0FF] hover:text-[#00F0FF]/80 font-medium cursor-none flex items-center"
              data-cursor="hover"
            >
              <span>RETORNAR AO PORTFÓLIO</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
