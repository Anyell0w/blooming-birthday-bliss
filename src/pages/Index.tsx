
import React, { useState, useEffect } from 'react';
import Countdown from '../components/Countdown';
import LoveCoupon from '../components/LoveCoupon';
import Sunflower from '../components/Sunflower';
import BirthdayMessage from '../components/BirthdayMessage';
import { HeartIcon, GiftIcon, CalendarIcon, SunIcon, FlowerIcon } from 'lucide-react';

const Index = () => {
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [showSunflower, setShowSunflower] = useState(false);
  
  // Set the target date to April 10, 2024
  const birthdayDate = new Date('2024-04-10T00:00:00');
  
  // Check if we've already passed the birthday date
  const isPastBirthday = new Date() > birthdayDate;
  
  useEffect(() => {
    // If we're past the birthday date, show everything immediately
    if (isPastBirthday) {
      setCountdownComplete(true);
      setTimeout(() => setShowSunflower(true), 500);
    }
    
    // For testing/demo purposes - if 'show=true' is in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('show') === 'true') {
      setCountdownComplete(true);
      setTimeout(() => setShowSunflower(true), 500);
    }
  }, [isPastBirthday]);
  
  const handleCountdownComplete = () => {
    setCountdownComplete(true);
    setTimeout(() => setShowSunflower(true), 500);
  };
  
  const loveCoupons = [
    { 
      title: "Día de Película", 
      description: "Vale por un día de películas, palomitas y abrazos.",
      icon: <HeartIcon className="w-6 h-6 text-white" />
    },
    { 
      title: "Masaje Relajante", 
      description: "Redime este cupón por un masaje completo de 30 minutos.",
      icon: <GiftIcon className="w-6 h-6 text-white" />
    },
    { 
      title: "Cena Romántica", 
      description: "Una cena preparada especialmente para ti, con velas y música.",
      icon: <SunIcon className="w-6 h-6 text-white" />
    },
    { 
      title: "Día de Aventura", 
      description: "Escoge cualquier actividad o lugar para visitar juntos.",
      icon: <CalendarIcon className="w-6 h-6 text-white" />
    },
    { 
      title: "Desayuno en Cama", 
      description: "Despierta con tu desayuno favorito servido en la cama.",
      icon: <FlowerIcon className="w-6 h-6 text-white" />
    },
    { 
      title: "Cupón Comodín", 
      description: "Úsalo para cualquier cosa que desees (dentro de lo razonable).",
      icon: <HeartIcon className="w-6 h-6 text-white" />
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-dancing text-romantic-dark mb-2 animate-fade-in">
            {countdownComplete ? "¡Feliz Cumpleaños!" : "Cuenta Regresiva Especial"}
          </h1>
          <p className="text-neutral-dark animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {countdownComplete 
              ? "Ha llegado el día tan esperado" 
              : "Para el día más especial del año"}
          </p>
        </header>
        
        {/* Main Content */}
        <main className="space-y-24">
          {/* Countdown Timer (shown only if countdown is not complete) */}
          {!isPastBirthday && !countdownComplete && (
            <section>
              <Countdown 
                targetDate={birthdayDate} 
                onComplete={handleCountdownComplete} 
              />
            </section>
          )}
          
          {/* Birthday Message and Sunflower (shown when countdown completes) */}
          <section className={`transition-all duration-1000 ${countdownComplete ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <BirthdayMessage visible={countdownComplete} />
            
            <div className="mt-12">
              <Sunflower animate={showSunflower} />
            </div>
          </section>
          
          {/* Love Coupons (shown when countdown completes) */}
          <section 
            className={`transition-all duration-1000 ${countdownComplete ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
            style={{ transitionDelay: '1s' }}
          >
            <h2 className="text-2xl md:text-3xl font-dancing text-center mb-8 text-romantic-dark">
              Cupones de Amor
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loveCoupons.map((coupon, index) => (
                <LoveCoupon
                  key={index}
                  title={coupon.title}
                  description={coupon.description}
                  delay={3500 + index * 200}
                  icon={coupon.icon}
                />
              ))}
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="text-center mt-16 text-neutral animate-fade-in">
          <p className="text-sm">Con todo mi amor para ti ❤️</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
