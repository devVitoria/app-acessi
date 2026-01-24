import { User, UserStore } from "@/components/interface";
import { create } from "zustand";
import storage from "./index";

const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: async (user: User) => {
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
