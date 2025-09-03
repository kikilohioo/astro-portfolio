import { useEffect, useState } from "react";

interface Score {
  currentScore: number;
  bestScore: number;
  level: number;
}

export default function Score() {
  const [score, setScore] = useState<Score>({
    currentScore: 0,
    bestScore: 0,
    level: 1,
  });

  // 🔹 Cargar mejor puntaje desde LocalStorage
  useEffect(() => {
    const savedBest = localStorage.getItem("bestScore");
    setScore((prev) => ({
      ...prev,
      bestScore: savedBest ? parseInt(savedBest) : 0,
    }));
  }, []);

  // 🔹 Actualizar puntaje
  const updateScore = (points: number) => {
    setScore((prev) => {
      const newScore = { ...prev, currentScore: prev.currentScore + points };

      if (newScore.currentScore > prev.bestScore) {
        newScore.bestScore = newScore.currentScore;
        localStorage.setItem("bestScore", String(newScore.bestScore));
      }

      return newScore;
    });
  };

  // 🔹 Reiniciar puntaje
  const resetScore = () => {
    setScore((prev) => ({ ...prev, currentScore: 0 }));
  };

  return (
    <div
      className="p-6 rounded-2xl shadow-xl
    bg-white/20 backdrop-blur-md border border-white/20
    text-white flex flex-col gap-4 items-center h-full"
    >
      <h2 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-pink-700 to-purple-600 bg-clip-text text-transparent">
        🏆 Scoreboard
      </h2>

      <div className="grid grid-cols-3 gap-6 text-center w-full">
        <div>
          <p className="text-sm uppercase opacity-80">Current</p>
          <p className="text-xl font-semibold">{score.currentScore}</p>
        </div>
        <div>
          <p className="text-sm uppercase opacity-80">Level</p>
          <p className="text-xl font-semibold">{score.level}</p>
        </div>
        <div>
          <p className="text-sm uppercase opacity-80">Best</p>
          <p className="text-xl font-semibold">{score.bestScore}</p>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => updateScore(10)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:scale-105 transition-transform"
        >
          +10 pts
        </button>
        <button
          onClick={resetScore}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md hover:scale-105 transition-transform"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
