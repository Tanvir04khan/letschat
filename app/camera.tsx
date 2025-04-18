import { Ionicons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { PixelRatio, StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";

const camera = () => {
  const [facing, setFacing] = useState<"back" | "front">("back");
  const cameraRef = useRef<CameraView | null>(null);

  const onCapturePic = async () => {
    if (cameraRef.current) {
      const newPath = `${
        FileSystem.cacheDirectory
      }${new Date().getTime()}-letsChatImage.jpg`;

      const result = await cameraRef.current.takePictureAsync();
      if (!result) return;
      await FileSystem.moveAsync({
        from: result.uri,
        to: newPath,
      });

      router.push({
        pathname: "/clickedPhoto/[clickedPhoto]",
        params: { clickedPhoto: newPath },
      });
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={onCapturePic}
          />
        </View>
        <View style={styles.switchButtonContainer}>
          <TouchableOpacity>
            <Ionicons
              onPress={() =>
                setFacing((ps) => (ps === "front" ? "back" : "front"))
              }
              name="camera-reverse-sharp"
              size={30}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: { flex: 1, width: "100%" },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
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
  captureButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
    alignSelf: "center",
  },
});
