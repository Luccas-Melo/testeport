import { motion } from 'motion/react';
import { MousePointer, ArrowDown, Volume2, VolumeX } from 'lucide-react';
import { audioController } from '../utils/audio';

interface HeroProps {
  onScrollToProjects: () => void;
  onScrollToSandbox: () => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
}

export default function Hero({
  onScrollToProjects,
  onScrollToSandbox,
  isAudioEnabled,
  onToggleAudio,
}: HeroProps) {
  // Play subtle mechanical micro-click on interactions
  const handleInteraction = (type: 'click' | 'hover') => {
    if (type === 'click') {
      audioController.playClick();
    } else {
      audioController.playHoverChime();
    }
  };

  const titleWords = "Where ideas become living interfaces.".split(" ");

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between px-6 md:px-12 lg:px-24 py-12 z-10 overflow-hidden select-none w-full max-w-7xl mx-auto">
      {/* Top Navigation */}
      <nav className="relative z-20 flex justify-between items-center w-full py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#00F0FF] flex items-center justify-center transform rotate-45">
            <div className="w-1.5 h-1.5 bg-[#00F0FF] transform -rotate-45"></div>
          </div>
          <span className="text-[11px] font-bold tracking-[0.4em] uppercase opacity-95 text-[#F5F5F7]">ÆTHER / 2026</span>
        </div>

        {/* Ambient menu & sound indicator section */}
        <div className="flex items-center gap-6 md:gap-11 text-[10px] font-semibold tracking-[0.2em] uppercase">
          {/* Cinematic sound controller toggle button in upper rail */}
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onToggleAudio();
              audioController.playClick();
            }}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-none border text-[10px] font-mono tracking-widest uppercase transition-all cursor-none ${
              isAudioEnabled
                ? 'bg-cyan-500/10 text-[#00F0FF] border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.2)] animate-pulse'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/20'
            }`}
            data-cursor="audio"
            data-cursor-text={isAudioEnabled ? "SILENCE" : "DRONE ON"}
          >
            {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5 mr-1" /> : <VolumeX className="w-3.5 h-3.5 mr-1" />}
            {isAudioEnabled ? 'AUDIO: ATIVO' : 'AUDIO: DESATIVADO'}
          </motion.button>

          <div className="hidden md:flex gap-4 items-center">
            <div className="w-10 h-[1px] bg-white/20 my-auto"></div>
            <span className="text-[10px] opacity-40 uppercase tracking-widest">Menu</span>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center text-center my-12 relative z-10 max-w-4xl mx-auto">
        <div className="space-y-4 mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[11px] uppercase tracking-[0.8em] text-[#00F0FF] font-medium opacity-90 block"
          >
            EXPERIÊNCIAS DIGITAIS IMERSIVAS
          </motion.span>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif italic leading-none font-extralight tracking-tight text-white select-none">
            Where ideas become<br/>
            <span className="not-italic font-sans font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 block mt-2">
              living interfaces.
            </span>
          </h1>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="max-w-xl text-white/70 text-sm font-light leading-relaxed mb-12 tracking-wide font-sans"
        >
          Senior Front-end Designer specializing in cinematic web experiences that bridge the gap between art and technology. Crafting the modular virtual universes driven by gravity models.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 w-full"
        >
          <button
            onClick={() => {
              handleInteraction('click');
              onScrollToProjects();
            }}
            onMouseEnter={() => handleInteraction('hover')}
            className="px-10 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#00F0FF] hover:text-black hover:scale-105 transition-all transform hover:-translate-y-1 cursor-none rounded-none w-full sm:w-auto"
            data-cursor="magnetic"
          >
            Navegar Obras
          </button>
          
          <button
            onClick={() => {
              handleInteraction('click');
              onScrollToSandbox();
            }}
            onMouseEnter={() => handleInteraction('hover')}
            className="flex items-center gap-4 group cursor-none justify-center"
            data-cursor="hover"
          >
            <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00F0FF] transition-colors bg-white/5">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1"></div>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-opacity">
              DESPERTAR GRAVIDADE
            </span>
          </button>
        </motion.div>
      </div>

      {/* Bottom UI Elements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full py-8 border-t border-white/10 gap-6 md:gap-0 mt-8">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"></div>
            <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-white">Status: Ativo</span>
          </div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Disponível para novos desafios</p>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center cursor-pointer" onClick={() => {
            handleInteraction('click');
            onScrollToProjects();
          }}>
            <span className="text-[10px] text-white/30 mb-2 uppercase tracking-[0.3em] hover:text-white transition-colors">Scroll to Descend</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full border border-white/40"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full border border-white/40"></div>
          </div>
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">LAT: 23.5505° S / LON: 46.6333° W</span>
        </div>
      </div>
    </section>
  );
}
