import { MessagesType } from "@/type";
import { create } from "zustand";

export type ChatState = {
  messages: MessagesType[];
};

export type Actions = {
  addNewMessage: (newMessage: MessagesType) => void;
  setMessages: (messages: MessagesType[]) => void;
};

export const useChatStore = create<ChatState & Actions>((set) => ({
  messages: [],
  addNewMessage: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
  setMessages: (messages) => set(() => ({ messages })),
}));
