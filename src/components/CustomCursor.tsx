import { useEffect, useState } from 'react';

export type CursorType = 'none' | 'hover' | 'view' | 'magnetic' | 'play' | 'audio';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<CursorType>('none');
  const [hoverText, setHoverText] = useState('');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementWithCursor = target.closest('[data-cursor]');
      
      if (elementWithCursor) {
        const type = elementWithCursor.getAttribute('data-cursor') as CursorType;
        setCursorType(type || 'hover');
        
        const text = elementWithCursor.getAttribute('data-cursor-text');
        setHoverText(text || '');
      } else {
        setCursorType('none');
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Inertia Lerp for trailing ring
  useEffect(() => {
    if (!isVisible) return;
    
    let active = true;
    const lerpSpeed = 0.12;

    const render = () => {
      if (!active) return;
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * lerpSpeed,
          y: prev.y + dy * lerpSpeed,
        };
      });
      requestAnimationFrame(render);
    };

    render();
    return () => {
      active = false;
    };
  }, [position, isVisible]);

  if (!isVisible) return null;

  // Compute cursor size based on state
  let ringSizeClasses = 'w-8 h-8';
  let ringBorderClasses = 'border border-[#00F0FF]/50 bg-[#00F0FF]/0';
  let showInnerDot = true;

  if (isClicking) {
    ringSizeClasses = 'w-6 h-6';
    ringBorderClasses = 'border border-[#00F0FF] bg-[#00F0FF]/15';
  } else if (cursorType === 'hover') {
    ringSizeClasses = 'w-14 h-14';
    ringBorderClasses = 'border border-[#00F0FF]/70 bg-[#00F0FF]/5';
  } else if (cursorType === 'magnetic') {
    ringSizeClasses = 'w-16 h-16';
    ringBorderClasses = 'border border-[#00F0FF]/80 bg-[#00F0FF]/10';
  } else if (cursorType === 'view') {
    ringSizeClasses = 'w-20 h-20';
    ringBorderClasses = 'border border-[#00F0FF] bg-[#00F0FF]/25 backdrop-blur-sm';
    showInnerDot = false;
  } else if (cursorType === 'audio' || cursorType === 'play') {
    ringSizeClasses = 'w-16 h-16';
    ringBorderClasses = 'border border-[#00F0FF]/85 bg-[#00F0FF]/15 backdrop-blur-xs';
    showInnerDot = false;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] hidden md:block">
      {/* Target trailing ring */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-none transition-all duration-300 ease-out flex items-center justify-content pointer-events-none ${ringSizeClasses} ${ringBorderClasses}`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      >
        {cursorType === 'view' && (
          <span className="text-[10px] uppercase tracking-widest text-[#00F0FF] font-mono font-medium mx-auto">
            {hoverText || 'VIEW'}
          </span>
        )}
        {(cursorType === 'audio' || cursorType === 'play') && (
          <span className="text-[10px] uppercase tracking-widest text-[#00F0FF] font-mono font-medium mx-auto">
            {hoverText || 'LISTEN'}
          </span>
        )}
      </div>

      {/* Target central needle */}
      {showInnerDot && (
        <div
          className={`fixed -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-none pointer-events-none transition-colors duration-200 ${
            isClicking ? 'bg-white' : 'bg-[#00F0FF]'
          }`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        />
      )}
    </div>
  );
}
