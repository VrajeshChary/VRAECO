import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let rx = 0;
    let ry = 0;
    let mx = 0;
    let my = 0;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setPosition({ x: mx, y: my });
    };

    const animateRing = () => {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      setRingPosition({ x: rx, y: ry });
      animationFrameId = requestAnimationFrame(animateRing);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.product-card')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    animateRing();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        className="cursor"
        style={{
          left: `${position.x - 6}px`,
          top: `${position.y - 6}px`,
          transform: isHovering ? 'scale(2)' : 'scale(1)',
        }}
      />
      <div
        className="cursor-ring"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          width: isHovering ? '50px' : '36px',
          height: isHovering ? '50px' : '36px',
        }}
      />
    </>
  );
}
