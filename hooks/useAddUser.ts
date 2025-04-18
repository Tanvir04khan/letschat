import { AddUserResponse } from "@/type";
import { APIRoutes, letsChatBEBaseURL } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useAddUser = (phoneNumber: string) => {
  return useMutation({
    mutationKey: [APIRoutes.ADD_USER],
    mutationFn: async (): Promise<AddUserResponse> => {
      const res = await fetch(`${letsChatBEBaseURL}${APIRoutes.ADD_USER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });

      return await res.json();
    },
  });
};

export default useAddUser;
