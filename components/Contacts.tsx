import React from "react";
import { Avatar, ListItem } from "@rneui/base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Contacts = () => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/[userId]", params: { userId: "test" } })
      }
    >
      <ListItem style={styles.container} bottomDivider>
        <Avatar
          rounded
          source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <ListItem.Content>
          <ListItem.Title style={styles.nameText}>John Doe</ListItem.Title>
          <ListItem.Subtitle style={styles.messageText}>
            President
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
