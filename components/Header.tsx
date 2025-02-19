import React from "react";
import { Avatar, ListItem } from "@rneui/base";
import { StyleSheet, Text } from "react-native";

const Header = ({ path }: { path: string }) => {
  return (
    <>
      {path !== "[userId]" && <Text style={styles.headerText}>Let'sChat</Text>}
      {path === "[userId]" && (
        <ListItem>
          <Avatar
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/36.jpg",
            }}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.nameText}>John Doe</ListItem.Title>
            <ListItem.Subtitle style={styles.messageText}>
              President
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    paddingBottom: 45,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    zIndex: 100,
  },

  headerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    position: "fixed",
    top: 0,
    left: 0,
  },

  headerText: {
    fontSize: 24,
    fontWeight: 900,
    color: "rgb(32, 137, 220)",
  },

  nameText: {
    fontWeight: 800,
  },

  messageText: {
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.55)",
  },
});
