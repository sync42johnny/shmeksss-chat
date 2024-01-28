import { ChatRoom } from "./ChatRoom";
import { Message } from "./Message";

export class User {
  constructor(public username: string, public status: string) {}

  sendMessage(message: Message, chatRoom: ChatRoom): void {
    chatRoom.sendMessage(message);
  }

  updateStatus(newStatus: string): void {
    this.status = newStatus;
  }
}

export class RegularUser extends User {
  private contacts: User[];

  constructor(username: string, status: string) {
    super(username, status);
    this.contacts = [];
  }

  addContact(user: User): void {
    if (!this.contacts.includes(user)) {
      this.contacts.push(user);
    }
  }

  listContacts(): User[] {
    return this.contacts;
  }

  removeContact(user: User): void {
    this.contacts = this.contacts.filter((contact) => contact !== user);
  }

  sendPrivateMessage(message: Message, recipient: User): void {
    console.log(
      `Private message from ${this.username} to ${
        recipient.username
      }: ${message.display()}`
    );
  }
}

export class AdminUser extends User {
  constructor(username: string, status: string) {
    super(username, status);
  }

  kickUser(user: User, chatRoom: ChatRoom): void {
    chatRoom.removeMember(user);
    console.log(
      `${user.username} has been kicked from ${chatRoom.roomName} by admin ${this.username}`
    );
  }

  viewChatLogs(chatRoom: ChatRoom): void {
    console.log(`Chat logs for ${chatRoom.roomName}:`);
    chatRoom.getMessages().forEach((msg) => console.log(msg.display()));
  }

  deleteMessage(message: Message, chatRoom: ChatRoom): void {
    chatRoom.deleteMessage(message, this);
  }
}
