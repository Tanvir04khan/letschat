import useContacts from "@/hooks/useContacts";
import { useChatStore } from "@/store/useChatStore";
import useUserStatusStore from "@/store/userStatusStore";
import { UserType } from "@/type";
import { useQuery } from "@tanstack/react-query";

import React, { ReactNode, useEffect } from "react";
import { View } from "react-native";
import { Socket } from "socket.io-client";

const SocketIOProvider = ({
  children,
  socket,
}: {
  children: ReactNode;
  socket: Socket;
}) => {
  const addOnlineUser = useUserStatusStore((state) => state.addOnlineUser);

  const removeOnlineUser = useUserStatusStore(
    (state) => state.removeOnlineUser
  );

  const addNewChatsAvailableFrom = useUserStatusStore(
    (state) => state.addNewChatsAvailableFrom
  );

  const chattingWith = useUserStatusStore((state) => state.chattingWith);

  const addNewMessage = useChatStore((state) => state.addNewMessage);

  const { data: userDetails } = useQuery<UserType | null>({
    queryKey: ["userDetails"],
  });

  const { data: mobileContacts } = useContacts();

  useEffect(() => {
    if (userDetails && userDetails.userId) {
      socket.on(
        "update-user-status",
        ({
          phoneNumber,
          status,
        }: {
          phoneNumber: string;
          status: "Online" | "Offline";
        }) => {
          console.log(phoneNumber, status);
          if (
            mobileContacts?.some(
              (contact) => contact.phoneNumber === phoneNumber
            ) &&
            status === "Online"
          ) {
            addOnlineUser(phoneNumber);
          }
          if (
            mobileContacts?.some(
              (contact) => contact.phoneNumber === phoneNumber
            ) &&
            status === "Offline"
          ) {
            removeOnlineUser(phoneNumber);
          }
        }
      );

      socket.on(
        "receive-message",
        ({
          messageId,
          senderPhoneNumber,
          receiverPhoneNumber,
          message,
          messageType,
          sentOn,
        }: {
          messageId: string;
          senderPhoneNumber: string;
          receiverPhoneNumber: string;
          message: string;
          messageType: "text" | "photo";
          sentOn: string;
        }) => {
          if (chattingWith?.phoneNumber !== senderPhoneNumber) {
            addNewChatsAvailableFrom(senderPhoneNumber);
          } else {
            addNewMessage({
              messageId,
              message,
              sentBy: senderPhoneNumber,
              receivedBy: receiverPhoneNumber,
              messageType,
              sentOn,
            });
          }
        }
      );
    }
  }, [userDetails, socket, mobileContacts, chattingWith]);

  return <View style={{ flex: 1 }}>{children}</View>;
};

export default SocketIOProvider;
