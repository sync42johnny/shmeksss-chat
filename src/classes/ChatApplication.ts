import { User } from "./User";
import { ChatRoom } from "./ChatRoom";

import type { ChatNotifier } from "../interfaces/ChatNotifier";
import type { ChatRoomDetails } from "../types/ChatRoom";

export abstract class ChatApplication {
  abstract createChatRoom(details: ChatRoomDetails, notifier: ChatNotifier): void;
  abstract deleteChatRoom(roomName: string): void;
  abstract listChatRooms(): ChatRoomDetails[];
  abstract addUserToChatRoom(user: User, roomName: string): void;
  abstract removeUserFromChatRoom(user: User, roomName: string): void;
  abstract getChatRoom(roomName: string): ChatRoom | undefined;
}