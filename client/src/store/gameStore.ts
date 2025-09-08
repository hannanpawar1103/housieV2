import { create } from "zustand";

type ChatMessage = {
  name: string;
  message: string;
};

type GameState = {
  username: string;
  roomCode: string;
  users: string[];
  roomOwner: string;
  ticket: number[];
  chat: ChatMessage[];
  randomNumbers: number[];
  currentNumber: number | null;
  isGameScreenVisible: boolean;

  // Actions
  setUsername: (name: string) => void;
  setRoomCode: (code: string) => void;
  setUsers: (users: string[]) => void;
  setRoomOwner: (owner: string) => void;
  setTicket: (ticket: number[]) => void;
  addChatMessage: (msg: ChatMessage) => void;
  addRandomNumber: (num: number) => void;
  setCurrentNumber: (num: number | null) => void;
  setGameScreenVisible: (visible: boolean) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  // Default State
  username: "",
  roomCode: "",
  users: [],
  roomOwner: "",
  ticket: [],
  chat: [],
  randomNumbers: [],
  currentNumber: null,
  isGameScreenVisible: false,

  // Actions
  setUsername: (name: string) => set({ username: name }),
  setRoomCode: (code: string) => set({ roomCode: code }), // ✅ fixed casing
  setUsers: (users: string[]) => set({ users }),
  setRoomOwner: (owner: string) => set({ roomOwner: owner }),
  setTicket: (ticket: number[]) => set({ ticket }),

  addChatMessage: (msg: ChatMessage) =>
    set((state) => ({
      chat: [...state.chat, msg],
    })),

  addRandomNumber: (num: number) =>
    set((state) => ({
      randomNumbers: [...state.randomNumbers, num],
      currentNumber: num,
    })),

  setCurrentNumber: (num: number | null) => set({ currentNumber: num }),
  setGameScreenVisible: (visible: boolean) =>
    set({ isGameScreenVisible: visible }),

  resetGame: () =>
    set({
      users: [],
      roomOwner: "", // ✅ fixed typo
      ticket: [],
      chat: [],
      randomNumbers: [],
      currentNumber: null,
      isGameScreenVisible: false,
    }),
}));
