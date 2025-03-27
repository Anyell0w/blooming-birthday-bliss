
import React, { useEffect, useRef } from 'react';
import { HeartIcon } from 'lucide-react';

interface BirthdayMessageProps {
  visible: boolean;
}

const BirthdayMessage: React.FC<BirthdayMessageProps> = ({ visible }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!visible || !containerRef.current) return;
    
    // Create confetti effect when message becomes visible
    const colors = ['#F8B4B4', '#FEF7CD', '#E27D7D', '#FFD700', '#F1F0FB'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        if (!containerRef.current) return;
        
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation completes
        setTimeout(() => {
          document.body.removeChild(confetti);
        }, 5000);
      }, i * 50); // Stagger the confetti
    }
  }, [visible]);

  if (!visible) return null;
  
  return (
    <div ref={containerRef} className="w-full">
      <div className="glass-card p-8 max-w-2xl mx-auto text-center animate-scale-up">
        <div className="mb-4 flex justify-center">
          <HeartIcon className="w-10 h-10 text-romantic animate-pulse-soft" />
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-dancing romantic-gradient text-transparent bg-clip-text mb-4 animate-wave inline-block">
          ¡Feliz Cumpleaños<br/>Mi Reina!
        </h1>
        
        <p className="text-lg text-neutral-dark mt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Te amo con todo mi corazón. Eres lo más hermoso que me ha pasado en la vida.
        </p>
        
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <p className="text-sm text-neutral italic">
            Desliza hacia abajo para ver tus cupones especiales...
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayMessage;
