import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: (theme: 'light' | 'dark') => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={() => onToggle(theme === 'light' ? 'dark' : 'light')}
      className="relative w-16 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full p-1 flex items-center transition-colors border border-black/5 dark:border-white/5"
    >
      <motion.div
        animate={{ x: theme === 'light' ? 0 : 32 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-6 h-6 bg-white dark:bg-zinc-900 rounded-full shadow-md flex items-center justify-center"
      >
        {theme === 'light' ? (
          <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
        ) : (
          <Moon className="w-4 h-4 text-blue-500 fill-blue-500/20" />
        )}
      </motion.div>
    </button>
  );
}
