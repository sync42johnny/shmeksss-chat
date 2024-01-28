import { User } from "../classes/User";
import { Message } from "../classes/Message";

export interface ChatNotifier {
  notifyUsers(users: User[], message: Message): void;
}
