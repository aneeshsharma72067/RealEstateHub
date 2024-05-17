import { create } from "zustand";
import { User } from "../@types/schemaType";

type UserStore = {
  currentUser: User | null;
  updateUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  updateUser: (user: User) => set((state) => ({ currentUser: user })),
}));
