// app/contenido/page.tsx
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

const emptyServicio: Servicio = {
  titulo: "",
  descripcion: "",
  incluye1: "",
  incluye2: "",
  ubicacion: "",
  nota: "",
  duracion: "",
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
    servicios: [
      { ...emptyServicio },
      { ...emptyServicio },
      { ...emptyServicio },
      { ...emptyServicio },
    ],
    sobreMi: { parrafo1: "", parrafo2: "", parrafo3: "" },
  });

  const [newImages, setNewImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  /**
   * ✅ PREVIEWS derivadas (NO estado)
   */
  const previews = useMemo(() => {
    const urls = newImages.map((file) => URL.createObjectURL(file));
    return urls;
  }, [newImages]);

  /**
   * ✅ Cleanup para evitar memory leaks
   */
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

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

  const handleAddServicio = () => {
    setContent((prev) => ({
      ...prev,
      servicios: [...prev.servicios, { ...emptyServicio }],
    }));
  };

  const handleRemoveServicio = (index: number) => {
    setContent((prev) => ({
      ...prev,
      servicios: prev.servicios.filter((_, i) => i !== index),
    }));
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
    value: string,
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
        "https://api.cloudinary.com/v1_1/dkzmrfgus/image/upload",
        { method: "POST", body: formData },
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
          className="mb-3 block w-full text-sm text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100
          cursor-pointer"
        />

        <button
          onClick={handleUploadImages}
          disabled={uploading || newImages.length === 0}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
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
            className="mb-4 p-4 border rounded-lg bg-white flex flex-col sm:flex-row sm:flex-wrap gap-2 shadow-sm"
          >
            <div className="flex justify-between w-full items-center mb-2">
              <p className="font-semibold text-lg">Plan {index + 1}</p>

              <button
                onClick={() => handleRemoveServicio(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Eliminar
              </button>
            </div>

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

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAddServicio}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
          >
            + Agregar plan
          </button>

          <button
            onClick={handleSaveServicios}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:shadow-lg transition cursor-pointer"
          >
            Guardar Servicios
          </button>
        </div>
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
          ),
        )}
        <button
          onClick={handleSaveSobreMi}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-700"
        >
          Guardar Sobre Mi
        </button>
      </section>
    </div>
  );
}
