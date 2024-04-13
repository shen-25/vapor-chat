import ObjUtil from "../utils/obj-util";
import LoginPack from "../model/pack/login-pack";
import { registerToWebSocket } from "./use-websocket";
import ByteBuffer from "../utils/codec/byte-buffer";
import { sleep, getLen } from "./main-constant";
import { MessagePack } from "../model/pack/message-pack";
import { heartbeatInterval, StateEnum } from "./main-constant";
import { SystemCommand, MessageCommand, GroupCommand } from "../common/command";
import WebToolkit from "../utils/web-tool-kit";
let firstMonitorSocket = false; // 第一次监听socket

export default class UseImClient {
  // websocket地址
  url = null;
  // 用户id
  userId = null;
  // 版本
  version = 1;
  // 客户端类型
  clientType = null;
  // 设备imei
  imei = "";

  listeners = {
    onLogin: function (userId) {
      // 登录成功事件处理逻辑
    },
    onSocketConnectEvent: function (url, data) {
      // socket 连接事件处理逻辑
    },
    onSocketErrorEvent: function (e) {
      // 异常回调处理逻辑
    },
    onSocketReConnectEvent: function () {
      // 重连事件处理逻辑
    },
    onSocketReConnectSuccessEvent: function () {
      // 重连成功事件处理逻辑
    },
    onSocketCloseEvent: function () {
      // 连接关闭事件处理逻辑
    },
    onUserMutualLoginEvent: function () {},
    onP2PMessage: function (e) {
      // 收到单聊消息事件处理逻辑
    },
    onGroupMessage: function (e) {
      // 收到群聊消息事件处理逻辑
    },
    onTestMessage: function (e) {
      // 收到消息事件处理逻辑（测试用）
    },
    onOfflineMessage: function (data) {
      // 拉取到离线消息事件处理逻辑
    },
  };

  appId = 10000;

  userSign = "";

  imeiLength = 1;

  state = StateEnum.INIT;

  // http://127.0.0.1:8000/v1
  httpUrl = "";

  connect;

  isInit() {
    this.state === StateEnum.CONNECTED;
  }

  async initIm(httpUrl, appId, userId, imei, userSign, callback) {
    this.httpUrl = httpUrl;
    this.appId = appId;
    this.imei = imei;
    this.imeiLength = getLen(this.imei);
    this.userId = userId;
    this.userSign = userSign;
    if (ObjUtil.isEmpty(this.url)) {
      // websocket地址为空,走登录逻辑
      // TODO 这里写死先
      let ip = "127.0.0.1";
      let port = 19000;
      this.url = "ws://" + ip + ":" + port + "/ws";
    }
    let loginPack = new LoginPack(appId, this.clientType, this.userId);
    // 注册到websocket中
    const { success, error, connect } = await registerToWebSocket(
      this.url,
      loginPack,
      this
    );
    if (success) {
      console.log(
        "注册到websocket成功, appId: " + appId + ",userId : " + userId
      );
      if (!firstMonitorSocket) {
        firstMonitorSocket = true;
      }

      connect.onerror = (error) => {
        console.error("websocket error: ", error);
        // 加入socket 连接事件
        if (typeof useImClient.listeners.onSocketErrorEvent === "function") {
          useImClient.listeners.onSocketErrorEvent(error);
        }
        //异步方法，自动重连
        this.errorHandler(error, loginPack);
      };

      connect.onclose = (e) => {
        // console.log("websocket关闭");
        if (this.state == StateEnum.CLOSING) {
          this.onclose("logout");
          return;
        }
        // socket断开事件 连接事件
        if (typeof useImClient.listeners.onSocketCloseEvent === "function") {
          useImClient.listeners.onSocketCloseEvent();
        }
        // 异步方法 自动重连
        this.errorHandler(new Error(e.reason), loginPack);
      };

      connect.onmessage = (evt) => {
        var bytebuf = new ByteBuffer(evt.data);
        let byteBuffer = bytebuf.int32().int32().unpack();

        let command = byteBuffer[0]; //解析command
        let bodyLen = byteBuffer[1]; //解析bodylen
        let unpack = bytebuf.vstring(null, bodyLen).unpack(); //解析出字符串
        let msgBody = unpack[2];
        // console.log("sdk收到服务端数据: " + msgBody);
        if (command === MessageCommand.MSG_P2P) {
          //单聊消息收发
          if (typeof useImClient.listeners.onP2PMessage === "function") {
            useImClient.listeners.onP2PMessage(msgBody);
          }
        } else if (command === GroupCommand.MSG_GROUP) {
          if (typeof useImClient.listeners.onGroupMessage === "function") {
            useImClient.listeners.onGroupMessage(msgBody);
          }
        } else if (command === SystemCommand.MUTUAL_LOGIN) {
          if (
            typeof useImClient.listeners.onUserMutualLoginEvent === "function"
          ) {
            useImClient.listeners.onUserMutualLoginEvent(msgBody);
          }
        }
      };

      this.connect = connect;
      this.state = StateEnum.CONNECTED;
      //心跳包
      this.heartbeatLoop(this.connect);
      if (typeof useImClient.listeners.onLogin === "function") {
        useImClient.listeners.onLogin(this.userId);
      }
      callback(self);
    } else {
      console.error(error);
    }
  }

  /**
   * 自动重连
   * @param {*} error
   * @param {*} req
   * @returns
   */
  async errorHandler(error, req) {
    // 如果是主动断开连接，就没有必要自动重连
    // 比如收到被踢，或者主动调用logout()方法
    if (this.state == StateEnum.CLOSED || this.state == StateEnum.CLOSING) {
      return;
    }
    this.state = StateEnum.RECONNECTING;
    if (typeof useImClient.listeners.onSocketReConnectEvent === "function") {
      useImClient.listeners.onSocketReConnectEvent();
    }
    // 重连10次
    for (let index = 0; index < 10; index++) {
      await sleep(3);
      try {
        const { success, error, connect } = await registerToWebSocket(
          this.url,
          req,
          this
        );
        if (success) {
          if (
            typeof useImClient.listeners.onSocketReConnectSuccessEvent ===
            "function"
          ) {
            useImClient.listeners.onSocketReConnectSuccessEvent();
          }
          return;
        }
        console.error(error);
      } catch (error) {
        console.error(error);
      }
    }
    // 关闭连接
    this.onclose("reconnect timeout");
  }

  // 发送心跳包
  heartbeatLoop(connect) {
    let start = Date.now();
    let loop = () => {
      if (this.state != StateEnum.CONNECTED) {
        // 发送心跳结束了
        return;
      }
      if (Date.now() - start >= heartbeatInterval) {
        // 发送ping
        start = Date.now();
        let pingPack = useImClient.buildMessagePack(SystemCommand.PING, {});
        connect.send(pingPack.pack(false));
      }
      setTimeout(loop, 500);
    };
    setTimeout(loop, 500);
  }

  // 表示连接中止
  onclose(reason) {
    if (this.state == StateEnum.CLOSED) {
      return;
    }
    this.state = StateEnum.CLOSED;
    console.info("websocket连接关闭, 关闭原因：" + reason);
    this.connect = undefined;
    this.userId = "";

    // 加入socket 关闭事件
    if (typeof useImClient.listeners.onSocketErrorEvent === "function") {
      useImClient.listeners.onSocketCloseEvent();
    }
  }

  /**
   * 创建发送的消息，私有协议
   * @param {*} command
   * @param {*} messagePack
   * @returns
   */
  buildMessagePack(command, messagePack) {
    var jsonData = JSON.stringify(messagePack);
    let bodyLen = getLen(jsonData);

    let pack = new ByteBuffer(null, 0);
    pack
      .int32(command)
      .int32(this.version)
      .int32(this.clientType)
      .int32(0x0)
      .int32(this.appId)
      .int32(this.imeiLength)
      .int32(bodyLen)
      .vstring(this.imei, this.imeiLength)
      .vstring(jsonData, bodyLen);
    return pack;
  }

  //构建单聊消息对象
  createP2PTextMessage(to, text, fromAvatar) {
    let messagePack = new MessagePack(this.appId);
    messagePack.buildTextMessagePack(this.userId, to, text, fromAvatar);
    return messagePack;
  }

  //构建分享消息对象
  createSharePostMessage(fromAvatar, toId, type, sharePost) {
    let messagePack = new MessagePack(this.appId);
    messagePack.buildCustomerMessagePack(
      this.userId,
      fromAvatar,
      toId,
      type,
      sharePost
    );
    return messagePack;
  }
  //构建分享消息对象
  createImageMessage(fromAvatar, toId, type, imageUrl) {
    let messagePack = new MessagePack(this.appId);
    messagePack.buildCustomerMessagePack(
      this.userId,
      fromAvatar,
      toId,
      type,
      imageUrl
    );
    return messagePack;
  }
  sendP2PMessage(pack) {
    let p2pPack = useImClient.buildMessagePack(MessageCommand.MSG_P2P, pack);
    if (this.connect) {
      this.connect.send(p2pPack.pack(false));
    }
  }

  /**
   * 构建群聊消息对象
   * @param {*} to
   * @param {*} text
   * @returns
   */
  createGroupTextMessage(to, text, fromAvatar) {
    let messagePack = new MessagePack(this.appId);
    messagePack.buildGroupTextMessagePack(this.userId, to, text, fromAvatar);
    return messagePack;
  }
  /**
   * 发送群聊消息
   */
  sendGroupMessage(pack) {
    let groupPack = useImClient.buildMessagePack(GroupCommand.MSG_GROUP, pack);
    if (this.connect) {
      this.connect.send(groupPack.pack(false));
    }
  }

  getUserId() {
    return this.userId;
  }

  isConnected() {
    return this.state === StateEnum.CONNECTED;
  }
}

export const useImClient = new UseImClient();
