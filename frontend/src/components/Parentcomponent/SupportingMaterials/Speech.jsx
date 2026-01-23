import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function LearningTab({ childId }) {
  const [materials, setMaterials] = useState([]);
  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    async function fetchMaterials() {
      const { data, error } = await supabase
        .from("learning_materials")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching learning materials:", error);
      } else {
        setMaterials(data);
      }
    }

    fetchMaterials();
  }, []);

  const playAudio = (url, id) => {
    const audio = new Audio(url);
    audio.play();
    setPlayingId(id);
    audio.onended = () => setPlayingId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Learn to Say Words</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {materials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4 text-center cursor-pointer hover:bg-blue-50"
            onClick={() => playAudio(item.audio_url, item.id)}
          >
            <img
              src={item.image_url}
              alt={item.word}
              className="w-full h-32 object-contain mb-2"
            />
            <p className="font-semibold text-lg">{item.word}</p>
            {playingId === item.id && (
              <p className="text-sm text-green-600 mt-1">🔊 Playing...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
