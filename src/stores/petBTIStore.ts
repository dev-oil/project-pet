// src/stores/petBTIStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { MBTILetter } from '../types/mbti';

interface PetBTIState {
  answers: MBTILetter[];
  addAnswer: (answer: MBTILetter) => void;
  resetAnswers: () => void;
  getMBTI: () => string;
}

export const usePetBTIStore = create<PetBTIState>()(
  persist(
    (set, get) => ({
      answers: [],
      addAnswer: (answer) =>
        set((state) => ({ answers: [...state.answers, answer] })),
      resetAnswers: () => set({ answers: [] }),
      getMBTI: () => {
        const scores: Record<MBTILetter, number> = {
          E: 0,
          I: 0,
          S: 0,
          N: 0,
          T: 0,
          F: 0,
          J: 0,
          P: 0,
        };

        get().answers.forEach((a) => scores[a]++);

        return (
          (scores.E >= scores.I ? 'E' : 'I') +
          (scores.S >= scores.N ? 'S' : 'N') +
          (scores.T >= scores.F ? 'T' : 'F') +
          (scores.J >= scores.P ? 'J' : 'P')
        );
      },
    }),
    {
      name: 'petBTI-storage', // localStorage에 저장될 key 이름
    }
  )
);
