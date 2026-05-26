import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Copy, Check, Github, Linkedin, Compass, ExternalLink } from 'lucide-react';
import { audioController } from '../utils/audio';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const contactEmail = 'alan@aetherlab.digital';

  const handleCopyEmail = () => {
    audioController.playClick();
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleHoverEvent = () => {
    audioController.playHoverChime();
  };

  const socialLinks = [
    { name: 'GITHUB', url: 'https://github.com', icon: Github, label: 'VER CÓDIGOS' },
    { name: 'LINKEDIN', url: 'https://linkedin.com', icon: Linkedin, label: 'CONECTAR' },
    { name: 'AWWWARDS', url: 'https://awwwards.com', icon: Compass, label: 'VISITAR ESTÚDIO' }
  ];

  return (
    <section className="relative px-6 md:px-12 lg:px-24 py-24 z-10 w-full max-w-7xl mx-auto border-t border-white/5 select-none text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Editorial column */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-mono text-xs text-[#00F0FF] tracking-widest uppercase flex items-center space-x-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <span>04 / VAMOS CO-CRIAR REALIDADE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-none font-light"
          >
            Inicie um Sinal
          </motion.h2>
          <p className="text-gray-400 font-sans tracking-wide leading-relaxed font-light text-sm md:text-base max-w-md">
            Seja para criar uma flagship store em 3D, aperfeiçoar de ponta a ponta o desempenho WebGL de seu produto ou estruturar a identidade visual de sua marca premium. O canal está aberto.
          </p>
        </div>

        {/* Right Action copy-button and newsletter */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-center items-start lg:items-end w-full">
          
          {/* Main Huge E-mail copy card */}
          <div
            onClick={handleCopyEmail}
            onMouseEnter={handleHoverEvent}
            className="w-full max-w-md p-6 glass-panel rounded-none border-white/10 hover:border-[#00F0FF]/30 bg-white/[0.01] flex items-center justify-between cursor-none relative overflow-hidden group transition-all duration-300 shadow-2xl"
            data-cursor="magnetic"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#00F0FF] to-transparent scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500" />
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-none border border-white/5 flex items-center justify-center bg-black/40 group-hover:border-[#00F0FF]/25 transition-colors duration-300">
                <Mail className="w-5 h-5 text-[#00F0FF]" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono tracking-widest text-gray-500 block uppercase font-light">CLIQUE PARA COPIAR ENDEREÇO</span>
                <span className="text-sm md:text-base font-mono text-white mt-1 block font-medium group-hover:text-[#00F0FF] transition-colors duration-300">{contactEmail}</span>
              </div>
            </div>

            <div className="w-8 h-8 rounded-none flex items-center justify-center border border-white/10 group-hover:border-white/30 text-gray-400 group-hover:text-white transition-colors">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Copy className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bubble Copy success indicator overlay */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="absolute right-4 top-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-none shadow-xl pointer-events-none"
                >
                  <span className="font-mono text-[8px] text-emerald-400 font-medium tracking-widest">COPIADO!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Navigation Links block */}
          <div className="w-full max-w-md flex justify-between items-center pt-6 border-t border-white/5 mt-4 text-left">
            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">// CANAIS SOCIAIS</span>
            
            <div className="flex space-x-6">
              {socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={handleHoverEvent}
                  className="font-mono text-[10px] tracking-widest text-gray-400 hover:text-[#00F0FF] transition-colors uppercase cursor-none flex items-center space-x-1"
                  data-cursor="hover"
                >
                  <span>{soc.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-40 hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Structural copyright rail footer */}
      <footer className="mt-24 pt-10 border-t border-white/5 flex flex-wrap justify-between items-center text-[10px] font-mono tracking-widest text-gray-600 select-none gap-6 text-center w-full">
        <div>ÆTHER / INTEGRANTE DE PROTÓTIPO DE DESIGN AAA</div>
        <div>ALAN SILVEIRA — © 2026. ALQUIMIA NO NAVEGADOR WEB.</div>
        <div>LICENSE: SEAMLESS DIGITAL INSTALLATION</div>
      </footer>
    </section>
  );
}
