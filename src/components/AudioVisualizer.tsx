
import { useEffect, useRef } from 'react';

export function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const bars = 50;
    const barWidth = canvas.width / bars;

    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Simuler un effet de visualisation audio
      for (let i = 0; i < bars; i++) {
        const height = Math.random() * canvas.height * 0.8;
        const hue = (250 + i * 2) % 360; // Violet theme
        
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
        ctx.fillRect(
          i * barWidth,
          canvas.height - height,
          barWidth - 2,
          height
        );
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={60}
      className="w-full h-[60px] rounded-lg opacity-80"
    />
  );
}
