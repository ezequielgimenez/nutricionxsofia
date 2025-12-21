// app/contenido/page.tsx
"use client";

import { useState, useEffect } from "react";

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
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    setPreviews(newImages.map((file) => URL.createObjectURL(file)));
  }, [newImages]);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => console.log("No hay contenido previo"));
  }, []);

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
    setContent({ ...content, sobreMi: { ...content.sobreMi, [field]: value } });
  };

  const handleUploadImages = async () => {
    if (newImages.length === 0) return;
    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const image of newImages) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "nutricionxsofia");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dkzmrfgus/image/upload`,
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
    setPreviews([]);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8 bg-[#EEEFE7]">
      {/* Hero */}
      <section className="p-4 rounded-md bg-[#DEDFD8]">
        <h2 className="text-2xl font-bold mb-4">Sección Hero</h2>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={content.hero.titulo}
          onChange={handleHeroChange}
          className="w-full mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
        />
        <input
          type="text"
          name="subtitulo"
          placeholder="Subtítulo"
          value={content.hero.subtitulo}
          onChange={handleHeroChange}
          className="w-full mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
        />

        {/* Subir nuevas imágenes */}
        <div className="mb-2 flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="file"
            multiple
            onChange={(e) => setNewImages(Array.from(e.target.files || []))}
            className="border rounded-lg p-2 border-[#d1b281] cursor-pointer"
          />
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
            onClick={handleUploadImages}
            disabled={uploading || newImages.length === 0}
          >
            {uploading ? "Subiendo..." : "Guardar imágenes"}
          </button>
          <button
            onClick={() =>
              setContent((prev) => ({
                ...prev,
                hero: { ...prev.hero, imagenes: [] },
              }))
            }
            className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
          >
            Eliminar todas las imágenes cargadas
          </button>
        </div>

        {/* Preview */}
        <div className="flex flex-wrap gap-2 mb-2">
          {previews.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Preview ${i}`}
              className="w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 object-cover rounded"
            />
          ))}
        </div>

        {/* Imágenes guardadas */}
        <div className="flex flex-wrap gap-2 mb-2">
          {content.hero.imagenes.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Hero ${i}`}
              className="w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 object-cover rounded"
            />
          ))}
        </div>

        <button
          onClick={handleSaveHero}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
        >
          Guardar Hero
        </button>
      </section>

      {/* Servicios */}
      <section className="p-4 rounded-md bg-[#DEDFD8]">
        <h2 className="text-2xl font-bold mb-4">Sección Servicios</h2>
        {content.servicios.map((serv, index) => (
          <div
            key={index}
            className="mb-4 p-2 border rounded bg-[#DEDFD8] flex flex-col sm:flex-row sm:flex-wrap gap-2"
          >
            <p className="w-full sm:w-auto pt-3">Plan {index + 1}</p>
            <input
              type="text"
              placeholder="Título"
              value={serv.titulo}
              onChange={(e) =>
                handleServicioChange(index, "titulo", e.target.value)
              }
              className="w-full sm:w-[48%] mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
            />
            <textarea
              placeholder="Descripción"
              value={serv.descripcion}
              onChange={(e) =>
                handleServicioChange(index, "descripcion", e.target.value)
              }
              className="w-full mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
            />
            <input
              type="text"
              placeholder="Incluye 1"
              value={serv.incluye1}
              onChange={(e) =>
                handleServicioChange(index, "incluye1", e.target.value)
              }
              className="w-full sm:w-[48%] mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
            />
            <input
              type="text"
              placeholder="Incluye 2"
              value={serv.incluye2}
              onChange={(e) =>
                handleServicioChange(index, "incluye2", e.target.value)
              }
              className="w-full sm:w-[48%] mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
            />
            <input
              type="text"
              placeholder="Ubicación o lugar donde se realiza (opcional)"
              value={serv.ubicacion}
              onChange={(e) =>
                handleServicioChange(index, "ubicacion", e.target.value)
              }
              className="w-full mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
            />
            <input
              type="text"
              placeholder="Nota"
              value={serv.nota}
              onChange={(e) =>
                handleServicioChange(index, "nota", e.target.value)
              }
              className="w-full sm:w-[48%] mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
            />
            <input
              type="text"
              placeholder="Duración"
              value={serv.duracion}
              onChange={(e) =>
                handleServicioChange(index, "duracion", e.target.value)
              }
              className="w-full sm:w-[48%] mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
            />
          </div>
        ))}
        <button
          onClick={handleSaveServicios}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
        >
          Guardar Servicios
        </button>
      </section>

      {/* Sobre Mi */}
      <section className="p-4 rounded-md bg-[#DEDFD8]">
        <h2 className="text-2xl font-bold mb-4">Sección Sobre Mi</h2>
        {(["parrafo1", "parrafo2", "parrafo3"] as (keyof SobreMiContent)[]).map(
          (p, i) => (
            <textarea
              key={i}
              placeholder={`Párrafo ${i + 1}`}
              value={content.sobreMi[p]}
              onChange={(e) => handleSobreMiChange(p, e.target.value)}
              className="w-full mb-2 p-3 rounded-lg border border-[#b0aaaa] outline-none focus:ring-2 focus:ring-[#A6A6A6]"
            />
          )
        )}
        <button
          onClick={handleSaveSobreMi}
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded cursor-pointer"
        >
          Guardar Sobre Mi
        </button>
      </section>
    </div>
  );
}
