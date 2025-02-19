import { Button, Input } from "@rneui/base";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface SigninPropsType {
  setOverlayType: (value: "verify") => void;
}

const Signin = ({ setOverlayType }: SigninPropsType) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

  const onChangePhoneNumber = (value: string) => {
    if (phoneNumberErrorMessage) {
      setPhoneNumberErrorMessage("");
    }
    setPhoneNumber(value);
  };

  const onPressGetOTP = () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      console.log(phoneNumber);
      return setPhoneNumberErrorMessage("Invalid Phone Number!");
    }
    setOverlayType("verify");
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

        <Button
          buttonStyle={{ marginHorizontal: 12 }}
          title="Get OTP"
          onPress={onPressGetOTP}
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
