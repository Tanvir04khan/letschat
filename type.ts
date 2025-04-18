export interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export type LoginAndSignupResponse = {
  status: string;
  statusCode: number;
  message: string;
  data: UserType & TokenType;
};

export type AddUserResponse = {
  status: string;
  statusCode: number;
  message: string;
  data: { userId: string };
};

export type MessagesType = {
  messageId: string;
  sentBy: string;
  receivedBy: string;
  messageType: string;
  message: string;
  sentOn: string;
};

export type ChatsResponse = {
  status: string;
  statusCode: number;
  message: string;
  data: { chats: MessagesType[]; receiverStatus: "Online" | "Offline" } | null;
};

export type MyContactsType = {
  name: string;
  phoneNumber: string | undefined;
};
