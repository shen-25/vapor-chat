export default class LoginPack {
  appId;
  clientType;
  userId;
  constructor(appId, clientType, userId) {
    this.appId = appId;
    this.userId = userId;
    this.clientType = clientType;
  }
}
