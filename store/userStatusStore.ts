import { create } from "zustand";

type State = {
  chattingWith: {
    name: string;
    phoneNumber: string;
  } | null;
  onlineUsers: string[];
  newChatsAvailableFrom: string[];
  userPhoneNumber: string;
};

type Action = {
  updateChattingWith: (user: State["chattingWith"]) => void;
  addOnlineUser: (newUser: string) => void;
  removeOnlineUser: (user: string) => void;
  addNewChatsAvailableFrom: (user: string) => void;
  removeNewChatsAvailableFrom: (user: string) => void;
  setUserPhoneNumber: (phoneNumber: string) => void;
};

const useUserStatusStore = create<State & Action>((set) => ({
  chattingWith: null,
  onlineUsers: [],
  newChatsAvailableFrom: [],
  userPhoneNumber: "",

  updateChattingWith: (user) => set(() => ({ chattingWith: user })),
  addOnlineUser: (newUser) =>
    set((state) => ({
      onlineUsers:
        !state.onlineUsers.includes(newUser) && newUser
          ? [...state.onlineUsers, newUser]
          : state.onlineUsers,
    })),
  removeOnlineUser: (user) =>
    set((state) => ({
      onlineUsers: state.onlineUsers.filter((stateUser) => user !== stateUser),
    })),

  addNewChatsAvailableFrom: (user) =>
    set((state) => ({
      newChatsAvailableFrom: [...state.newChatsAvailableFrom, user],
    })),

  removeNewChatsAvailableFrom: (user) =>
    set((state) => ({
      newChatsAvailableFrom: state.newChatsAvailableFrom.filter(
        (stateUser) => stateUser !== user
      ),
    })),
  setUserPhoneNumber: (phoneNumber) =>
    set(() => ({ userPhoneNumber: phoneNumber })),
}));

export default useUserStatusStore;
