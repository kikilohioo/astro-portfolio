import { useEffect, useState } from "react";

interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<ScoreEntry[]>([]);

  // 🔹 Datos de prueba
  const mockData: ScoreEntry[] = [
    { name: "Caiqui", score: 120, date: "31/08/2025" },
    { name: "Alice", score: 100, date: "30/08/2025" },
    { name: "Bob", score: 80, date: "29/08/2025" },
  ];

  // 🔹 Cargar datos de LocalStorage o inicializar con mockData
  useEffect(() => {
    const saved = localStorage.getItem("leaderboard");
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    } else {
      localStorage.setItem("leaderboard", JSON.stringify(mockData));
      setLeaderboard(mockData);
    }
  }, []);

  return (
    <div className="p-6 rounded-2xl shadow-xl
              bg-white/10 backdrop-blur-md border border-white/20
              text-white flex flex-col gap-4 items-center h-full">
      
      <h2 className="text-2xl font-bold tracking-wide text-center 
        bg-gradient-to-r from-yellow-400 to-teal-100 bg-clip-text text-transparent mb-4">
        🥇 Leaderboard
      </h2>

      <ul className="flex flex-col gap-3 w-full">
        {leaderboard
          .sort((a, b) => b.score - a.score) // Ordenar descendente
          .slice(0, 5) // Solo top 5
          .map((entry, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 rounded-xl
              bg-white/10 border border-white/10 shadow-sm w-full"
          >
            <div className="flex gap-2 items-center">
              <span className="text-lg font-bold text-yellow-300">
                #{index + 1}
              </span>
              <span className="font-semibold">{entry.name}</span>
            </div>
            <div className="text-right">
              <p className="font-bold">{entry.score} pts</p>
              <p className="text-xs opacity-70">{entry.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
