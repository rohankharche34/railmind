"use client";

import { useEffect, useRef } from "react";

export function useHomeInteractions() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const heroImg = heroImgRef.current;

    const onHeroMove = (e: MouseEvent) => {
      if (!heroSection || !heroImg) return;
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroImg.style.transform = `translate(${x * 12}px, ${y * 12}px) scale(1.02)`;
    };

    const onHeroLeave = () => {
      if (!heroImg) return;
      heroImg.style.transform = "translate(0, 0) scale(1)";
    };

    heroSection?.addEventListener("mousemove", onHeroMove);
    heroSection?.addEventListener("mouseleave", onHeroLeave);

    const tiltCards = document.querySelectorAll<HTMLElement>(".tilt-card");
    const tiltHandlers = new Map<
      HTMLElement,
      { move: (e: MouseEvent) => void; leave: () => void }
    >();

    tiltCards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      };
      const onLeave = () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      tiltHandlers.set(card, { move: onMove, leave: onLeave });
    });

    const magneticBtns = document.querySelectorAll<HTMLElement>(".magnetic");
    const magneticHandlers = new Map<
      HTMLElement,
      { move: (e: MouseEvent) => void; leave: () => void }
    >();

    magneticBtns.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      };
      const onLeave = () => {
        btn.style.transform = "translate(0, 0)";
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      magneticHandlers.set(btn, { move: onMove, leave: onLeave });
    });

    return () => {
      heroSection?.removeEventListener("mousemove", onHeroMove);
      heroSection?.removeEventListener("mouseleave", onHeroLeave);
      tiltHandlers.forEach(({ move, leave }, card) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
      magneticHandlers.forEach(({ move, leave }, btn) => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return { heroSectionRef, heroImgRef };
}
