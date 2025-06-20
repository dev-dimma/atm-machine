import { create } from "zustand";
import { supabase } from "./supabase";

export const useAuthStore = create((set) => ({
  user: null,
  setUser: async (userData) => {
    if (userData) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userData.id)
        .single();
      if (error) {
        console.error("Error fetching user:", error);
        set({ user: null });
      } else {
        set({ user: data });
      }
    } else {
      set({ user: null });
    }
  },
  clearUser: () => {
    supabase.auth.signOut();
    set({ user: null });
  },
}));
