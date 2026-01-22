"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const comp = useRef(null);
  const [targetValue, setTargetValue] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Simple animation sequence
      tl.to(".welcome-text", {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: "power2.out",
      })
      .to(".preloader", {
        y: "-100%",
        duration: 0.1,
        ease: "power4.inOut",
        delay: 0.1,
      });
    }, comp);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={comp}
      className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <h1 className="welcome-text text-4xl md:text-6xl font-bold font-saira text-white opacity-0 translate-y-10">
        Welcome
      </h1>
    </div>
  );
}
