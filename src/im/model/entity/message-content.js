export class MessageContent {
  messageKey;
  appId;
  messageId;
  fromId;
  toId;
  messageRandom;
  messageTime;
  messageBody;
  constructor(messageKey) {
    this.messageKey = messageKey;
  }
}
