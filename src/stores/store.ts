import { create } from "zustand";
import { User } from "../@types/schemaType";

type UserStore = {
  currentUser: User | null;
  userDataIsLoading: boolean;
  updateUser: (user: User) => void;
  logoutUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  userDataIsLoading: true,
  updateUser: (user: User) => set((state) => ({ currentUser: user })),
  logoutUser: () => set((state) => ({ currentUser: null })),
}));
