"use client";
import React, { useEffect, useState, useRef } from "react";

const images = [
  "/cookies/cookies-01.jpg",
  "/cookies/cookies-02.jpg",
  "/cookies/cookies-03.jpg",
  "/cookies/cookies-04.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false); // Nuevo flag
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`Galleta ${idx + 1}`}
          className={`transition-opacity duration-1000 absolute w-full h-full object-cover top-0 left-0 ${
            idx === current ? "opacity-70" : "opacity-0"
          }`}
          draggable={false}
        />
      ))}
      {/* Overlay para oscurecer el fondo y que el texto sea legible */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/70 to-rose-400/70 "></div>
      {/* Flechas */}
      {/* <button
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white/10 rounded-full p-2 shadow-md transition-colors"
        onClick={prevSlide}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white/90 rounded-full p-2 shadow-md transition-colors"
        onClick={nextSlide}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
      </button> */}
    </div>
  );
}
