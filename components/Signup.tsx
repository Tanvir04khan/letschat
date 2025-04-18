import { Button, Input } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  APIRoutes,
  myAuthBEBaseURL,
  saveAccessTokenAndRefreshToken,
} from "@/utils";
import { LoginAndSignupResponse, UserType } from "@/type";
import useAddUser from "@/hooks/useAddUser";
import { socket } from "@/app/_layout";
import useUserStatusStore from "@/store/userStatusStore";

const Signup = ({
  handleOverlayVisibility,
}: {
  handleOverlayVisibility: (value: boolean) => void;
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [confirmPhoneNumberErrorMessage, setConfirmPhoneNumberErrorMessage] =
    useState("");
  const [passwordErrorMessage, setPasswordErrorMessge] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessge] =
    useState("");

  const setUserPhoneNumber = useUserStatusStore(
    (state) => state.setUserPhoneNumber
  );

  const { mutate: addUser } = useAddUser(phoneNumber);

  const queryClient = useQueryClient();

  const { mutate: signup } = useMutation({
    mutationFn: async (): Promise<LoginAndSignupResponse> => {
      const res = await fetch(`${myAuthBEBaseURL}${APIRoutes.USER_SIGNUP}`, {
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
        setConfirmPasswordErrorMessge(data.message);
      }
    },
    onError: (error) => {
      setConfirmPasswordErrorMessge(error.message);
    },
  });

  const onChangePhoneNumber = (value: string) => {
    if (phoneNumberErrorMessage) setPhoneNumberErrorMessage("");
    setPhoneNumber(value);
  };
  const onChangeConfirmPhoneNumber = (value: string) => {
    if (confirmPhoneNumberErrorMessage) setConfirmPhoneNumberErrorMessage("");
    setConfirmPhoneNumber(value);
  };
  const onChangePassword = (value: string) => {
    if (passwordErrorMessage) setPasswordErrorMessge("");
    setPassword(value);
  };
  const onChangeConfirmPassword = (value: string) => {
    if (confirmPasswordErrorMessage) setConfirmPasswordErrorMessge("");
    setConfirmPassword(value);
  };

  const onSignup = () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      return setPhoneNumberErrorMessage("Invalid phone number!");
    }
    if (!/^\d{10}$/.test(confirmPhoneNumber)) {
      return setConfirmPhoneNumberErrorMessage("Invalid phone number!");
    }
    if (confirmPhoneNumber !== phoneNumber) {
      return setConfirmPhoneNumberErrorMessage(
        "Your phone number don’t match. Please re-enter the same phone number!"
      );
    }
    if (password.length < 8) {
      return setPasswordErrorMessge("Password must have 8 characters.");
    }
    if (confirmPassword.length < 8) {
      return setConfirmPasswordErrorMessge(
        "Password must have 8 or more than 8 characters!"
      );
    }

    if (confirmPassword !== password) {
      return setConfirmPasswordErrorMessge(
        "Your passwords don’t match. Please re-enter the same password!"
      );
    }

    signup();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <Input
        value={phoneNumber}
        onChangeText={onChangePhoneNumber}
        keyboardType="number-pad"
        label="Phone Number"
        labelStyle={styles.labelStyle}
        placeholder="Phone Number..."
        inputContainerStyle={styles.inputContainerStyle}
        errorMessage={phoneNumberErrorMessage}
      />
      <Input
        value={confirmPhoneNumber}
        onChangeText={onChangeConfirmPhoneNumber}
        keyboardType="number-pad"
        label="Confirm Phone Number"
        labelStyle={styles.labelStyle}
        placeholder="Confirm Phone Number..."
        inputContainerStyle={styles.inputContainerStyle}
        errorMessage={confirmPhoneNumberErrorMessage}
      />
      <Input
        secureTextEntry
        value={password}
        onChangeText={onChangePassword}
        keyboardType="default"
        label="Password"
        labelStyle={styles.labelStyle}
        placeholder="Password..."
        inputContainerStyle={styles.inputContainerStyle}
        errorMessage={passwordErrorMessage}
      />
      <Input
        secureTextEntry
        value={confirmPassword}
        onChangeText={onChangeConfirmPassword}
        keyboardType="default"
        label="Confirm Password"
        labelStyle={styles.labelStyle}
        placeholder="Confirm Password..."
        inputContainerStyle={styles.inputContainerStyle}
        errorMessage={confirmPasswordErrorMessage}
      />
      <Button
        buttonStyle={{ marginHorizontal: 12 }}
        title="Signup"
        onPress={onSignup}
      />
    </View>
  );
};

export default Signup;

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
