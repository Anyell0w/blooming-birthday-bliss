
import React, { useRef, useEffect } from 'react';
import { HeartIcon } from 'lucide-react';

interface LoveCouponProps {
  title: string;
  description: string;
  delay: number;
  icon?: React.ReactNode;
}

const LoveCoupon: React.FC<LoveCouponProps> = ({ 
  title, 
  description, 
  delay,
  icon = <HeartIcon className="w-6 h-6" />
}) => {
  const couponRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (couponRef.current) {
      setTimeout(() => {
        couponRef.current?.classList.add('coupon-appear');
      }, delay);
    }
  }, [delay]);

  return (
    <div 
      ref={couponRef}
      className="glass-card card-hover p-6 opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="romantic-gradient text-white text-center py-2 px-4 rounded-t-lg -mt-8 mb-4 mx-auto w-3/4 shadow-md">
        <h3 className="font-dancing text-xl">{title}</h3>
      </div>
      
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-romantic flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      <p className="text-center text-neutral-dark">{description}</p>
      
      <div className="mt-4 flex justify-center">
        <div className="border border-dashed border-romantic-dark p-2 rounded-lg text-xs text-center text-neutral-dark w-full">
          Válido hasta: Para siempre
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button className="neutral-gradient px-4 py-2 rounded-lg font-medium text-sm transition-transform hover:scale-105">
          Canjear Cupón
        </button>
      </div>
    </div>
  );
};

export default LoveCoupon;
