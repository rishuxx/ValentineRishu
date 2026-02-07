
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [elements, setElements] = useState<{ id: number; left: number; delay: number; duration: number; type: 'heart' | 'peach' }[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      // Fixed type inference by wrapping the ternary and casting to the specific union type
      type: (Math.random() > 0.7 ? 'peach' : 'heart') as 'heart' | 'peach',
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute bottom-[-50px] animate-float-up opacity-20"
          style={{
            left: `${el.left}%`,
            animation: `floatUp ${el.duration}s linear infinite`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.type === 'heart' ? (
            <span className="text-4xl text-pink-400">❤</span>
          ) : (
            <span className="text-4xl">🍑</span>
          )}
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-120vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
