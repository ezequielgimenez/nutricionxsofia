import Image from "next/image";

export default function PanelPage() {
  return (
    <div>
      <main className="flex justify-center items-center bg-[#DEDFD8] xs:px-4 pt-[67px] pb-[272px]">
        <form className="bg-[#EEEFE7] rounded-3xl p-6 sm:p-8 w-full max-w-130 space-y-5 ">
          <div className="flex flex-col items-center gap-1 cursor-pointer">
            <h2 className="font-black text-[40px] text-[#DEDFD8] leading-none">
              Nutrición
            </h2>
            <p className="font-nunito text-[#DEDFD8] text-[12px] font-extrabold tracking-[0.75em] leading-none">
              X SOFÍA
            </p>
          </div>

          <div className="py-[29px] space-y-[29px]">
            <h3 className="font-mono font-extrabold text-[#1F2937] text-[29px] text-center">
              Bienvenida! Inicio exitoso
            </h3>
            <p className="text-center font-sans text-[#A6A6A6] ">
              Podes acceder a las opciones de edición de contenido para tu web.
            </p>
          </div>
          {/* Botón 1*/}
          <a href="/contenido">
            <button
              type="button"
              className="w-full h-14 bg-[#A6A6A6] font-sans text-white text-sm font-semibold py-3 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#8F8F8F]"
            >
              Editar contenido de la web
            </button>
          </a>
          {/* Botón 2*/}
          <div className="pt-4"></div>
          <a href="/">
            <button
              type="button"
              className="w-full h-14 bg-[#A6A6A6] font-sans text-white text-sm font-semibold py-3 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-[#8F8F8F]"
            >
              Salir
            </button>
          </a>
        </form>
      </main>
    </div>
  );
}
