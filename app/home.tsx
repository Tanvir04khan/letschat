import Contacts from "@/components/Contacts";
import useContacts from "@/hooks/useContacts";
import { MyContactsType } from "@/type";
import { Icon, Input } from "@rneui/base";
import { useQuery } from "@tanstack/react-query";
import {
  Contact,
  Fields,
  getContactsAsync,
  requestPermissionsAsync,
} from "expo-contacts";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Home = () => {
  const [search, setSearch] = useState("");

  const { data: mobileContacts } = useContacts();

  const onChangeSearch = (newText: string) => {
    setSearch(newText);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Input
        placeholder="Search..."
        value={search}
        onChangeText={onChangeSearch}
        leftIcon={<Icon name="search" size={24} color="black" />}
        inputContainerStyle={styles.inputContainerStyle}
        errorStyle={{ display: "none" }}
      />
      {mobileContacts?.map((item) => (
        <Contacts
          key={item.phoneNumber + item.name}
          name={item.name ?? ""}
          status={"Offline"}
          phoneNumber={item.phoneNumber ?? ""}
        />
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.06)",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
});
