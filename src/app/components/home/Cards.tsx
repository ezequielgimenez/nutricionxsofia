import Image from "next/image";

type PlanCardProps = {
  className?: string;
  icon: string;
  title: string;
  description: string;
  ubicacion?: string;
  note?: string;
  includes: string[];
  duration: string;
};

export function PlanCard({
  className = "",
  icon,
  title,
  description,
  ubicacion,
  note,
  includes,
  duration,
}: PlanCardProps) {
  return (
    <div
      className={`flex flex-col xs:w-87 xs:h-auto xl:w-101.5 bg-[#DEDFD8] px-8 xl:px-0 xl:pl-8.25 rounded-3xl transition-transform duration-300 ease-in-out hover:scale-105 hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] ${className}`}
    >
      {/* Icon */}
      <div className="pt-8.25">
        <Image
          src={icon}
          alt={title}
          width={52}
          height={52}
          priority
          unoptimized
        />
      </div>

      {/* Title + Description */}
      <div className="pt-5.75">
        <h4 className="font-mono text-[#1F2937] text-[24px] font-bold">
          {title}
        </h4>
        <p className="xs:w-[289px] w-86.25 xl:pt-1.75 font-sans text-[#4B5563] text-[14px] font-normal">
          {description}
        </p>
      </div>

      {/* Includes & Ubication */}
      <div className="pt-[20px] px-2 space-y-2.25">
        {includes.map((item, index) =>
          item ? (
            <div key={index} className="flex items-center gap-2">
              <Image
                src="/icons/check.png"
                alt=""
                width={11}
                height={8}
                priority
                unoptimized
              />
              <p className="text-sm text-[#6B7280]">{item}</p>
            </div>
          ) : null
        )}

        {ubicacion && (
          <div className="flex items-center gap-2">
            <Image
              src="/icons/ubication.png"
              alt="ubication"
              width={12}
              height={14}
              priority
              unoptimized
            />
            <p className="font-sans text-[#6B7280] text-[14px]">{ubicacion}</p>
          </div>
        )}

        {note && (
          <div className="flex items-start gap-2">
            <Image
              src="/icons/note.png"
              alt="note"
              width={12}
              height={12}
              priority
              unoptimized
              className="pt-1"
            />
            <p className="font-sans text-[#6B7280] text-[14px]">
              <span className="text-[#374151] font-semibold text-[14px]">
                Nota:{" "}
              </span>
              {note}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto xs:pt-[40px] lg:pt-1 pb-4.25 space-y-4.75">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/reloj.png"
            alt="check"
            width={12}
            height={12}
            quality={85}
            priority
            unoptimized
          />
          <p className="font-sans text-[#6B7280] text-[14px]">
            Duración: {duration}
          </p>
        </div>
        <a
          href="https://wa.link/pzycav"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="w-full xl:w-84.75 h-12.5 text-[#514E4E]/88 font-semibold border border-[#A6A6A6] rounded-lg cursor-pointer transition-colors duration-500 ease-in-out hover:bg-[#A6A6A6]/30">
            Reservar
          </button>
        </a>
      </div>
    </div>
  );
}
