import Message from "@/components/Message";
import { Feather } from "@expo/vector-icons";
import { Button, Icon, Input, Text } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import useUserStatusStore from "@/store/userStatusStore";
import useUserDetails from "@/hooks/useUserDetails";
import useChats from "@/hooks/useChats";
import { useChatStore } from "@/store/useChatStore";
import { socket } from "./_layout";

const Chat = () => {
  const { receiverPhoneNumber }: { receiverPhoneNumber: string } =
    useLocalSearchParams();
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const addNewMessage = useChatStore((state) => state.addNewMessage);

  const { data: userDetails } = useUserDetails();

  const { data: chats, refetch: refetchChats } = useChats({
    senderPhoneNumber: userDetails?.phoneNumber ?? "",
    receiverPhoneNumber,
  });

  const addOnlineUsers = useUserStatusStore((state) => state.addOnlineUser);

  const onPressCamera = async () => {
    router.push("/camera");
  };

  const sendMessageCallback = (message: string) => {
    if (message.includes("|")) {
    } else {
      setMessageError(message);
    }
  };

  const onPressSend = () => {
    addNewMessage({
      sentBy: userDetails?.phoneNumber ?? "",
      receivedBy: receiverPhoneNumber,
      messageType: "text",
      message,
      messageId: `${messages.length + 1}`,
      sentOn: new Date().toISOString(),
    });
    socket.emit(
      "send-message",
      userDetails?.phoneNumber,
      receiverPhoneNumber,
      "text",
      message,
      sendMessageCallback
    );
    setMessage("");
  };

  useEffect(() => {
    refetchChats();
    addOnlineUsers(
      chats?.data?.receiverStatus === "Online" ? receiverPhoneNumber : ""
    );
    setMessages(chats?.data?.chats ?? []);
  }, [chats, receiverPhoneNumber]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={isKeyboardVisible ? 110 : 0} // Adjust for status bar
    >
      <View style={styles.container}>
        {/* Messages */}
        <ScrollView
          contentContainerStyle={styles.messageContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.length ? (
            messages.map(({ messageId, messageType, message, sentBy }) => (
              <Message
                key={messageId}
                messageId={messageId}
                messageType={messageType}
                message={message}
                sentByUser={userDetails?.phoneNumber === sentBy}
              />
            ))
          ) : (
            <Text
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 50,
              }}
            >
              No messages.
            </Text>
          )}
        </ScrollView>

        {/* Input & Send Button */}
        <View style={styles.inputContainer}>
          <Input
            placeholder="Message"
            value={message}
            onChangeText={setMessage}
            onFocus={() => setIsKeyboardVisible(true)}
            containerStyle={{ flex: 1 }}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            rightIcon={
              <Feather
                onPress={onPressCamera}
                name="camera"
                size={24}
                color="#86939e"
              />
            }
            renderErrorMessage={!messageError ? false : true}
            errorMessage={messageError}
          />
          <Button
            buttonStyle={styles.sendButton}
            icon={<Icon color={"#fff"} name="send" />}
            onPress={onPressSend}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Prevents overlap with input field
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 5,
  },
  sendButton: {
    marginHorizontal: 10,
    width: 40,
    borderRadius: 20,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "rgb(240, 240, 240)",
  },
  inputStyle: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
