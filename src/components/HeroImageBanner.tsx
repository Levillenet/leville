import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import imgStudioBed from "@/assets/hero-custom/Q6A8241-medium-2.jpg";
import imgStudioKitchen from "@/assets/hero-custom/Q6A8253-medium-2.jpg";
import imgApartmentLiving from "@/assets/hero-custom/Q6A8085-medium-2.jpg";
import imgApartmentDining from "@/assets/hero-custom/Q6A8106-medium-2.jpg";
import imgApartmentWide from "@/assets/hero-custom/Q6A8111-medium-2.jpg";
import imgSaunaKarhupirtti from "@/assets/hero-custom/20210602_100341-medium-2.jpg";
import imgKarhupirttiKitchen from "@/assets/hero-custom/Karhupirtti_kitchen5-medium-2.jpg";
import imgHotTubWinter from "@/assets/hero-custom/IMG_20211201_190241-medium-2.jpg";
import imgKarhupirttiDining from "@/assets/hero-custom/Karhupirtti_dining_kitchen-medium-2.jpg";
import imgSaunaApartment from "@/assets/hero-custom/Hiihtajanakuja-12_5B5-51-Copy-medium-2.jpg";

const FADE_MS = 1400;
const SLIDE_MS = 8000;

const HeroImageBanner = () => {
  const images = useMemo(
    () => [
      {
        src: imgKarhupirttiDining,
        alt: "Leville majoitus Levi – Karhupirtti hirsimökin ruokailutila",
      },
      {
        src: imgApartmentLiving,
        alt: "Leville majoitus Levi – huoneiston olohuone ja ruokailutila",
      },
      {
        src: imgApartmentDining,
        alt: "Leville majoitus Levi – moderni keittiö ja ruokailutila",
      },
      {
        src: imgStudioBed,
        alt: "Leville majoitus Levi – studiohuoneiston sänky ja sisustus",
      },
      {
        src: imgStudioKitchen,
        alt: "Leville majoitus Levi – studiohuoneiston keittiö",
      },
      {
        src: imgHotTubWinter,
        alt: "Leville majoitus Levi – ulkoporeallas talvimaisemassa",
      },
      {
        src: imgSaunaApartment,
        alt: "Leville majoitus Levi – saunan lauteet",
      },
      {
        src: imgSaunaKarhupirtti,
        alt: "Leville majoitus Levi – Karhupirtin sauna",
      },
      {
        src: imgApartmentWide,
        alt: "Leville majoitus Levi – huoneisto avara oleskelutila",
      },
      {
        src: imgKarhupirttiKitchen,
        alt: "Leville majoitus Levi – Karhupirtin moderni keittiö",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Preload to avoid flashes and ensure smooth cross-fade.
    images.forEach(({ src }) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, SLIDE_MS);

    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={images[index]?.src}
          src={images[index]?.src}
          alt={images[index]?.alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index === 0 ? "high" : "auto"}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: FADE_MS / 1000, ease: "easeInOut" },
            scale: { duration: SLIDE_MS / 1000, ease: "easeOut" },
          }}
          style={{ willChange: "transform, opacity" }}
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroImageBanner;
