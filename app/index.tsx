import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay } from "@rneui/themed";
import { Button } from "@rneui/base";
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";

const BottomDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [overlayType, setOverlayType] = useState<"signin" | "signup">("signin");

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>✨ Welcome to Let's Chat! ✨</Text>
      <Text style={styles.text2}>
        Where every conversation is a chance to connect, share and grow.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Signin"
          buttonStyle={styles.button}
          onPress={() => {
            setOverlayType("signin");
            setVisible(true);
          }}
        />
        <Button
          title="Signup"
          buttonStyle={styles.button}
          onPress={() => {
            setOverlayType("signup");
            setVisible(true);
          }}
        />
      </View>
      {/* Bottom Drawer */}
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={styles.drawer}
      >
        <View style={styles.content}>
          {overlayType === "signin" ? (
            <Signin handleOverlayVisibility={(val) => setVisible(val)} />
          ) : (
            <Signup handleOverlayVisibility={(val) => setVisible(val)} />
          )}
        </View>
      </Overlay>
    </View>
  );
};

export default BottomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  drawer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  content: {
    alignItems: "center",
  },

  button: {
    marginVertical: 12,
    textAlign: "center",
  },

  text1: {
    marginVertical: 12,
    fontSize: 24,
    fontWeight: 800,
    textAlign: "center",
  },

  text2: {
    marginVertical: 12,
    fontSize: 18,
    fontWeight: 800,
    textAlign: "center",
  },
});
