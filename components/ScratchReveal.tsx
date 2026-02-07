
import React, { useRef, useEffect, useState } from 'react';

interface ScratchRevealProps {
  imageUrl: string;
  width: number;
  height: number;
  onComplete: () => void;
}

const ScratchReveal: React.FC<ScratchRevealProps> = ({ imageUrl, width, height, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDone, setIsDone] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with a "scratchable" layer
    ctx.fillStyle = '#FF92A9'; // Pink scratchable layer
    ctx.fillRect(0, 0, width, height);
    
    // Add some "glitter" to the scratch layer
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#FFCCB6' : '#FFFFFF';
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, 1, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.font = 'bold 20px Quicksand';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH TO REVEAL ME! ❤️', width / 2, height / 2);

    ctx.globalCompositeOperation = 'destination-out';
  }, [width, height]);

  const scratch = (x: number, y: number) => {
    if (isDone) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    const posX = x - (rect.left + scrollX);
    const posY = y - (rect.top + scrollY);

    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(posX, posY);
    ctx.stroke();

    checkPercentage();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let count = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) count++;
    }

    const percentage = (count / (width * height)) * 100;
    if (percentage > 40 && !isDone) {
      setIsDone(true);
      onComplete();
      if (typeof window.spawnConfetti === 'function') window.spawnConfetti();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing) scratch(e.pageX, e.pageY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    scratch(e.touches[0].pageX, e.touches[0].pageY);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-inner border-4 border-white" style={{ width, height }}>
      <img 
        src={imageUrl} 
        alt="Couple" 
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          console.error("Image failed to load:", imageUrl);
          // Fallback if image fails
          e.currentTarget.src = "https://res.cloudinary.com/dg33y9bsn/image/upload/v1770517487/img2_zye3gu.jpg";
        }}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className={`absolute inset-0 cursor-crosshair transition-opacity duration-1000 ${isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />
    </div>
  );
};

export default ScratchReveal;
