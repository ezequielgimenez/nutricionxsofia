"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/app/loading";
//hook
import { useContent } from "@/hooks/useContent";

const textHero = {
  title: (
    <>
      ORDENAR TU
      <em className="block">
        <span className="text-primary font-medium italic block">
          ALIMENTACIÓN
        </span>
      </em>
      NO TIENE QUE SER UN LÍO
    </>
  ),
  description: "Conocé las opciones y reservá tu turno.",
};

export default function HeroSectionComp() {
  const { content, saveContent } = useContent();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!content) return <Loading></Loading>;

  return (
    <div ref={emblaRef} className="relative overflow-hidden">
      <div className="flex">
        {content.hero.imagenes.map((url, index) => (
          <div
            key={index}
            className="relative min-w-full xs:h-[85vh] sm:h-[80vh] md:h-[90vh] xl:h-screen"
          >
            {/* Imagen */}

            <Image
              src={url}
              alt="carousel"
              quality={85}
              fill
              priority
              unoptimized
              className="w-full object-cover"
            />
            {/* <img
              src={slide.image}
              alt="carousel"
              className="w-full xs:h-[85vh] sm:h-[80vh] md:h-[90vh] xl:h-217 object-cover"
              loading="eager"
            /> */}
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-white/36" />
          </div>
        ))}
      </div>

      {/* Texto */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
        <h1
          className="
    font-serif font-medium leading-tight
    text-3xl
    sm:text-4xl
    md:text-5xl
    lg:text-[65px]
    max-w-xs sm:max-w-md md:max-w-2xl
  "
          dangerouslySetInnerHTML={{
            __html: content.hero.titulo.replace(
              "ALIMENTACIÓN",
              "<br/> ALIMENTACIÓN <br/>"
            ),
          }}
        ></h1>

        <p
          className="
                  mt-4 sm:mt-6
                  text-base sm:text-lg md:text-xl
                  text-[#E5E7EB]
                  font-sans font-medium
                  max-w-xs sm:max-w-md
                "
        >
          {content.hero.subtitulo}
        </p>

        {/* Botones */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <a href="#planes">
            <button
              className="
                    w-40
                    px-6 py-3
                    bg-[#9e9d9d]
                    rounded-full
                    text-[#E5E7EB]
                    cursor-pointer
                    font-sans font-medium
                    hover:bg-[#c6c3c3]
                    transition
                  "
            >
              Ver planes
            </button>
          </a>
          <a
            href="https://wa.link/pzycav"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="
                    w-40
                    px-6 py-3
                    border border-[#A6A6A6]
                    rounded-full
                    text-[#E5E7EB]
                    font-sans font-medium
                    cursor-pointer
                    hover:bg-[#c6c3c3]
                    transition
                  "
            >
              Reservar
            </button>
          </a>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-8 pb-4 left-1/2 -translate-x-1/2  flex gap-3 z-30">
        {content.hero.imagenes.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "bg-white scale-110" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
