"use client";

import { useState, useEffect, useMemo } from "react";

type HeroContent = {
  titulo: string;
  subtitulo: string;
  imagenes: string[];
};

type Servicio = {
  titulo: string;
  descripcion: string;
  incluye1: string;
  incluye2: string;
  nota: string;
  ubicacion: string;
  duracion: string;
};

type SobreMiContent = {
  parrafo1: string;
  parrafo2: string;
  parrafo3: string;
};

type Content = {
  hero: HeroContent;
  servicios: Servicio[];
  sobreMi: SobreMiContent;
};

export default function PanelPage() {
  const [content, setContent] = useState<Content>({
    hero: { titulo: "", subtitulo: "", imagenes: [] },
    servicios: Array(4).fill({
      titulo: "",
      descripcion: "",
      incluye1: "",
      incluye2: "",
      ubicacion: "",
      nota: "",
      duracion: "",
    }),
    sobreMi: { parrafo1: "", parrafo2: "", parrafo3: "" },
  });

  const [newImages, setNewImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  /* --------------------------------------------------
     PREVIEWS (derivados, NO state)
  -------------------------------------------------- */
  const previews = useMemo(() => {
    return newImages.map((file) => URL.createObjectURL(file));
  }, [newImages]);

  /* Liberar memoria */
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  /* --------------------------------------------------
     Cargar contenido inicial
  -------------------------------------------------- */
  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => console.log("No hay contenido previo"));
  }, []);

  /* --------------------------------------------------
     Guardar secciones
  -------------------------------------------------- */
  const handleSaveHero = async () => {
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    alert("Hero guardado!");
  };

  const handleSaveServicios = async () => {
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    alert("Servicios guardados!");
  };

  const handleSaveSobreMi = async () => {
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    alert("Sobre Mi guardado!");
  };

  /* --------------------------------------------------
     Handlers de cambios
  -------------------------------------------------- */
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent({
      ...content,
      hero: { ...content.hero, [e.target.name]: e.target.value },
    });
  };

  const handleServicioChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const servicios = [...content.servicios];
    servicios[index][field as keyof Servicio] = value;
    setContent({ ...content, servicios });
  };

  const handleSobreMiChange = (field: keyof SobreMiContent, value: string) => {
    setContent({
      ...content,
      sobreMi: { ...content.sobreMi, [field]: value },
    });
  };

  /* --------------------------------------------------
     Subida de imágenes (Cloudinary)
  -------------------------------------------------- */
  const handleUploadImages = async () => {
    if (newImages.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const image of newImages) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "nutricionxsofia");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkzmrfgus/image/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();
      uploadedUrls.push(data.secure_url);
    }

    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        imagenes: [...prev.hero.imagenes, ...uploadedUrls],
      },
    }));

    setNewImages([]);
    setUploading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8 bg-[#EEEFE7]">
      {/* HERO */}
      <section className="p-4 rounded-md bg-[#DEDFD8]">
        <h2 className="text-2xl font-bold mb-4">Sección Hero</h2>

        <input
          name="titulo"
          value={content.hero.titulo}
          onChange={handleHeroChange}
          placeholder="Título"
          className="w-full mb-2 p-3 rounded-lg border outline-none"
        />

        <input
          name="subtitulo"
          value={content.hero.subtitulo}
          onChange={handleHeroChange}
          placeholder="Subtítulo"
          className="w-full mb-2 p-3 rounded-lg border outline-none"
        />

        <input
          type="file"
          multiple
          onChange={(e) => setNewImages(Array.from(e.target.files || []))}
          className="mb-2"
        />

        <button
          onClick={handleUploadImages}
          disabled={uploading || newImages.length === 0}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          {uploading ? "Subiendo..." : "Guardar imágenes"}
        </button>

        {/* PREVIEWS */}
        <div className="flex flex-wrap gap-2 mt-2">
          {previews.map((url, i) => (
            <img key={i} src={url} className="w-24 h-24 object-cover rounded" />
          ))}
        </div>

        {/* IMÁGENES GUARDADAS */}
        <div className="flex flex-wrap gap-2 mt-2">
          {content.hero.imagenes.map((img, i) => (
            <img key={i} src={img} className="w-24 h-24 object-cover rounded" />
          ))}
        </div>

        <button
          onClick={handleSaveHero}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Guardar Hero
        </button>
      </section>

      {/* El resto de secciones (Servicios / Sobre Mi) quedan igual */}
    </div>
  );
}
