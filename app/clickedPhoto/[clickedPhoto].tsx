import { Button, Icon, Image } from "@rneui/base";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const clickedPhoto = () => {
  const { clickedPhoto } = useLocalSearchParams();
  console.log(clickedPhoto);
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: encodeURIComponent(clickedPhoto as string) }}
        style={{ flexGrow: 1, width: "100%", height: "90%" }}
      />
      <View>
        <Button
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          icon={<Icon name="send" />}
        />
      </View>
    </View>
  );
};

export default clickedPhoto;
