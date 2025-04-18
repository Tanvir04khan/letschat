import { MyContactsType } from "@/type";
import { useQuery } from "@tanstack/react-query";
import {
  Fields,
  getContactsAsync,
  requestPermissionsAsync,
} from "expo-contacts";
import React from "react";

const useContacts = () => {
  async function getContacts(): Promise<MyContactsType[]> {
    const { status } = await requestPermissionsAsync();
    if (status !== "granted") {
      return [];
    }
    const { data } = await getContactsAsync({
      fields: [Fields.Name, Fields.PhoneNumbers],
    });

    const contacts: MyContactsType[] = [];
    data?.forEach((item, i) => {
      item.phoneNumbers?.forEach((pn) => {
        const contact = contacts.findIndex(
          (i) =>
            i.name === item.name &&
            i.phoneNumber === pn.number?.replace("+91", "")?.replaceAll(" ", "")
        );
        if (contact === -1) {
          contacts.push({
            name: item.name,
            phoneNumber: pn.number?.replace("+91", "")?.replaceAll(" ", ""),
          });
        }
      });
    });

    return contacts;
  }

  return useQuery<MyContactsType[]>({
    queryKey: ["getMobileContact"],
    queryFn: getContacts,
    staleTime: Infinity,
  });
};

export default useContacts;
