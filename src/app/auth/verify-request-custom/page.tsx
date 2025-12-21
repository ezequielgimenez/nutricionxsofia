"use client";

import Link from "next/link";

export default function VerifyRequestCustomPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#DEDFD8] p-6 gap-10">
      <div className="bg-[#EEEFE7] rounded-3xl p-6 sm:p-8 w-full max-w-130 space-y-5">
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <h2 className="font-black text-[40px] text-[#DEDFD8] leading-none">
            Nutrición
          </h2>
          <p className="font-nunito text-[#DEDFD8] text-[12px] font-extrabold tracking-[0.75em] leading-none">
            X SOFÍA
          </p>
        </div>

        {/* Mensaje de verificación */}
        <div className="flex flex-col items-center text-center gap-4 pt-8">
          <h3 className="font-mono font-extrabold text-[#1F2937] text-[29px]">
            ¡Revisá tu email!
          </h3>
          <p className="font-sans text-[#A6A6A6] text-[14px] max-w-md">
            Vas a recibir un enlace de acceso. Abrí tu correo y hacé click en el
            botón para iniciar sesión.
          </p>

          {/* Botón volver al login */}
          <Link href="/ingreso">
            <button className="mt-6 w-48 h-12 bg-[#A6A6A6] font-sans text-white text-sm font-semibold rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#8F8F8F]">
              Volver al login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
