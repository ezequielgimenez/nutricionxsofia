"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function IngresoPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("email", {
      email,
      redirect: false, // <-- evita recarga automática
      callbackUrl: "/panel",
    });

    if (res?.error) {
      // mostrar mensaje de error en pantalla
      console.log("Error enviando enlace:", res.error);
    } else {
      // mostrar mensaje de éxito
      console.log("Enlace enviado correctamente");
    }
  };

  return (
    <div>
      <main className="flex justify-center items-center bg-[#DEDFD8] xs:px-4 pt-16.75 pb-68">
        <form
          onSubmit={handleSubmit}
          className="bg-[#EEEFE7] rounded-3xl p-6 sm:p-8 w-full max-w-130 space-y-5 "
        >
          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <h2 className="font-black text-[40px] text-[#DEDFD8] leading-none">
              Nutrición
            </h2>
            <p className="font-nunito text-[#DEDFD8] text-[12px] font-extrabold tracking-[0.75em] leading-none">
              X SOFÍA
            </p>
          </div>

          <div>
            <h3 className="font-mono font-extrabold text-[#1F2937] text-[29px]">
              Iniciar sesión
            </h3>
            <p className="xs:text-center lg:text-start font-sans text-[#A6A6A6] ">
              Ingresá tu correo electrónico.
              <br /> Vas a recibir un enlace para iniciar sesión.
            </p>
          </div>
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="text-[#A6A6A6] text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white rounded-lg px-4 py-3 text-sm text-[#1F2937] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
            />
          </div>
          {/* Botón */}
          <button
            type="submit"
            className="w-full h-14 bg-[#A6A6A6] font-sans text-white text-sm font-semibold py-3 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#8F8F8F]"
          >
            Enviar enlace
          </button>
        </form>
      </main>
    </div>
  );
}
