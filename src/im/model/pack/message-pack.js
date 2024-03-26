import ObjUtil from "../../utils/obj-util";

export class MessagePack {
  appId;
  messageId;
  fromId;
  toId;
  messageRandom;
  messageTime;
  messageBody;

  constructor(appId) {
    this.messageId = ObjUtil.uuid();
    this.appId = appId;
    this.messageRandom = this.RangeInteger(0, 10000);
    this.messageTime = Date.parse(new Date().toString());
  }

  RangeInteger(min, max) {
    const range = max - min;
    const value = Math.floor(Math.random() * range) + min;
    return value;
  }

  buildTextMessagePack(fromId, toId, text) {
    this.fromId = fromId;
    this.toId = toId;
    let body = { type: 1, content: text };
    this.messageBody = ObjUtil.json(body);
  }

  buildCustomerMessagePack(fromId, toId, type, obj) {
    this.fromId = fromId;
    this.toId = toId;
    let body = { type: type, content: obj };
    this.messageBody = ObjUtil.json(body);
  }
}
