import { AddUserResponse, ChatsResponse } from "@/type";
import { APIRoutes, letsChatBEBaseURL } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const useChats = ({
  senderPhoneNumber,
  receiverPhoneNumber,
}: {
  senderPhoneNumber: string;
  receiverPhoneNumber: string;
}) => {
  return useQuery<ChatsResponse>({
    queryKey: [APIRoutes.GET_CHATS],
    queryFn: async (): Promise<ChatsResponse> => {
      const res = await fetch(
        `${letsChatBEBaseURL}${APIRoutes.GET_CHATS}?senderPhoneNumber=${senderPhoneNumber}&receiverPhoneNumber=${receiverPhoneNumber}`
      );

      return await res.json();
    },
    staleTime: Infinity,
  });
};

export default useChats;
