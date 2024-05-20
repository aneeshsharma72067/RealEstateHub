import { create } from "zustand";
import { Owner, User } from "../@types/schemaType";

type UserStore = {
  currentUser: User | null;
  userDataIsLoading: boolean;
  updateUser: (user: User) => void;
  logoutUser: () => void;
};

type OwnerStore = {
  currentOwner: Owner | null;
  setOwner: (owner: Owner) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  userDataIsLoading: true,
  updateUser: (user: User) => set(() => ({ currentUser: user })),
  logoutUser: () => set(() => ({ currentUser: null })),
}));

export const useOwnerStore = create<OwnerStore>((set) => ({
  currentOwner: null,
  setOwner: (owner: Owner) => set(() => ({ currentOwner: owner })),
}));
