import { User, AdminUser } from "./User";
import { Message } from "./Message";
import { ChatNotifier } from "../interfaces/ChatNotifier";

export class ChatRoom {
  private messages: Message[] = [];
  private notifier: ChatNotifier;

  constructor(
    public roomName: string,
    public members: User[] = [],
    notifier: ChatNotifier
  ) {
    this.notifier = notifier;
  }

  addMember(user: User): void {
    this.members.push(user);
  }

  deleteMessage(message: Message, adminUser?: AdminUser): void {
    if (adminUser) {
      const messageIndex = this.messages.indexOf(message);
      if (messageIndex > -1) {
        this.messages.splice(messageIndex, 1);
      }
    } else {
      console.log("Only admin can delete messages.");
    }
  }

  getMessages(): Message[] {
    return this.messages;
  }

  removeMember(user: User): void {
    this.members = this.members.filter((member) => member !== user);
  }

  sendMessage(message: Message): void {
    this.messages.push(message);
    this.notifier.notifyUsers(this.members, message);
  }
}
