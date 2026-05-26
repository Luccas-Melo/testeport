import { useEffect, useRef, useState } from 'react';

export type ParticleMode = 'ambient' | 'gravity' | 'lattice';

interface Particle {
  x: number;
  y: number;
  ox: number; // original X for lattice
  oy: number; // original Y for lattice
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  speed: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  phase: number;
}

interface ParticleCanvasProps {
  mode?: ParticleMode;
  onModeChange?: (mode: ParticleMode) => void;
  interactive?: boolean;
}

export default function ParticleCanvas({
  mode = 'ambient',
  interactive = true,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, px: -1000, py: -1000, down: false });
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const currentModeRef = useRef<ParticleMode>(mode);
  const shockwavesRef = useRef<{ x: number; y: number; r: number; maxR: number; alpha: number }[]>([]);

  // Smooth floating nebula glow layers coordinates (Lerped tracking of target)
  const nebulaRef = useRef([
    { cx: 0, cy: 0, tx: 0, ty: 0, r: 250, color: 'rgba(6, 182, 212, 0.08)' }, // Cyan
    { cx: 0, cy: 0, tx: 0, ty: 0, r: 350, color: 'rgba(168, 85, 247, 0.06)' }, // Purple
    { cx: 0, cy: 0, tx: 0, ty: 0, r: 220, color: 'rgba(234, 179, 8, 0.05)' }  // Gold
  ]);

  // Keep ref up to date
  useEffect(() => {
    currentModeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize Nebula starting points
    nebulaRef.current.forEach((neb, i) => {
      neb.cx = Math.random() * width;
      neb.cy = Math.random() * height;
      neb.tx = Math.random() * width;
      neb.ty = Math.random() * height;
    });

    // Populate Background Twinkling Stars
    const populateStars = (w: number, h: number) => {
      const stars: Star[] = [];
      const count = Math.floor((w * h) / 14000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.4 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    };

    // Populate Main Interactive Dust/Quantum Particles Page
    const populateParticles = (w: number, h: number) => {
      const p: Particle[] = [];
      const colors = [
        'rgba(34, 211, 238, 0.7)',  // Cyan Light
        'rgba(168, 85, 247, 0.5)',  // Purple Soft
        'rgba(253, 224, 71, 0.6)',  // Gold Soft
        'rgba(255, 255, 255, 0.4)'  // White Ambient
      ];

      // Generate grid coordinate spacing for lattice mode preview
      const cols = Math.floor(w / 35);
      const rows = Math.floor(h / 35);
      const totalLattice = cols * rows;

      // Ensure we have a decent dense array of particles (e.g. 180 to 250)
      const particleCount = Math.max(160, Math.min(300, Math.floor((w * h) / 7500)));

      for (let i = 0; i < particleCount; i++) {
        // Place particles in beautiful spread distribution
        const rx = Math.random() * w;
        const ry = Math.random() * h;
        
        // For Lattice: assign a node coordinate
        const colIdx = i % cols;
        const rowIdx = Math.floor(i / cols) % rows;
        const ox = (w / cols) * (colIdx + 0.5);
        const oy = (h / rows) * (rowIdx + 0.5);

        p.push({
          x: rx,
          y: ry,
          ox,
          oy,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2 + 0.8,
          alpha: Math.random() * 0.4 + 0.4,
          color: colors[i % colors.length],
          speed: Math.random() * 0.4 + 0.2
        });
      }
      particlesRef.current = p;
    };

    populateStars(width, height);
    populateParticles(width, height);

    // Dynamic resize hook
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      populateStars(width, height);
      populateParticles(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Mouse Tracking Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.down = true;
      // Trigger dynamic mechanical click ripples
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        maxR: 180,
        alpha: 0.8,
      });

      // Boost nearby particle velocity outward
      particlesRef.current.forEach(p => {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.hypot(dx, dy);
        if (dist < 250) {
          const force = (250 - dist) / 250;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 15;
          p.vy += Math.sin(angle) * force * 15;
        }
      });
    };

    const handleMouseUp = () => {
      mouseRef.current.down = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Physics Animation Loop
    const render = () => {
      ctx.fillStyle = '#030305';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Nebula glowing background blobs (Lerp coordinates)
      nebulaRef.current.forEach((neb, idx) => {
        // Slow float target drift
        if (Math.random() < 0.005) {
          neb.tx = Math.random() * width;
          neb.ty = Math.random() * height;
        }

        // Lerp coordinates
        neb.cx += (neb.tx - neb.cx) * 0.002;
        neb.cy += (neb.ty - neb.cy) * 0.002;

        // If mouse is present, gently shift nebula towards it
        if (mouseRef.current.x > 0) {
          neb.cx += (mouseRef.current.x - neb.cx) * 0.004;
          neb.cy += (mouseRef.current.y - neb.cy) * 0.004;
        }

        // Draw radial glowing gradient
        const grad = ctx.createRadialGradient(neb.cx, neb.cy, 5, neb.cx, neb.cy, neb.r);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(neb.cx, neb.cy, neb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Twinkling background Stars (Twinkle using sine phases)
      starsRef.current.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const currentAlpha = 0.2 + (Math.sin(star.phase) + 1) * 0.4;
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Render and update shockwave rings
      shockwavesRef.current = shockwavesRef.current.filter((sw) => {
        sw.r += 4;
        sw.alpha -= 0.015;
        if (sw.alpha <= 0) return false;

        ctx.strokeStyle = `rgba(34, 211, 238, ${sw.alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(234, 179, 8, ${sw.alpha * 0.2})`;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r * 1.2, 0, Math.PI * 2);
        ctx.stroke();

        return true;
      });

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mDown = mouseRef.current.down;
      const actMode = currentModeRef.current;

      // 4. Update & Draw Particles
      particlesRef.current.forEach((p) => {
        // Friction / drag coefficients
        let friction = 0.96;

        if (actMode === 'lattice') {
          // Particles pull toward their lattice anchor coordinates (resting grid)
          const tension = 0.035;
          const springX = (p.ox - p.x) * tension;
          const springY = (p.oy - p.y) * tension;
          p.vx += springX;
          p.vy += springY;
          friction = 0.88; // Higher damping in lattice mode to restrict shaking oscillations

          // Mouse distorts crystal lattice
          if (mx > -500) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.hypot(dx, dy);
            if (dist < 180) {
              const pushForce = ((180 - dist) / 180) * 4.4;
              const angle = Math.atan2(dy, dx);
              // Push atoms slightly away, creating an organic warp glass look
              p.vx += Math.cos(angle) * pushForce;
              p.vy += Math.sin(angle) * pushForce;
            }
          }
        } else if (actMode === 'gravity') {
          // Black Hole Spiral Orbit physics
          if (mx > -500) {
            const dx = mx - p.x;
            const dy = my - p.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 400 && dist > 10) {
              const pullStrength = 0.24;
              // Tangent orbital vector forces
              const angle = Math.atan2(dy, dx);
              // Inwards gravity pull force
              const pullX = Math.cos(angle) * pullStrength;
              const pullY = Math.sin(angle) * pullStrength;

              // Tangent spiral force (90 degrees rotated angle)
              const orbitX = -Math.sin(angle) * 1.3;
              const orbitY = Math.cos(angle) * 1.3;

              p.vx += pullX + orbitX;
              p.vy += pullY + orbitY;
            } else {
              // Drift organically if outside black hole gravity range
              p.vx += (Math.random() - 0.5) * 0.1;
              p.vy += (Math.random() - 0.5) * 0.1;
            }
          } else {
            // Drift organically
            p.vx += (Math.random() - 0.5) * 0.05;
            p.vy += (Math.random() - 0.5) * 0.05;
          }
          friction = 0.97;
        } else {
          // Standard Ambient drifting with soft mouse push
          if (mx > -500) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const dist = Math.hypot(dx, dy);
            if (dist < 120) {
              const pushForce = ((120 - dist) / 120) * 0.6;
              const angle = Math.atan2(dy, dx);
              p.vx += Math.cos(angle) * pushForce;
              p.vy += Math.sin(angle) * pushForce;
            }
          }
          // Slow organic Brownian drift
          p.vx += (Math.random() - 0.5) * p.speed * 0.2;
          p.vy += (Math.random() - 0.5) * p.speed * 0.2;
          friction = 0.98;
        }

        // Apply velocities and drag coefficients
        p.vx *= friction;
        p.vy *= friction;
        p.x += p.vx;
        p.y += p.vy;

        // Bounce/Wrap boundaries limits
        if (actMode !== 'lattice') {
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;
        }

        // Draw quantum particle point with subtle radial aura
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // If mouse is extremely close to particle, draw a subtle glow halo
        if (mx > -500) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 60) {
            ctx.fillStyle = p.color.replace(')', ', 0.15)');
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 5. Connect close particles dynamically with neon crystal webs
      if (actMode === 'lattice') {
        const latticeDistance = 65;
        // Search and draw crystalline connections
        for (let i = 0; i < particlesRef.current.length; i++) {
          const pi = particlesRef.current[i];
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const pj = particlesRef.current[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.hypot(dx, dy);
            if (dist < latticeDistance) {
              const alpha = (1 - dist / latticeDistance) * 0.16;
              ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.stroke();
            }
          }
        }
      } else {
        // Subtle ambient web connectors
        const connectorDistance = 50;
        for (let i = 0; i < particlesRef.current.length; i += 3) { // Step to save performance on ambient
          const pi = particlesRef.current[i];
          for (let j = i + 1; j < particlesRef.current.length; j += 4) {
            const pj = particlesRef.current[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.hypot(dx, dy);
            if (dist < connectorDistance) {
              const alpha = (1 - dist / connectorDistance) * 0.08;
              ctx.strokeStyle = `rgba(255,255,255, ${alpha})`;
              ctx.lineWidth = 0.4;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 select-none overflow-hidden max-w-full">
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-auto"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
