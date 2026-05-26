import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Settings, Terminal, ShieldCheck, Cpu, Database, Compass, Activity } from 'lucide-react';
import { audioController } from '../utils/audio';
import { ParticleMode } from './ParticleCanvas';

interface QuantumSandboxProps {
  currentMode: ParticleMode;
  onModeChange: (mode: ParticleMode) => void;
  particleColor: string;
  onColorChange: (color: string) => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
}

export default function QuantumSandbox({
  currentMode,
  onModeChange,
  isAudioEnabled,
  onToggleAudio,
}: QuantumSandboxProps) {
  
  const [activeTab, setActiveTab] = useState<'physics' | 'telemetries'>('physics');

  const modesList = [
    { id: 'ambient', title: 'Drift Celestial', desc: 'Espalhamento randômico de poeira cósmica com repulsão magnética suave.' },
    { id: 'gravity', title: 'Buraco Negro (Well)', desc: 'Espiral gravitacional progressiva. As órbitas colapsam em direção ao ponteiro.' },
    { id: 'lattice', title: 'Rede Cristalina', desc: 'Estrutura atômica interconectada. Deforma e estica como uma malha elástica.' }
  ];

  const handlePhysicsModeSelect = (modeId: any) => {
    audioController.playClick();
    onModeChange(modeId);
  };

  const handleSoundClick = () => {
    audioController.playClick();
  };

  return (
    <section className="relative px-6 md:px-12 lg:px-24 py-24 z-10 w-full max-w-7xl mx-auto border-t border-white/5 select-none">
      
      {/* Title block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-5 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-mono text-xs text-[#00F0FF] tracking-widest uppercase flex items-center space-x-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <span>03 / LABORATÓRIO MATEMÁTICO</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-serif text-white tracking-tight mt-3"
          >
            Terminal Quântico
          </motion.h2>
        </div>
        <div className="md:col-span-7 flex items-end">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-gray-400 font-sans font-light tracking-wide max-w-2xl text-left"
          >
            Controle a física que governa este portfólio. Mude equações do fundo estelar, lance partículas magnéticas com as pontas dos dedos e ouça a pulsação gravitacional do acelerador drone de silêncio.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Interactive Playground Frame */}
        <div className="lg:col-span-7 flex flex-col justify-between glass-panel rounded-none border-white/10 overflow-hidden relative group h-[450px]">
          
          {/* Scientific Mock Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/5 bg-black/40 z-20">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-none bg-[#00F0FF]/30 border border-[#00F0FF]" />
              <span className="font-mono text-[9px] text-gray-400 tracking-widest uppercase">LABORATORY REACTOR SCREEN [PORTFOLIO BACKEND]</span>
            </div>
            <div className="flex space-x-3 text-gray-500 font-mono text-[8px] tracking-wider">
              <span className="text-[#00F0FF]">ACTIVE: OK</span>
              <span>CALIBRATION: 99.82%</span>
            </div>
          </div>

          {/* Interactive Blast Container zone */}
          <div className="flex-1 flex flex-col justify-center items-center relative p-8 cursor-none">
            {/* Visual guidelines */}
            <div className="absolute inset-0 bg-[#0a0a10]/40 pointer-events-none" />
            <div className="absolute w-12 h-12 border border-white/5 flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-none pointer-events-none">
              <div className="w-6 h-6 border border-dashed border-[#00F0FF]/30 rounded-none animate-spin" />
            </div>

            {/* Scope crosshair overlay */}
            <div className="absolute h-[1px] left-8 right-8 border-t border-dashed border-white/[0.03] top-1/2 pointer-events-none" />
            <div className="absolute w-[1px] top-8 bottom-8 border-l border-dashed border-white/[0.03] left-1/2 pointer-events-none" />

            <div className="z-10 text-center max-w-sm space-y-4">
              <p className="font-serif text-lg text-white font-light tracking-wide leading-relaxed">
                Interaja diretamente com a tela.
              </p>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                Clique em qualquer ponto do site para propagar ondas de choque mecânicas de ressonância.
              </p>
            </div>
          </div>

          {/* Scientific Mock Footer info */}
          <div className="flex justify-between items-center px-4 py-3 border-t border-white/5 bg-black/40 text-[9px] font-mono text-gray-500 z-20">
            <span className="flex items-center"><Compass className="w-3.5 h-3.5 text-[#00F0FF] mr-1.5 animate-spin" /> PONTOS EXTREMOS ATIVOS</span>
            <span>MODEL: R3F_DAMP_SPRING</span>
          </div>
        </div>

        {/* Right Dashboard Settings Area */}
        <div className="lg:col-span-5 flex flex-col justify-between glass-panel rounded-none border-white/10 p-6 md:p-8 space-y-8 text-left">
          
          <div className="space-y-6">
            
            {/* Control panel tabs header */}
            <div className="flex border-b border-white/5 pb-4 gap-4">
              <button
                onClick={() => { handleSoundClick(); setActiveTab('physics'); }}
                className={`text-[10px] font-mono tracking-widest uppercase pb-1 cursor-none flex items-center space-x-1.5 ${
                  activeTab === 'physics' ? 'text-[#00F0FF] border-b border-[#00F0FF] font-medium' : 'text-gray-500 hover:text-gray-300'
                }`}
                data-cursor="hover"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>FISICA DO MEU MEIO</span>
              </button>
              <button
                onClick={() => { handleSoundClick(); setActiveTab('telemetries'); }}
                className={`text-[10px] font-mono tracking-widest uppercase pb-1 cursor-none flex items-center space-x-1.5 ${
                  activeTab === 'telemetries' ? 'text-[#00F0FF] border-b border-[#00F0FF] font-medium' : 'text-gray-500 hover:text-gray-300'
                }`}
                data-cursor="hover"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>TELEMETRIAS DE FLUXO</span>
              </button>
            </div>

            {/* TAB 1: Physics models selection */}
            {activeTab === 'physics' && (
              <div className="space-y-4">
                {modesList.map((m) => {
                  const isActive = currentMode === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handlePhysicsModeSelect(m.id as any)}
                      className={`w-full p-4 rounded-none border text-left transition-all cursor-none flex gap-4 ${
                        isActive
                          ? 'bg-[#00F0FF]/5 text-white border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.08)]'
                          : 'bg-transparent text-gray-400 border-white/5 hover:border-white/15'
                      }`}
                      data-cursor="hover"
                    >
                      <div className={`w-5 h-5 rounded-none border flex items-center justify-center mt-1 shrink-0 ${
                        isActive ? 'border-[#00F0FF] bg-[#00F0FF]/10' : 'border-gray-600'
                      }`}>
                        {isActive && <div className="w-2.5 h-2.5 bg-[#00F0FF] rounded-none animate-pulse" />}
                      </div>
                      <div className="space-y-1">
                        <span className={`text-sm font-sans font-medium uppercase tracking-wide block ${isActive ? 'text-[#00F0FF]' : 'text-white'}`}>
                          {m.title}
                        </span>
                        <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TAB 2: Engineering technical telemetries */}
            {activeTab === 'telemetries' && (
              <div className="space-y-4 font-mono text-xs select-none">
                <div className="glass-panel p-4 rounded-none border-white/5 space-y-3 bg-black/20 text-[11px]">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase tracking-wider">TAXA RENDERING ATUAL</span>
                    <span className="text-[#00F0FF]">60 FPS // ESTÁVEL</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase tracking-wider">MEMÓRIA ALOCADA R3F</span>
                    <span className="text-gray-300">14.32 MB</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase tracking-wider">TAMANHO CONTEINER CANVAS</span>
                    <span className="text-gray-300">{window.innerWidth} x {window.innerHeight} PX</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500 uppercase tracking-wider">FILTRO DE ABERRAÇÃO</span>
                    <span className="text-[#00F0FF]">ATIVADO (PROPORCIONAL)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 uppercase tracking-wider">THREAD GRAVITACIONAL</span>
                    <span className="text-[#00F0FF]">Z-BUFFER LERPed</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 text-gray-500 leading-normal bg-white/[0.01] border border-white/5 p-3 rounded-none text-[10px]">
                  <Terminal className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                  <p>
                    Aviso: A manipulação de campos gravitacionais pesados altera a renderização de sublayouts em toda a viewport atual para assegurar alinhamento do mouse.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Sound drone controls button inside dashboard cockpit */}
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-light">Efeito Sônico Atmosférico:</span>
              <span className="text-xs text-white tracking-wide mt-1 block">Z-OSCILLATOR ACOUSTIC (55Hz)</span>
            </div>

            <button
              onClick={() => {
                onToggleAudio();
                audioController.playClick();
              }}
              className={`px-4 py-2 border rounded-none text-[10px] font-mono tracking-widest uppercase transition-all cursor-none ${
                isAudioEnabled
                  ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/30'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
              }`}
              data-cursor="audio"
              data-cursor-text={isAudioEnabled ? "SILENCE" : "START SOUND"}
            >
              {isAudioEnabled ? 'ACOUSTIC: LIVE REACTOR' : 'ACOUSTIC: STANDBY'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
