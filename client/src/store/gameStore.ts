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
  ticket: number[][];
  chat: ChatMessage[];
  isGameScreenVisible: boolean;

  setUsername: (name: string) => void;
  setRoomCode: (code: string) => void;
  setUsers: (users: string[]) => void;
  setRoomOwner: (owner: string) => void;
  setTicket: (ticket: number[][]) => void;
  addChatMessage: (msg: ChatMessage) => void;
  setIsGameScreenVisible: (visible: boolean) => void;
  resetGame: () => void;
};

export const useGameStore = create<GameState>((set) => ({
  username: "",
  roomCode: "",
  users: [],
  roomOwner: "",
  ticket: [],
  chat: [],
  isGameScreenVisible: false,

  setUsername: (name) => set({ username: name }),
  setRoomCode: (code) => set({ roomCode: code }),
  setUsers: (users) => set({ users }),
  setRoomOwner: (owner) => set({ roomOwner: owner }),
  setTicket: (ticket) => set({ ticket }),
  addChatMessage: (msg) =>
    set((state) => ({ chat: [...state.chat, msg] })),
  setIsGameScreenVisible: (visible) => set({ isGameScreenVisible: visible }),
  resetGame: () =>
    set({
      username: "",
      roomCode: "",
      users: [],
      roomOwner: "",
      ticket: [],
      chat: [],
      isGameScreenVisible: false,
    }),
}));
