import type { Metadata } from "next";
import AOSProvider from "./AosProvider";
import { AuthProvider } from "./providers";

// comentario

import {
  DM_Sans,
  Playfair_Display,
  Roboto,
  Archivo_Black,
  Nunito,
} from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playFairDisp = Playfair_Display({
  variable: "--font-play-fair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "nutriciónxsofia",
  description:
    "Acompaño procesos nutricionales desde un enfoque personalizado y flexible, teniendo en cuenta el contexto, los hábitos y las posibilidades reales de cada persona.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${dmSans.variable} ${playFairDisp.variable} ${roboto.variable} ${archivoBlack.variable} ${nunito.variable} antialiased`}
      >
        <AOSProvider />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
