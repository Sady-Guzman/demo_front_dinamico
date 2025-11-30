import React, { useState } from "react";

export default function SubirVideo() {
  const [form, setForm] = useState({
    nombre_completo: "",
    nivel_estudiante: "",
    url_video: ""
  });

  async function enviar() {
    try {
      const res = await fetch("/api/subir-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const json = await res.json();
      alert(JSON.stringify(json, null, 2));
    } catch (e) {
      alert("Error enviando data: " + e.message);
    }
  }

  return (
    <div className="p-6 flex flex-col gap-4 max-w-md mx-auto">
      <input
        className="border p-2"
        placeholder="Nombre completo"
        onChange={e => setForm({ ...form, nombre_completo: e.target.value })}
      />

      <input
        className="border p-2"
        placeholder="Nivel estudiante"
        onChange={e => setForm({ ...form, nivel_estudiante: e.target.value })}
      />

      <input
        className="border p-2"
        placeholder="URL del video"
        onChange={e => setForm({ ...form, url_video: e.target.value })}
      />

      <button onClick={enviar} className="bg-blue-600 text-white p-2">
        Subir
      </button>

      <a
        href="/videos"
        className="underline text-blue-600 block mt-4 text-center"
      >
        Ver videos subidos
      </a>
    </div>
  );
}
