import { useEffect, useState } from "react";
import Card from "./Card";

interface CardType {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
}

const symbols = ["🍎", "🍌", "🍒", "🍇", "🍊", "🍓"];

function shuffleArray(array: any[]) {
  return array
    .map((item) => ({ sort: Math.random(), value: item }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

export default function Game() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [disabled, setDisabled] = useState(false);

  // Inicializar juego
  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const doubled = [...symbols, ...symbols];
    const shuffled = shuffleArray(doubled);
    const initialCards = shuffled.map((symbol, index) => ({
      id: index,
      symbol,
      flipped: false,
      matched: false,
    }));
    setCards(initialCards);
    setFlippedCards([]);
  };

  const handleFlip = (card: CardType) => {
    if (disabled) return;
    if (card.flipped || card.matched) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, { ...card, flipped: true }];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setTimeout(() => checkMatch(newFlipped), 1000);
    }
  };

  const checkMatch = (flipped: CardType[]) => {
    const [first, second] = flipped;
    let newCards;

    if (first.symbol === second.symbol) {
      newCards = cards.map((c) =>
        c.symbol === first.symbol ? { ...c, matched: true } : c
      );
    } else {
      newCards = cards.map((c) =>
        flipped.some((f) => f.id === c.id) ? { ...c, flipped: false } : c
      );
    }

    setCards(newCards);
    setFlippedCards([]);
    setDisabled(false);
  };

  return (
    <div
      className="p-6 rounded-2xl shadow-xl
            bg-white/70 backdrop-blur-md border border-white/20
            text-white flex flex-col gap-4 items-center h-full"
    >
      <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-t from-purple-400 to-purple-500 bg-clip-text text-transparent">
        Memory Game
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id} card={card} onFlip={() => handleFlip(card)} />
        ))}
      </div>

      <button
        id="restart-game-button"
        onClick={startGame}
        className="px-4 py-2 mx-auto w-40 rounded-xl bg-gradient-to-t from-teal-400 to-teal-600 text-white shadow-md hover:scale-105 transition-transform"
      >
        Restart
      </button>
    </div>
  );
}
