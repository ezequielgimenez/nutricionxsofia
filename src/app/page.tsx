"use client";

import HeaderComp from "./components/layout/Header";
import HeroSectionComp from "./components/layout/Hero";
import PlanesComp from "./components/home/Planes";
import AboutMeComp from "./components/home/About-me";
import ContactComp from "./components/home/Contact";

export default function Home() {
  return (
    <div>
      <HeaderComp />
      <HeroSectionComp />
      <PlanesComp />
      <AboutMeComp />
      <ContactComp />
    </div>
  );
}
