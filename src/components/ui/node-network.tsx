"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

interface NodeNetworkProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

/**
 * A highly optimized, zero-dependency Node Network animation using Canvas.
 * Simulates a particle.js style network connecting nodes when they get close.
 */
export function NodeNetwork({ className }: NodeNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Configuration
    const PARTICLE_COUNT = 45; // Moderately dispersed, finding the sweet spot
    const CONNECTION_DISTANCE = 170; // Adjusted reach for moderate density
    const PARTICLE_SPEED = 0.4;
    // Teal-light RGB values: 125, 184, 192
    const COLOR_RGB = "125, 184, 192";
    
    const mouse = { x: -10000, y: -10000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
    };

    const handleMouseLeave = () => {
      mouse.x = -10000;
      mouse.y = -10000;
    };

    const resizeCanvas = () => {
      // Use devicePixelRatio for crisp rendering on retina displays
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      initParticles(rect.width, rect.height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED,
          radius: Math.random() * 1.5 + 1, // Radius between 1 and 2.5
        });
      }
    };

    const draw = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR_RGB}, 0.15)`; // Extremely subtle nodes
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Opacity decreases as distance increases
            const opacity = 1 - distance / CONNECTION_DISTANCE;
            ctx.strokeStyle = `rgba(${COLOR_RGB}, ${opacity * 0.12})`; // Extremely subtle lines
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect and interact with mouse
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        const MOUSE_RADIUS = CONNECTION_DISTANCE * 1.5;

        if (distanceMouse < MOUSE_RADIUS) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = 1 - distanceMouse / MOUSE_RADIUS;
          ctx.strokeStyle = `rgba(${COLOR_RGB}, ${opacity * 0.25})`; // Mouse connections slightly more visible
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Slight physical repel effect
          const force = (MOUSE_RADIUS - distanceMouse) / MOUSE_RADIUS;
          p.x += (dxMouse / distanceMouse) * force * 1.2;
          p.y += (dyMouse / distanceMouse) * force * 1.2;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Setup ResizeObserver to handle container resizing fluidly
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(container);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    // Start animation
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
