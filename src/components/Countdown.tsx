
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsComplete(true);
        onComplete();
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      setTimeLeft(updatedTimeLeft);
      
      if (updatedTimeLeft.days === 0 && 
          updatedTimeLeft.hours === 0 && 
          updatedTimeLeft.minutes === 0 && 
          updatedTimeLeft.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  // For demo/testing purposes - complete countdown in 10 seconds if manually triggered
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const test = urlParams.get('test');
    
    if (test === 'complete') {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  return (
    <div className={`transition-all duration-700 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="glass-card p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-dancing mb-6 text-center text-romantic-dark text-glow">
          Cuenta regresiva para tu cumpleaños
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <TimeUnit value={timeLeft.days} label="Días" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-lg text-neutral-dark italic">
            {isComplete 
              ? "¡Ha llegado el momento!" 
              : "Espera un poco más para tu sorpresa..."}
          </p>
        </div>
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center animate-float">
    <div className="glass-card w-full aspect-square flex items-center justify-center romantic-gradient bg-opacity-30 rounded-lg mb-2">
      <span className="text-3xl md:text-4xl font-bold text-white">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-sm md:text-base font-medium text-neutral-dark">
      {label}
    </span>
  </div>
);

export default Countdown;
