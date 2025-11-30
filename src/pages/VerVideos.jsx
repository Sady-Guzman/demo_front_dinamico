import React, { useEffect, useState } from "react";

export default function VerVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchVideos() {
    try {
      const res = await fetch("/api/listar-videos");
      const json = await res.json();

      if (json.ok) {
        setVideos(json.data);
      }
    } catch (error) {
      console.error("Error cargando videos:", error);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Cargando videos...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Videos Subidos
      </h1>

      {videos.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay videos subidos aún.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {videos.map((v) => (
            <div
              key={v.id}
              className="border rounded-lg shadow p-4 bg-white"
            >
              <h2 className="text-xl font-semibold">{v.nombre_completo}</h2>
              <p className="text-gray-600">Nivel: {v.nivel_estudiante}</p>

              <div className="mt-4">
                <iframe
                  className="w-full aspect-video rounded"
                  src={v.url_video}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
