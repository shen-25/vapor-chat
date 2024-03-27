import { API_FILE_BASE_URL } from "@/config/setting";
const fileUtil = {
  /**
   * 任务状态
   */
  taskStatus: {
    PARSING: {
      code: 1,
      text: "解析中",
    },
    WAITING: {
      code: 2,
      text: "等待上传",
    },
    UPLOADING: {
      code: 3,
      text: "正在上传",
    },
    PAUSE: {
      code: 4,
      text: "暂停上传",
    },
    SUCCESS: {
      code: 5,
      text: "上传成功",
    },
    FAIL: {
      code: 6,
      text: "上传失败",
    },
    MERGE: {
      code: 7,
      text: "服务器处理中",
    },
  },
  /**
   * 6MB
   * 获取每个分片大小(byte)
   * @returns
   */
  getChunkSize() {
    return 1024 * 1024 * 6;
  },

  /**
   * 获取上传的地址前缀
   * @returns
   */
  getUrlPrefix() {
    return API_FILE_BASE_URL;
  },
  /**
   * 3GB
   * @returns
   */
  getMaxFileSize() {
    return 1024 * 1024 * 1024 * 3;
  },

  /**
   * 转换
   * @param {*} fileSize
   * @returns
   */
  translateFileSize(fileSize) {
    let KB_STR = "K",
      MB_STR = "M",
      GB_STR = "G",
      UNIT = 1024,
      fileSizeSuffix = KB_STR;
    fileSize = fileSize / UNIT;
    if (fileSize >= UNIT) {
      fileSize = fileSize / UNIT;
      fileSizeSuffix = MB_STR;
    }
    if (fileSize >= UNIT) {
      fileSize = fileSize / UNIT;
      fileSizeSuffix = GB_STR;
    }
    return fileSize.toFixed(2) + fileSizeSuffix;
  },
};

export default fileUtil;
