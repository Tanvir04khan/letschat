import { Button, Icon, Image } from "@rneui/base";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { socket } from "../_layout";
import useUserStatusStore from "@/store/userStatusStore";
import { useChatStore } from "@/store/useChatStore";

const clickedPhoto = () => {
  const { clickedPhoto } = useLocalSearchParams<{ clickedPhoto: string }>();

  const senderPhoneNumber = useUserStatusStore(
    (state) => state.userPhoneNumber
  );

  const addNewMessage = useChatStore((state) => state.addNewMessage);

  const receiver = useUserStatusStore((state) => state.chattingWith);

  const sendMessageCallback = (message: string) => {
    if (message.includes("|")) {
    } else {
    }
    console.log(message);
  };

  const onPressSendButton = async () => {
    const res = await fetch(clickedPhoto);
    const imageBuffer = await res.arrayBuffer();

    addNewMessage({
      sentBy: senderPhoneNumber ?? "",
      receivedBy: receiver?.phoneNumber ?? "",
      messageType: "image",
      message: clickedPhoto,
      messageId: clickedPhoto,
      sentOn: new Date().toISOString(),
    });

    socket.emit(
      "send-message",
      senderPhoneNumber,
      receiver?.phoneNumber,
      "image",
      {
        imageBuffer: Array.from(new Uint8Array(imageBuffer)),
        fileName: `${senderPhoneNumber}-${
          receiver?.phoneNumber
        }-${new Date().toISOString()}.jpg`,
      },
      sendMessageCallback
    );
    router.push({
      pathname: "/[receiverPhoneNumber]",
      params: { receiverPhoneNumber: receiver?.phoneNumber ?? "" },
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: clickedPhoto,
        }}
        style={{ flexGrow: 1, width: "100%", height: "100%" }}
        onError={(error) => console.log("Image Load Error:", error)}
      />
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={onPressSendButton}
          icon={<Icon name="send" />}
        />
      </View>
    </View>
  );
};

export default clickedPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  switchButtonContainer: {
    position: "absolute",
    top: 100,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
