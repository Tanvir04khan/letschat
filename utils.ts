import * as Keychain from "react-native-keychain";
import Constants from "expo-constants";

export const myAuthBEBaseURL =
  Constants.expoConfig?.extra?.MYAUTH_BACKEND_ENDPOINT;
export const letsChatBEBaseURL =
  Constants.expoConfig?.extra?.LETSCHAT_BACKEND_ENDPOINT;

export enum APIRoutes {
  USER_SIGNUP = "/v1/signup",
  LOGIN = "/v1/login",
  AUTHORIZED_USER_LOOKUP = "/v1/authorizeduser-lookup",
  ADD_USER = "/v1/adduser",
  GET_CHATS = "/v1/getchats",
}

export const saveAccessTokenAndRefreshToken = async (
  accessToken: string,
  refreshToken: string,
  userId: string
) => {
  await Keychain.setGenericPassword(
    "authorization",
    JSON.stringify({ accessToken, refreshToken, userId })
  );
};
