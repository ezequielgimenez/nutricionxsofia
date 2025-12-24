"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // estados controlados para los inputs
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [motivo, setMotivo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError(false);

    const data = { nombre, email, motivo, mensaje };

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        setError(false);
        // limpiar inputs
        setNombre("");
        setEmail("");
        setMotivo("");
        setMensaje("");
      } else {
        setError(true);
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#DEDFD8] rounded-2xl p-6 w-full max-w-md"
    >
      <div className="flex flex-col gap-4">
        <label className="font-sans text-[#A6A6A6] text-[14px]">Nombre</label>
        <input
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          placeholder="Tu nombre"
          className="bg-white border font-sans text-[#6B7280] border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[#c9c0c0]"
        />

        <label className="font-sans text-[#A6A6A6] text-[14px]">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="tu@email.com"
          className="bg-white border font-sans text-[#6B7280] border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[#c9c0c0]"
        />

        <label className="font-sans text-[#A6A6A6] text-[14px]">
          Motivo de consulta
        </label>
        <select
          name="motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          required
          className="bg-white border font-sans text-[#6B7280] border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[#c9c0c0]"
        >
          <option value="">Motivo de consulta</option>
          <option value="Asesoría online">Asesoría online</option>
          <option value="Consulta online">Consulta online</option>
          <option value="Consulta presencial">Consulta presencial</option>
          <option value="Antropometria">Antropometria</option>
          <option value="Otro">Otro</option>
        </select>

        <label className="font-sans text-[#A6A6A6] text-[14px]">Mensaje</label>
        <textarea
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          rows={4}
          placeholder="¿Como puedo ayudarte?"
          className="bg-white border font-sans text-[#6B7280] border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-[#c9c0c0]"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#A6A6A6] text-white py-3 rounded-md font-medium hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Enviando..." : "Enviar mensaje"}
        </button>

        {success && (
          <p className="text-green-600 text-sm text-center">
            Mensaje enviado correctamente ✔
          </p>
        )}

        {error && (
          <p className="text-red-600 text-sm text-center">
            Ocurrió un error. Intentá nuevamente.
          </p>
        )}
      </div>
    </form>
  );
}
