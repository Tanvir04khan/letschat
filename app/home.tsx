import Contacts from "@/components/Contacts";
import Header from "@/components/Header";
import { Icon, Input, Text } from "@rneui/base";
import {
  Fields,
  getContactsAsync,
  requestPermissionsAsync,
} from "expo-contacts";
import React, { ReactNode, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

interface HomeScreenPropsType {
  children?: ReactNode;
}

const Home = ({ children }: HomeScreenPropsType) => {
  const [serach, setSearch] = useState("");
  const [contacts, setContacts] = useState<
    { name: string; phoneNumber: string }[]
  >([]);

  const onChangeSearch = (newText: string) => {
    setSearch(newText);
  };

  const getContacts = async () => {
    const { status } = await requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await getContactsAsync({
        fields: [Fields.Name, Fields.PhoneNumbers],
      });

      console.log(data);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Input
        placeholder="Search..."
        value={serach}
        onChangeText={onChangeSearch}
        leftIcon={<Icon name="search" size={24} color="black" />}
        inputContainerStyle={styles.inputContainerStyle}
        errorStyle={{ display: "none" }}
      />
      {contacts.map((item, i) => (
        <Contacts key={item.phoneNumber} />
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
