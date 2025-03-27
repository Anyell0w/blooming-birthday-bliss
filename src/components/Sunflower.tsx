
import React, { useEffect, useState } from 'react';

interface SunflowerProps {
  animate: boolean;
}

const Sunflower: React.FC<SunflowerProps> = ({ animate }) => {
  const [stemGrown, setStemGrown] = useState(false);
  const [petalsGrown, setPetalsGrown] = useState(false);
  
  useEffect(() => {
    if (animate) {
      // Start the stem animation
      setTimeout(() => setStemGrown(true), 300);
      
      // Start the petals animation after stem is grown
      setTimeout(() => setPetalsGrown(true), 2300);
    }
  }, [animate]);

  const petalCount = 12;
  const petals = [];
  
  // Generate the petals
  for (let i = 0; i < petalCount; i++) {
    const rotation = (i * (360 / petalCount));
    petals.push(
      <div 
        key={i}
        className={`petal absolute w-8 h-16 bg-gold rounded-full ${petalsGrown ? 'animate-spread-petals' : 'opacity-0'}`} 
        style={{ 
          transformOrigin: 'bottom center',
          transform: `rotate(${rotation}deg) translateY(-40px)`,
          animationDelay: `${2300 + i * 50}ms`
        }}
      />
    );
  }

  return (
    <div className="relative w-full h-72 flex justify-center items-end overflow-hidden">
      {/* Stem */}
      <div 
        className={`stem w-4 bg-green-500 rounded-full transition-all duration-3000 ease-out`}
        style={{ 
          height: stemGrown ? '150px' : '0px',
          transitionDuration: '2s'
        }}
      >
        {/* Leaves */}
        <div 
          className="absolute w-12 h-6 bg-green-400 rounded-full -left-10 top-1/3"
          style={{ 
            opacity: stemGrown ? 1 : 0, 
            transform: stemGrown ? 'rotate(-45deg) scale(1)' : 'rotate(-45deg) scale(0)',
            transition: 'opacity 0.5s, transform 1s',
            transitionDelay: '1.5s'
          }}
        />
        <div 
          className="absolute w-12 h-6 bg-green-400 rounded-full -right-10 top-2/3"
          style={{ 
            opacity: stemGrown ? 1 : 0, 
            transform: stemGrown ? 'rotate(45deg) scale(1)' : 'rotate(45deg) scale(0)',
            transition: 'opacity 0.5s, transform 1s',
            transitionDelay: '1.8s'
          }}
        />
      </div>
      
      {/* Flower */}
      <div 
        className="sunflower-center absolute top-0 left-1/2 -translate-x-1/2"
        style={{ 
          opacity: stemGrown ? 1 : 0,
          transform: stemGrown ? 'translateY(30px)' : 'translateY(180px)', 
          transition: 'opacity 0.5s, transform 2s',
          transitionDelay: '2s'
        }}
      >
        {/* Petals */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {petals}
          
          {/* Center */}
          <div 
            className="z-10 w-12 h-12 rounded-full bg-amber-800"
            style={{ 
              opacity: petalsGrown ? 1 : 0,
              transform: petalsGrown ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.5s, transform 1s',
              transitionDelay: '3s'
            }}
          >
            <div className="w-full h-full rounded-full bg-amber-700 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-amber-900 flex items-center justify-center animate-pulse-soft">
                <div className="w-5 h-5 rounded-full bg-amber-950"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sunflower;
