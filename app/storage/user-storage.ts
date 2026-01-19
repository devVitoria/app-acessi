import { create } from "zustand";
import storage from "./mmkv";

type User = {
  userId: number;
  name: string;
  email: string;
  cpf: string;
  createdAt: string;
  validated: boolean;
  exp: number;
  iat: number;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => Promise<void>;
  loadUser: () => Promise<void>;
  clearUser: () => Promise<void>;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: async (user: User) => {
    console.log("Storing user:", user);
    await storage.set("user", user);
    set({ user });
  },

  loadUser: async () => {
    const user = await storage.get<User>("user");
    set({ user });
  },

  clearUser: async () => {
    await storage.remove("user");
    set({ user: null });
  },
}));

export default useUserStore;
