import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useLogin = create((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false }),
}));

export const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();

      set({ users: data.users, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export const useDecisionStore = create(
  persist(
    (set, get) => ({
      accepted: [],
      rejected: [],
      addAccepted: (user) => set({ accepted: [...get().accepted, user] }),
      addRejected: (user) => set({ rejected: [...get().rejected, user] }),
    }),
    {
      name: "decision-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
