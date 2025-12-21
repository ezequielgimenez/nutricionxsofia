import Image from "next/image";
import { PlanCard } from "./Cards";
import { useContent } from "@/hooks/useContent";

export default function PlanesComp() {
  const { content, saveContent } = useContent();

  if (!content) return <p>Cargando...</p>;
  const icons = [
    "/icons/2-plan2.png",
    "/icons/3-plan3.png",
    "/icons/4-plan4.png",
    "/icons/5-plan5.png",
  ];

  return (
    <div
      id="planes"
      className=" -mt-7
    bg-white
    h-auto
    rounded-t-[44px]
    relative
    z-10
    shadow-[0_-12px_30px_rgba(0,0,0,0.08)]
    pb-20"
    >
      <div
        data-aos="fade-up"
        className=" flex flex-col items-center pt-20 text-center"
      >
        <p className="font-sans text-[#A6A6A6] text-[12px] sm:text-[14px] font-bold">
          TIPOS DE PLAN
        </p>
        <h3 className="font-serif text-[32px] sm:text-[40px] xl:text-[48px] pt-2">
          Elegí el plan ideal para vos
        </h3>
        <p className="font-sans text-[#A6A6A6] text-[16px] text-xs font-normal pt-7 px-4">
          Desde asesoría online hasta la medición antropométrica precisa.
          Encontrá lo <br /> que tu cuerpo necesita.
        </p>
      </div>
      {/* Container de cards */}
      <div
        data-aos="fade-up"
        className="flex flex-col lg:flex-row flex-wrap justify-center items-center lg:items-start gap-5 pt-16.25 sm:px-4"
      >
        {/* card 1 */}
        <div
          className="flex flex-col xs:w-87 xl:w-101.5 h-147.5 bg-[#DEDFD8] px-8 xl:px-0 xl:pl-8.25 rounded-3xl transition-transform duration-300 ease-in-out hover:scale-105 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)]
"
        >
          <div className="pt-8.25">
            <Image
              src="/icons/1-plan1.png"
              alt="carousel"
              quality={85}
              width={52}
              height={52}
              priority
              unoptimized
            />
          </div>
          {/* texto y descripcion */}
          <div className="pt-5.75 ">
            <h4 className="font-mono text-[#1F2937] text-[24px] font-bold">
              Asesoría Online
            </h4>
            <p className="xs:w-[289px] w-86.25 xl:pt-1.75 font-sans text-[#4B5563] text-[14px] text-xs font-normal">
              Encuentro virtual orientado a identificar puntos a mejorar en tu
              alimentación y brindarte herramientas practicas para aplicar en tu
              día a día.
            </p>
          </div>
          <div className="pt-8.5 space-y-2.25">
            <p className="font-sans text-[#A6A6A6] text-[15px] font-light pb-3.5">
              Incluye ideas de menú generales para:
            </p>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/check.png"
                alt="check"
                width={11}
                height={8}
                quality={85}
              />
              <p className="font-sans text-[#6B7280] text-[14px] font-normal">
                Desayunos y meriendas
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/check.png"
                alt="check"
                width={11}
                height={8}
                quality={85}
              />
              <p className="font-sans text-[#6B7280] text-[14px] font-normal">
                Almuerzos y cenas
              </p>
            </div>
            <div className="w-69 flex items-start gap-2">
              <Image
                src="/icons/like.png"
                alt="check"
                width={13}
                height={12}
                quality={85}
                className="pt-1"
              />
              <p className="font-sans text-[#6B7280] text-[14px] font-normal">
                <span className="text-[#374151] font-semibold">
                  Recomendado para:
                </span>{" "}
                personas que no buscan adquirir un plan nutricional, pero sí
                adquirir recomendaciones y recursos para ordenar su
                alimentación.
              </p>
            </div>
          </div>
          <div className="mt-auto xs:pt-[40px] lg:pt-0 pb-4.25 space-y-4.75">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/reloj.png"
                alt="check"
                width={12}
                height={12}
                quality={85}
              />
              <p className="font-sans text-[#6B7280] text-[14px] font-normal">
                Duración: 40 minutos aproximadamente.
              </p>
            </div>
            <a
              href="https://wa.link/pzycav"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="w-full xl:w-84.75 h-12.5 text-[#514E4E]/88 font-semibold border border-[#A6A6A6] rounded-lg cursor-pointer transition-colors duration-500 ease-in-out 
            hover:bg-[#A6A6A6]/30"
              >
                Reservar
              </button>
            </a>
          </div>
        </div>

        {content.servicios.map((plan, index) => (
          <PlanCard
            key={index}
            icon={icons[index]}
            className={
              index === content.servicios.length - 1
                ? "xl:w-[842px] xl:h-[396px]"
                : "xl:h-[591px]"
            }
            title={plan.titulo}
            description={plan.descripcion}
            includes={[plan.incluye1, plan.incluye2]}
            ubicacion={plan.ubicacion}
            note={plan.nota}
            duration={plan.duracion}
          />
        ))}
      </div>
    </div>
  );
}
