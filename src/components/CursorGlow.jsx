import { useState, useEffect, useCallback } from 'react';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [hidden, setHidden] = useState(true);

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setHidden(false);
  }, []);

  useEffect(() => {
    let timeout;
    const handleIdle = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setHidden(true), 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleIdle);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleIdle);
      clearTimeout(timeout);
    };
  }, [handleMouseMove]);

  // Don't render on touch devices
  if ('ontouchstart' in window) return null;

  return (
    <div
      className={`cursor-glow ${hidden ? 'cursor-glow--hidden' : ''}`}
      style={{ left: position.x, top: position.y }}
    />
  );
};

export default CursorGlow;
