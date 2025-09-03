import { motion } from "framer-motion";

interface CardProps {
  card: {
    id: number;
    symbol: string;
    flipped: boolean;
    matched: boolean;
  };
  onFlip: () => void;
}

export default function Card({ card, onFlip }: CardProps) {
  return (
    <motion.div
      className={`w-20 h-28 text-5xl flex items-center justify-center rounded-xl shadow-md cursor-pointer select-none text-2xl font-bold
        ${card.flipped || card.matched ? "bg-white text-black" : "bg-blue-500 text-transparent"}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onFlip}
    >
      {card.symbol}
    </motion.div>
  );
}
