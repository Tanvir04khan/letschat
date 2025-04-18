import { UserType } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const useUserDetails = () => {
  return useQuery<UserType>({
    queryKey: ["userDetails"],
  });
};

export default useUserDetails;
