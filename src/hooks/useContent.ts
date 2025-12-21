import { useState, useEffect } from "react";

export type HeroContent = {
  titulo: string;
  subtitulo: string;
  imagenes: string[];
};

export type Servicio = {
  titulo: string;
  descripcion: string;
  incluye1: string;
  incluye2: string;
  ubicacion: string;
  nota: string;
  duracion: string;
};

export type SobreMiContent = {
  parrafo1: string;
  parrafo2: string;
  parrafo3: string;
};

export type Content = {
  hero: HeroContent;
  servicios: Servicio[];
  sobreMi: SobreMiContent;
};

export const useContent = () => {
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => console.log("No hay contenido"));
  }, []);

  const saveContent = async (newContent: Content) => {
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContent),
    });
    setContent(newContent);
  };

  return { content, saveContent };
};
