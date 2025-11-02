"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function KGBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpi = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpi);
      canvas.height = Math.floor(h * dpi);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      tilt.tx = (e.clientX / window.innerWidth - 0.5) * 0.1;
      tilt.ty = (e.clientY / window.innerHeight - 0.5) * 0.1;
    };
    window.addEventListener("mousemove", onMouseMove);

    type Node = { x: number; y: number; z: number; vx: number; vy: number; vz: number };
    const nodes: Node[] = Array.from({ length: 160 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      vz: (Math.random() - 0.5) * 0.00005,
    }));

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      tilt.x += (tilt.tx - tilt.x) * 0.05;
      tilt.y += (tilt.ty - tilt.y) * 0.05;

      if (!reduceMotion) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          n.z += n.vz;
          if (n.x < 0) n.x = 1;
          if (n.x > 1) n.x = 0;
          if (n.y < 0) n.y = 1;
          if (n.y > 1) n.y = 0;
          if (n.z < 0.1) n.z = 1;
          if (n.z > 1) n.z = 0.1;
        }
      }

   
      const colorStart = [16, 185, 129]; 
      const colorEnd = [139, 92, 246]; 
      const blend = (t: number) => [
        colorStart[0] + t * (colorEnd[0] - colorStart[0]),
        colorStart[1] + t * (colorEnd[1] - colorStart[1]),
        colorStart[2] + t * (colorEnd[2] - colorStart[2]),
      ];

      // edges
      ctx.lineWidth = 2;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dz = (a.z - b.z) * 300;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 140) {
            const t = (a.z + b.z) * 0.5;
            const [r, g, bcol] = blend(t);
            const alpha = 0.08 - dist / 1400;
            if (alpha > 0) {
              ctx.strokeStyle = `rgba(${r},${g},${bcol},${alpha})`;
              ctx.beginPath();
              const depth = (a.z + b.z) * 0.5;
              const ox = tilt.x * (1 - depth) * 40;
              const oy = tilt.y * (1 - depth) * 40;
              ctx.moveTo(a.x * w + ox, a.y * h + oy);
              ctx.lineTo(b.x * w + ox, b.y * h + oy);
              ctx.stroke();
            }
          }
        }
      }

      for (const n of nodes) {
        const size = (1.1 - n.z) * 3 + 0.5;
        const alpha = 0.3 + (1 - n.z) * 0.5;
        const [r, g, bcol] = blend(n.z);
        const gx = n.x * w + tilt.x * (1 - n.z) * 40;
        const gy = n.y * h + tilt.y * (1 - n.z) * 40;
        const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, size * 2.5);
        glow.addColorStop(0, `rgba(${r},${g},${bcol},${alpha})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(gx, gy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
      aria-hidden
    />
  );
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6">
     
      <KGBackdrop />

      <div className="relative w-full max-w-2xl text-center rounded-2xl border border-white/10 bg-white/5 dark:bg-zinc-900/40 backdrop-blur-md shadow-2xl p-10">
       
        <div className="pointer-events-none absolute -inset-1 rounded-2xl blur-2xl opacity-20 bg-gradient-to-r from-emerald-400 to-violet-500" />

        <h1 className="relative text-6xl sm:text-7xl font-extrabold mb-2">
          <span className="bg-gradient-to-r from-[#3ef4c5] to-[#a78bfa] bg-clip-text text-transparent">
            404
          </span>
        </h1>
        <h2 className="relative text-xl sm:text-2xl font-semibold mb-3">
        Oops! This page doesn’t exist.
        </h2>
        <p className="relative text-base opacity-80 mb-8 max-w-md mx-auto">
         The link you followed doesn’t exist. Let’s guide you back home.
        </p>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium bg-gradient-to-r from-[#3ef4c5] to-[#a78bfa] text-white hover:opacity-90 transition"
          >
             Back to Home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium border border-white/25 hover:border-white/50 transition"
          >
            Report a broken link
          </Link>
        </div>
      </div>
    </main>
  );
}
