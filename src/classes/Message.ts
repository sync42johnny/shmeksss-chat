import { User } from "./User";

export abstract class Message {
  constructor(public sender: User, public timestamp: Date = new Date()) {}

  abstract display(): string;
}

export class TextMessage extends Message {
  constructor(sender: User, public text: string) {
    super(sender);
  }

  display(): string {
    return `${this.sender.username}: ${this.text}`;
  }
}

export class FileMessage extends Message {
  constructor(sender: User, public filename: string, public fileSize: number) {
    super(sender);
  }

  display(): string {
    return `${this.sender.username} sent a file: ${this.filename}, size: ${this.fileSize}`;
  }
}
