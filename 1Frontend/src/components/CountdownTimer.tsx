// CountdownTimer.tsx
import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  message: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, message }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft("Time's up!");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-center mt-44">
      {/* Animação da mensagem dinâmica */}
      <div className="text-lg font-semibold italic mb-1 text-white">
        <span className="inline-block animate-shake animate-colorChange text-xl font-bold">
          {message}
        </span>
      </div>
      <div className="text-4xl font-extrabold text-yellow-300 tracking-wide">{timeLeft}</div>
    </div>
  );
};

export default CountdownTimer;

