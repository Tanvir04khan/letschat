import React from "react";
import { Avatar, ListItem, Text } from "@rneui/base";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import useUserStatusStore from "@/store/userStatusStore";

const Contacts = ({
  phoneNumber,
  name,
}: {
  phoneNumber: string;
  name: string;
  status: "Online" | "Offline";
}) => {
  const updateChattingWith = useUserStatusStore(
    (state) => state.updateChattingWith
  );

  const newChatsAvailableFrom = useUserStatusStore(
    (state) => state.newChatsAvailableFrom
  );

  return (
    <TouchableOpacity
      onPress={() => {
        updateChattingWith({ phoneNumber, name });
        router.push({
          pathname: "/[receiverPhoneNumber]",
          params: { receiverPhoneNumber: phoneNumber },
        });
      }}
    >
      <ListItem style={styles.container} bottomDivider>
        <Avatar
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.nameText}>
            <Text>{name}</Text>
            {newChatsAvailableFrom.includes(phoneNumber) && (
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgb(32, 137, 220)",
                }}
              ></View>
            )}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.messageText}>
            {phoneNumber}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },

  nameText: {
    fontWeight: 800,
  },

  messageText: {
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.55)",
  },
});
