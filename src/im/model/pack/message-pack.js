import ObjUtil from "../../utils/obj-util";

export class MessagePack {
  appId;
  messageId;
  fromId;
  toId;
  avatar;
  messageRandom;
  messageTime;
  messageBody;

  constructor(appId) {
    this.messageId = ObjUtil.uuid();
    this.appId = appId;
    this.messageRandom = this.RangeInteger(0, 10000);
    this.messageTime = new Date();
  }

  RangeInteger(min, max) {
    const range = max - min;
    const value = Math.floor(Math.random() * range) + min;
    return value;
  }

  buildTextMessagePack(fromId, toId, text, avatar) {
    this.fromId = fromId;
    this.toId = toId;
    this.avatar = avatar;
    let body = { type: 1, content: text };
    this.messageBody = ObjUtil.json(body);
  }

  buildCustomerMessagePack(fromId, avatar, toId, type, obj) {
    this.fromId = fromId;
    this.toId = toId;
    this.avatar = avatar;
    let body = { type: type, content: obj };
    this.messageBody = ObjUtil.json(body);
  }

  /**
   * 构建群聊消息
   * @param {} fromId
   * @param {*} toId
   * @param {*} text
   */
  buildGroupTextMessagePack(fromId, groupId, text, avatar) {
    this.fromId = fromId;
    this.toId = groupId;
    this.avatar = avatar;
    let body = { type: 1, content: text };
    this.messageBody = ObjUtil.json(body);
  }
}
