import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { routes } from "@/routes/routes";
import Header from "@/components/Header";
import { Icon } from "@rneui/base";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
        }}
      >
        {routes.map(({ path, headerShown }) => (
          <Stack.Screen
            key={path}
            name={path}
            options={{
              headerShown,
              contentStyle: {
                marginHorizontal: path === "camera" ? 0 : 12,
                backgroundColor: "#fff",
                position: "relative",
              },
              headerRight: () => (
                <>
                  {path !== "index" && (
                    <TouchableOpacity>
                      <Link href={"/"}>
                        {path === "[userId]" ? (
                          <TouchableOpacity>
                            <Ionicons
                              name="videocam"
                              size={24}
                              color={"rgb(32, 137, 220)"}
                            />
                          </TouchableOpacity>
                        ) : (
                          <Feather
                            name="more-vertical"
                            size={24}
                            color="black"
                          />
                        )}
                      </Link>
                    </TouchableOpacity>
                  )}
                </>
              ),
              headerTitle: () => <Header path={path} />,
            }}
          />
        ))}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    backgroundColor: "#fff",
    position: "relative",
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
