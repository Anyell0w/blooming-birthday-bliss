
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

  const petalCount = 20; // Increased number of petals
  const petals = [];
  
  // Generate the petals with more natural arrangement
  for (let i = 0; i < petalCount; i++) {
    const rotation = (i * (360 / petalCount));
    const randomScale = 0.9 + Math.random() * 0.3; // Add some natural variation
    const randomLength = 18 + Math.random() * 5; // Vary petal length slightly
    
    petals.push(
      <div 
        key={i}
        className={`petal absolute rounded-full ${petalsGrown ? 'animate-spread-petals' : 'opacity-0'}`} 
        style={{ 
          width: `8px`,
          height: `${randomLength}px`,
          backgroundColor: `rgb(255, ${190 + Math.random() * 30}, 0)`, // Vary the yellow shade
          transformOrigin: 'bottom center',
          transform: `rotate(${rotation}deg) translateY(-40px) scale(${randomScale})`,
          animationDelay: `${2300 + i * 50}ms`,
          boxShadow: '0 0 3px rgba(0,0,0,0.1)'
        }}
      />
    );
  }

  return (
    <div className="relative w-full h-72 flex justify-center items-end overflow-hidden">
      {/* Stem */}
      <div 
        className={`stem w-3 bg-gradient-to-t from-green-600 to-green-500 rounded-full transition-all duration-3000 ease-out`}
        style={{ 
          height: stemGrown ? '150px' : '0px',
          transitionDuration: '2s',
          boxShadow: '0 0 5px rgba(0,0,0,0.1)'
        }}
      >
        {/* Leaves */}
        <div 
          className="absolute w-14 h-6 bg-gradient-to-r from-green-500 to-green-400 rounded-full -left-12 top-1/3"
          style={{ 
            opacity: stemGrown ? 1 : 0, 
            transform: stemGrown ? 'rotate(-45deg) scale(1)' : 'rotate(-45deg) scale(0)',
            transition: 'opacity 0.5s, transform 1s',
            transitionDelay: '1.5s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}
        />
        <div 
          className="absolute w-14 h-6 bg-gradient-to-r from-green-500 to-green-400 rounded-full -right-12 top-2/3"
          style={{ 
            opacity: stemGrown ? 1 : 0, 
            transform: stemGrown ? 'rotate(45deg) scale(1)' : 'rotate(45deg) scale(0)',
            transition: 'opacity 0.5s, transform 1s',
            transitionDelay: '1.8s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
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
        <div className="relative w-20 h-20 flex items-center justify-center">
          {petals}
          
          {/* Center */}
          <div 
            className="z-10 w-16 h-16 rounded-full bg-gradient-to-br from-amber-900 to-amber-700"
            style={{ 
              opacity: petalsGrown ? 1 : 0,
              transform: petalsGrown ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.5s, transform 1s',
              transitionDelay: '3s',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center p-1">
              {/* Seed pattern */}
              <div className="relative w-full h-full rounded-full bg-amber-800 overflow-hidden">
                {/* Create seed pattern */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-amber-950"
                    style={{
                      left: `${Math.cos(i * 0.7) * 30 + 50}%`,
                      top: `${Math.sin(i * 0.7) * 30 + 50}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sunflower;
