import { Avatar, Image } from "@rneui/base";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

const Message = ({
  messageId,
  messageType,
  message,
  sentByUser,
}: {
  messageId: string;
  messageType: string;
  message: string;
  sentByUser: boolean;
}) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: sentByUser ? "flex-end" : "flex-start",
        justifyContent: "center",
      }}
    >
      <View
        style={[
          styles.tooltip,
          sentByUser ? styles.tooltipSender : styles.tooltipReceiver,
        ]}
      >
        <Text style={styles.messageText}>{message}</Text>
        {messageType === "image" && (
          <Image
            source={{
              uri: message,
            }}
            containerStyle={{ width: 100, height: 100 }}
          />
        )}
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  container: {
    maxWidth: "75%",
    marginVertical: 4,
  },
  tooltip: {
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    position: "relative",
  },
  tooltipSender: {
    backgroundColor: "rgba(32, 137, 220, 1.00)",
    alignSelf: "flex-end",
  },
  tooltipReceiver: {
    backgroundColor: "rgb(132, 168, 197)",
    alignSelf: "flex-start",
  },
});
