import { socket } from "@/app/_layout";
import useAddUser from "@/hooks/useAddUser";
import useUserStatusStore from "@/store/userStatusStore";
import { AddUserResponse, LoginAndSignupResponse, UserType } from "@/type";
import {
  APIRoutes,
  letsChatBEBaseURL,
  myAuthBEBaseURL,
  saveAccessTokenAndRefreshToken,
} from "@/utils";
import { Button, Input } from "@rneui/base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Signin = ({
  handleOverlayVisibility,
}: {
  handleOverlayVisibility: (value: boolean) => void;
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const setUserPhoneNumber = useUserStatusStore(
    (state) => state.setUserPhoneNumber
  );

  const queryClient = useQueryClient();

  const { mutate: addUser } = useAddUser(phoneNumber);

  const { mutate: signin } = useMutation({
    mutationKey: [APIRoutes.LOGIN],
    mutationFn: async (): Promise<LoginAndSignupResponse> => {
      console.log(`${myAuthBEBaseURL}${APIRoutes.LOGIN}`);
      const res = await fetch(`${myAuthBEBaseURL}${APIRoutes.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        socket.emit("join-letsChat-room", phoneNumber);
        setUserPhoneNumber(phoneNumber);
        console.log(data);
        const { accessToken, refreshToken, ...userDetails } = data.data;
        saveAccessTokenAndRefreshToken(
          accessToken,
          refreshToken,
          userDetails.userId
        );
        addUser();
        queryClient.setQueryData<UserType>(["userDetails"], userDetails);
        handleOverlayVisibility(false);
        router.push("/home");
      } else {
        setPasswordErrorMessage(data.message);
      }
    },
    onError: (error) => {
      setPasswordErrorMessage(error.message);
    },
  });

  const onChangePhoneNumber = (value: string) => {
    if (phoneNumberErrorMessage) {
      setPhoneNumberErrorMessage("");
    }
    setPhoneNumber(value);
  };

  const onChangePassword = (value: string) => {
    if (passwordErrorMessage) {
      setPasswordErrorMessage("");
    }
    setPassword(value);
  };

  const onPressSignin = () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      return setPhoneNumberErrorMessage("Invalid Phone Number!");
    }
    if (!password) {
      return setPasswordErrorMessage("Please type a password.");
    }
    signin();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <View>
        <Input
          value={phoneNumber}
          keyboardType="number-pad"
          onChangeText={onChangePhoneNumber}
          label="Phone Number"
          labelStyle={styles.labelStyle}
          placeholder="Phone Number..."
          inputContainerStyle={styles.inputContainerStyle}
          errorMessage={phoneNumberErrorMessage}
        />
        <Input
          value={password}
          keyboardType="default"
          secureTextEntry
          onChangeText={onChangePassword}
          label="Password"
          labelStyle={styles.labelStyle}
          placeholder="Password..."
          inputContainerStyle={styles.inputContainerStyle}
          errorMessage={passwordErrorMessage}
        />

        <Button
          buttonStyle={{ marginHorizontal: 12 }}
          title="Signin"
          onPress={onPressSignin}
        />
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: { width: "100%" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  labelStyle: {
    marginLeft: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  errorMessage: {
    color: "red",
  },
});
