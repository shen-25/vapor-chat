const MessageCommand = {
  MSG_P2P: 0x44f,

  MSG_P2P_SYNC: 0x454,

  //发送消息已读
  MSG_READ: 1106,

  //消息接收ack
  MSG_RECEIVE_ACK: 1107,

  //单聊消息ACK
  MSG_ACK: 1046,

  // 消息撤回
  MSG_RECALL: 1050,

  // //消息撤回通知
  MSG_RECALL_NOTIFY: 1052,

  // 消息撤回回包
  MSG_RECALL_ACK: 1051,

  // 消息已读通知
  MSG_READ_NOTIFY: 1053,
};

const FriendShipCommand = {
  //添加好友
  FRIEND_ADD: 3000,

  //更新好友
  FRIEND_UPDATE: 3001,

  //删除好友
  FRIEND_DELETE: 3002,

  //好友申请
  FRIEND_REQUEST: 3003,

  //好友申请已读
  FRIEND_REQUEST_READ: 3004,

  //好友申请审批
  FRIEND_REQUEST_APPROVER: 3005,

  //添加黑名单
  FRIEND_BLACK_ADD: 3010,

  //移除黑名单
  FRIEND_BLACK_DELETE: 3011,

  //新建好友分组
  FRIEND_GROUP_ADD: 3012,

  //删除好友分组
  FRIEND_GROUP_DELETE: 3013,

  //好友分组添加成员
  FRIEND_GROUP_MEMBER_ADD: 3014,

  //好友分组移除成员
  FRIEND_GROUP_MEMBER_DELETE: 3015,
};

const GroupCommand = {
  /**
   * 推送申请入群通知 2000
   */
  JOIN_GROUP: 0x7d0,

  /**
   * 推送添加群成员 2001，通知给所有管理员和本人
   */
  ADDED_MEMBER: 0x7d1,

  /**
   * 推送创建群组通知 2002，通知给所有人
   */
  CREATED_GROUP: 0x7d2,

  /**
   * 推送更新群组通知 2003，通知给所有人
   */
  UPDATED_GROUP: 0x7d3,

  /**
   * 推送退出群组通知 2004，通知给管理员和操作人
   */
  EXIT_GROUP: 0x7d4,

  /**
   * 推送修改群成员通知 2005，通知给管理员和被操作人
   */
  UPDATED_MEMBER: 0x7d5,

  /**
   * 推送删除群成员通知 2006，通知给所有群成员和被踢人
   */
  DELETED_MEMBER: 0x7d6,

  /**
   * 推送解散群通知 2007，通知所有人
   */
  DESTROY_GROUP: 0x7d7,

  /**
   * 推送转让群主 2008，通知所有人
   */
  TRANSFER_GROUP: 0x7d8,

  /**
   * 禁言群 2009，通知所有人
   */
  MUTE_GROUP: 0x7d9,

  /**
   * 禁言/解禁 群成员 2010，通知管理员和被操作人
   */
  SPEAK_Group_MEMBER: 0x7da,

  //群聊消息收发   2104
  MSG_GROUP: 0x838,

  //群聊消息收发同步消息   2105
  MSG_GROUP_SYNC: 0x839,

  //群聊消息ACK 2047
  GROUP_MSG_ACK: 0x7ff,
};

const SystemCommand = {
  //心跳 9999
  PING: 0x270f,

  //登陸  9000
  LOGIN: 0x2328,

  //登录ack  9001
  LOGIN_ACK: 0x2329,

  //下线通知 用于多端互斥  9002
  MUTUAL_LOGIN: 9002,

  //登出  9003
  LOGOUT: 0x232b,
};

const UserEventCommand = {
  //4000
  USER_MODIFY: 0xfa0,

  //4001
  USER_ONLINE_STATUS_CHANGE: 0xfa1,

  //4002 在线状态订阅
  USER_ONLINE_STATUS_SUBSCRIBE: 0xfa2,

  //4003 拉取订阅的在线状态好友,只发送给请求端
  PULL_USER_ONLINE_STATUS: 0xfa3,

  //4004 用户在线状态通知报文
  USER_ONLINE_STATUS_CHANGE_NOTIFY: 0xfa4,
};

const ConversationEventCommand = {
  // 会话删除
  CONVERSATION_DELETE: 5000,
  // 会话修改
  CONVERSATION_UPDATE: 5001,
};

export {
  MessageCommand,
  FriendShipCommand,
  GroupCommand,
  SystemCommand,
  UserEventCommand,
  ConversationEventCommand,
};
