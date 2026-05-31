import { create } from "zustand";
import type { GameEvent } from "dragonspeak";
import { gameReducer } from "dragonspeak";
import { initialGameState, type GameState } from "dragonspeak";
import {
  questSocket,
  type ConnectionStatus,
} from "dragonspeak";

type GameStore = {
  game: GameState;
  connectionStatus: ConnectionStatus;
  latency: number;
  bufferedEvents: GameEvent[];
  eventBufferSize: number;
  onlineTicks: string[];
  dispatchGameEvent: (event: GameEvent) => void;
  startQuest: () => void;
  answer: (answerId: string) => void;
  reconnect: () => void;
  reset: () => void;
};

let flushTimer: number | null = null;

const flushBufferedEvents = (
  set: (partial: Partial<GameStore> | ((state: GameStore) => Partial<GameStore>)) => void,
) => {
  flushTimer = null;
  set((state) => {
    const nextGame = state.bufferedEvents.reduce(gameReducer, state.game);
    return {
      game: nextGame,
      bufferedEvents: [],
      eventBufferSize: 0,
    };
  });
};

export const useGameStore = create<GameStore>((set, get) => {
  questSocket.onEvent((event) => {
    set((state) => ({
      bufferedEvents: [...state.bufferedEvents, event],
      eventBufferSize: state.eventBufferSize + 1,
    }));

    if (flushTimer === null) {
      flushTimer = window.setTimeout(() => flushBufferedEvents(set), 120);
    }
  });

  questSocket.onStatus((connectionStatus) => set({ connectionStatus }));
  questSocket.onLatency((latency) => set({ latency }));

  window.addEventListener("dragonspeak:online-tick", (event) => {
    const message = event instanceof CustomEvent ? String(event.detail) : "Realtime demo event";
    set((state) => ({ onlineTicks: [message, ...state.onlineTicks].slice(0, 4) }));
  });

  return {
    game: initialGameState,
    connectionStatus: "disconnected",
    latency: 0,
    bufferedEvents: [],
    eventBufferSize: 0,
    onlineTicks: [],
    dispatchGameEvent: (event) => set((state) => ({ game: gameReducer(state.game, event) })),
    startQuest: () => {
      if (get().connectionStatus === "connected" || get().connectionStatus === "connecting") {
        return;
      }
      questSocket.connect();
    },
    answer: (answerId) => questSocket.sendAnswer(answerId),
    reconnect: () => questSocket.simulateReconnect(),
    reset: () => {
      questSocket.disconnect();
      set({
        game: initialGameState,
        bufferedEvents: [],
        eventBufferSize: 0,
        onlineTicks: [],
      });
    },
  };
});
