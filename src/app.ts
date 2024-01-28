import { ChatApplication } from "./classes/ChatApplication";
import { ChatRoom } from "./classes/ChatRoom";
import { User, RegularUser, AdminUser } from "./classes/User";
import { TextMessage } from "./classes/Message";
import { ConsoleChatNotifier } from "./classes/ConsoleChatNotifier";

import type { ChatRoomDetails } from "./types/ChatRoom";

class MyChatApplication extends ChatApplication {
  private chatRooms: ChatRoom[] = [];
  private chatNotifier: ConsoleChatNotifier;

  constructor() {
    super();
    this.chatNotifier = new ConsoleChatNotifier();
  }

  createChatRoom(details: ChatRoomDetails): void {
    const newChatRoom = new ChatRoom(details.roomName, [], this.chatNotifier);
    this.chatRooms.push(newChatRoom);
  }

  deleteChatRoom(roomName: string): void {
    const index = this.chatRooms.findIndex(room => room.roomName === roomName);
    if (index !== -1) {
      this.chatRooms.splice(index, 1);
    }
  }

  listChatRooms(): ChatRoomDetails[] {
    return this.chatRooms.map(room => ({
      roomName: room.roomName,
      memberCount: room.members.length,
    }));
  }

  addUserToChatRoom(user: User, roomName: string): void {
    const chatRoom = this.chatRooms.find(room => room.roomName === roomName);
    if (chatRoom) {
      chatRoom.addMember(user);
    }
  }

  removeUserFromChatRoom(user: User, roomName: string): void {
    const chatRoom = this.chatRooms.find(room => room.roomName === roomName);
    if (chatRoom) {
      chatRoom.removeMember(user);
    }
  }

  getChatRoom(roomName: string): ChatRoom | undefined {
    return this.chatRooms.find(room => room.roomName === roomName);
  }
}

const chatApp = new MyChatApplication();

const v = new RegularUser("V", "Online");
const johhny = new RegularUser("Johhny", "Offline");
const admin = new AdminUser("Admin", "Online");

// Create chat room
const generalRoomDetails: ChatRoomDetails = {
  roomName: "Quadra Chat",
};
chatApp.createChatRoom(generalRoomDetails);

// Add users to chat room
chatApp.addUserToChatRoom(v, "Quadra");
chatApp.addUserToChatRoom(johhny, "Quadra Chat");
chatApp.addUserToChatRoom(admin, "Quadra Chat");

const generalChatRoom = chatApp.getChatRoom("Quadra Chat");
if (!generalChatRoom) {
  throw new Error("Chat room not found");
}

const greetingMessage = new TextMessage(v, "Привіт, як ви справи?");
v.sendMessage(greetingMessage, generalChatRoom);

const generalRoomMessages = generalChatRoom.getMessages();
const messageToDelete = generalRoomMessages[0];
admin.deleteMessage(messageToDelete, generalChatRoom);

// Kick a user by admin
admin.kickUser(johhny, generalChatRoom);

// View chat logs by admin
admin.viewChatLogs(generalChatRoom);

// Update user status
v.updateStatus("Offline");

v.addContact(johhny);

console.log(v);