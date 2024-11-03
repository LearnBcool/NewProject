
// src/components/CountdownTimer.tsx
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
  message?: string;  // Adicionamos a propriedade opcional "message"
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, message }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      {message && (
        <h2 className="text-2xl font-bold text-white bg-orange-500 py-2 px-4 rounded-lg shadow-md mb-4">
          {message} {/* Mensagem exibida acima do timer */}
        </h2>
      )}
      <div className="flex space-x-4 text-lg font-semibold">
        <div>
          <span>{timeLeft.days}</span> Dias
        </div>
        <div>
          <span>{timeLeft.hours}</span> Horas
        </div>
        <div>
          <span>{timeLeft.minutes}</span> Minutos
        </div>
        <div>
          <span>{timeLeft.seconds}</span> Segundos
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
