export function getClientType(imei) {
  let tmp = imei.toLowerCase();
  if (tmp == "web;") {
    return 1;
  } else if (tmp == "iphone;") {
    return 2;
  } else if (tmp == "android;") {
    return 3;
  } else if (tmp == "windows;") {
    return 4;
  } else if (tmp == "mac;") {
    return 5;
  } else {
    return 0;
  }
}

const ClientTypeEnum = {
  webApi: 0,
  web: 1,
  ios: 2,
  android: 3,
  windows: 4,
  mac: 5,
};
