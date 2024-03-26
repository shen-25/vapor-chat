export const loginTimeout = 10 * 1000; // 10 秒
export const heartbeatInterval = 10 * 1000; // 10 秒

export const StateEnum = {
  // 初始化
  INIT: 0,
  // 正在连接
  CONNECTING: 1,
  // 连接成功
  CONNECTED: 2,
  // 再连接
  RECONNECTING: 3,
  // 正在关闭
  CLOSING: 4,
  // 关闭
  CLOSED: 5,
};
/**
 * 休眠一定时间
 * @param {number} second
 * @param {number} unit 默认1000
 * @returns
 */
export async function sleep(second, unit) {
  if (unit == null || unit === undefined) {
    unit = 1000;
  }
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve();
    }, second * unit);
  });
}

/**
 * 获取str的长度
 * @param {string} str
 * @returns
 */
export function getLen(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 3;
    }
  }
  return len;
}
