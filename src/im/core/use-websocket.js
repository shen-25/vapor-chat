import { w3cwebsocket } from "websocket";

import ByteBuffer from "../utils/codec/byte-buffer";

import { heartbeatInterval, loginTimeout } from "./main-constant";
/**
 * 注册到websocket中
 * @param {*} webSocketUrl  地址
 * @param {*} loginReq 请求的包，包括了appid clientType userId
 * @param {*} imClient useImClient class
 */
export async function registerToWebSocket(webSocketUrl, loginReq, useImClient) {
  return new Promise((resolve, _) => {
    let connect = new w3cwebsocket(webSocketUrl);
    // 设置了 WebSocket 连接的 binaryType 属性为 "arraybuffer"。
    //这意味着当 WebSocket 收到二进制数据时，
    //它将以 ArrayBuffer 对象的形式提供这些数据，而不是默认的 Blob 对象
    connect.binaryType = "arraybuffer";
    // 登录超时器
    let timer = setTimeout(() => {
      // 清空登录超时器
      clearTimeout(timer);
      resolve({
        success: false,
        error: new Error("timeout"),
        connect: connect,
      });
    }, loginTimeout);
    connect.onopen = () => {
      if (connect.readyState == w3cwebsocket.OPEN) {
        // 加入socket 连接事件
        if (typeof useImClient.listeners.onSocketConnectEvent === "function") {
          useImClient.listeners.onSocketConnectEvent(webSocketUrl, loginReq);
        }
        let data = {
          userId: loginReq.userId,
        };
        let loginPack = useImClient.buildMessagePack(0x2328, data);
        connect.send(loginPack.pack(false));
      }
    };
    connect.onerror = (error) => {
      clearTimeout(timer);
      console.error(error);
      resolve({ success: false, error: error, connect: connect });
    };

    connect.onmessage = (evt) => {
      if (typeof evt.data === "string") {
        console.log("接受到消息: '" + evt.data + "'");
        return;
      }
      clearTimeout(timer);

      var bytebuf = new ByteBuffer(evt.data);

      let byteBuffer = bytebuf.int32().int32().unpack();

      let command = byteBuffer[0];
      let bodyLen = byteBuffer[1];
      if (command == 0x2329) {
        resolve({ success: true, connect: connect });
      }
    };
  });
}
