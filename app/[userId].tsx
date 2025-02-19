import Message from "@/components/Message";
import { Feather } from "@expo/vector-icons";
import { Button, Icon, Input } from "@rneui/base";
import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Fields,
  getContactsAsync,
  requestPermissionsAsync,
} from "expo-contacts";

const dummyMessages: {
  id: number;
  messageType: "text" | "image";
  message: string;
  sentByUser: boolean;
}[] = [
  { id: 1, messageType: "text", sentByUser: true, message: "Hi" },
  { id: 2, messageType: "text", sentByUser: false, message: "Hello" },
  { id: 3, messageType: "text", sentByUser: true, message: "Hi" },
  {
    id: 4,
    messageType: "image",
    sentByUser: false,
    message: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  { id: 5, messageType: "text", sentByUser: true, message: "wow..." },
  { id: 6, messageType: "text", sentByUser: true, message: "Nice." },
  { id: 7, messageType: "text", sentByUser: false, message: "Hi" },
];

const User = () => {
  const [message, setMessage] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const onPressCamera = async () => {
    const { status } = await Camera.getCameraPermissionsAsync();
    if (status === "granted") {
      router.push("/camera");
    }
  };

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
          {dummyMessages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
          {dummyMessages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
          {dummyMessages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
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
            renderErrorMessage={false}
          />
          <Button
            buttonStyle={styles.sendButton}
            icon={<Icon color={"#fff"} name="send" />}
            onPress={() => {}}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default User;

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
