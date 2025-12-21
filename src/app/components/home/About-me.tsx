import Image from "next/image";
import { useContent } from "@/hooks/useContent";

export default function AboutMeComp() {
  const { content, saveContent } = useContent();

  if (!content) return <p>Cargando...</p>;
  return (
    <div
      id="sobre-mi"
      className="flex h-auto xs:flex-col xs:items-center lg:flex-row justify-center xs:gap-8 lg:gap- 6.75 bg-[#DEDFD8]  pt-23.75 pb-[140px]"
    >
      <div data-aos="fade-up">
        <Image
          src="/lic-sofia/imagen-nutricionista.png"
          alt="check"
          width={629}
          height={503}
          quality={85}
          priority
          unoptimized
        />
      </div>
      <div className="space-y-5">
        <div data-aos="fade-up">
          <h2 className="font-mono xs:text-center lg:text-start text-[#1F2937] text-[36px] font-bold">
            Sobre mí
          </h2>
        </div>
        <div className="w-20 h-1 bg-[#A6A6A6] mt-7 xs:mx-auto lg:mx-0"></div>
        <div data-aos="fade-up">
          <p className="xs:w-81 sm:w-125 lg:w-132.5 font-sans text-[#4B5563] xs:text-[14px] sm:text-[16px] lg:text-[18px] ">
            {content.sobreMi.parrafo1}
          </p>
        </div>
        <div data-aos="fade-up">
          <p className="xs:w-81 sm:w-125 lg:w-132.5 font-sans text-[#4B5563] xs:text-[14px] sm:text-[16px] lg:text-[18px] ">
            {content.sobreMi.parrafo2}
          </p>
        </div>
        <div data-aos="fade-up">
          <p className="xs:w-81 sm:w-125 lg:w-132.5 font-sans text-[#4B5563] xs:text-[14px] sm:text-[16px] lg:text-[18px] ">
            {content.sobreMi.parrafo3}
          </p>
        </div>
      </div>
    </div>
  );
}
