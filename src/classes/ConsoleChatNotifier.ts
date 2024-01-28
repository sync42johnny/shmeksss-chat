import { ChatNotifier } from "../interfaces/ChatNotifier";
import { User } from "./User";
import { Message } from "./Message";

export class ConsoleChatNotifier implements ChatNotifier {
  notifyUsers(users: User[], message: Message): void {
    users.forEach((user) => {
      console.log(`Notify ${user.username}: ${message.display()}`);
    });
  }
}
