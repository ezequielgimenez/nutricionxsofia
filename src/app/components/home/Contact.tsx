import Image from "next/image";
import ContactForm from "./Form";

export default function ContactComp() {
  return (
    <div
      id="contacto"
      className="-mt-7 relative z-10  rounded-t-[44px] bg-[#605D5D] h-auto"
    >
      <div className="flex justify-between xs:px-4 sm:px-24 xs:flex-col lg:flex-row xl:px-36 py-20">
        <div className="xs:pb-16 lg:pb-0">
          <h3 className="xs:text-center lg:text-start font-mono font-bold text-white text-[36px] pb-2">
            Contacto
          </h3>
          <p className="xs:text-center lg:text-start font-sans text-white">
            Reserva tu turno o envíame tus dudas.
          </p>
          <div className="flex items-center gap-4 pt-10">
            <Image
              src="/icons/whatsapp.png"
              alt="carousel"
              quality={85}
              width={48}
              height={48}
              priority
              unoptimized
            />
            <div>
              <p className="font-sans text-[#A6A6A6] text-xs">WHATSAPP</p>
              <p className="font-sans text-white text-[18px font-medium]">
                +54 9 2257 662231
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-10">
            <Image
              src="/icons/instagram.png"
              alt="carousel"
              quality={85}
              width={48}
              height={48}
              priority
              unoptimized
            />
            <div>
              <p className="font-sans text-[#A6A6A6] text-xs">INSTAGRAM</p>
              <p className="font-sans text-white text-[18px font-medium]">
                @nutricionxsofia
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-10">
            <Image
              src="/icons/email.png"
              alt="carousel"
              quality={85}
              width={48}
              height={48}
              priority
              unoptimized
            />
            <div>
              <p className="font-sans text-[#A6A6A6] text-xs">EMAIL</p>
              <p className="font-sans text-white text-[18px font-medium]">
                nutricionxsofia@gmail.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-10">
            <Image
              src="/icons/direccion.png"
              alt="carousel"
              quality={85}
              width={48}
              height={48}
              priority
              unoptimized
            />
            <div>
              <p className="font-sans text-[#A6A6A6] text-xs">DIRECCIÓN</p>
              <p className="font-sans text-white text-[18px font-medium]">
                Calle 35 905, consultorio 4 - La Plata, BA.
              </p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
      <div className="flex flex-col items-center pt-20 xs:px-4 sm:px-24">
        <div className="xs:w-[300px] sm:w-[500px] lg:w-[800px] xl:w-[1152px] h-px bg-[#A6A6A6]"></div>
        <div className="pt-4.5 pb-16">
          <p className="font-sans text-center text-white text-xs font-light">
            © 2026 NutricionxSofia. Lic. en Nutrición – MP 12845 <br />
            Atención online y presencial. Todos los derechos reservados.
            <br />
            <span className="font-sans text-white text-xs">
              Desarrollado por{" "}
              <a
                href="https://www.egsitios.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                font-normal
                text-[#BDBDBD]
                hover:text-white
                underline
                underline-offset-4
                decoration-transparent
                hover:decoration-white
                transition-all
                duration-300
              "
              >
                EG Sitios.
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
