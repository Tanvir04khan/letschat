import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import React from "react";
import { AppState, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { routes } from "@/routes/routes";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { letsChatBEBaseURL } from "@/utils";
import { io } from "socket.io-client";
import SocketIOProvider from "@/provider/SocketIOProvider";
import useUserStatusStore from "@/store/userStatusStore";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const client = new QueryClient();
export const socket = io(letsChatBEBaseURL, {
  transports: ["websocket"],
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [appState, setAppState] = useState("");

  const userPhoneNumber = useUserStatusStore((state) => state.userPhoneNumber);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "background") {
        socket.emit("disconnect-letsChat", userPhoneNumber);
      }
      setAppState(nextAppState);
    };

    AppState.addEventListener("change", handleAppStateChange);
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <QueryClientProvider client={client}>
        <SocketIOProvider socket={socket}>
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
                    marginHorizontal:
                      path === "camera" || path.includes("clickedPhoto")
                        ? 0
                        : 12,
                    backgroundColor: "#fff",
                    position: "relative",
                  },
                  headerRight: () => (
                    <>
                      {path !== "index" && (
                        <TouchableOpacity>
                          <Link href={"/"}>
                            {path === "[receiverPhoneNumber]" ? (
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
        </SocketIOProvider>
      </QueryClientProvider>
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
