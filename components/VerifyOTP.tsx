import { Button, Input } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { router } from "expo-router";

interface VerifyOTPPropsType {
  dismissOverlay: (value: false) => void;
}

const VerifyOTP = ({ dismissOverlay }: VerifyOTPPropsType) => {
  const [otp, setOtp] = useState("");
  const [otpErrorMessage, setOtpErrorMessage] = useState("");

  const onChangeOtp = (value: string) => {
    if (otpErrorMessage) setOtpErrorMessage("");
    setOtp(value);
  };

  const onPressVerify = () => {
    if (!/^\d{4}$/.test(otp)) {
      return setOtpErrorMessage("Invalid OTP!");
    }
    dismissOverlay(false);
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Input
        value={otp}
        onChangeText={onChangeOtp}
        keyboardType="number-pad"
        label="OTP"
        labelStyle={styles.labelStyle}
        placeholder="OTP..."
        inputContainerStyle={styles.inputContainerStyle}
        errorMessage={otpErrorMessage}
      />
      <Button
        buttonStyle={{ marginHorizontal: 12 }}
        title="Verify"
        onPress={onPressVerify}
      />
    </View>
  );
};

export default VerifyOTP;

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
