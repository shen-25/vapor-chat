import { Base64 } from "./base64";
import Fetch from "../commom/fetch";
export default class WebToolkit {
  // 获取浏览器信息
  static getBrowserInfo() {
    let agent = navigator.userAgent.toLowerCase();
    let system = agent.split(" ")[1].split(" ")[0].split("(")[1];
    let REGSTR_EDGE = /edge\/[\d.]+/gi;
    let REGSTR_IE = /trident\/[\d.]+/gi;
    let OLD_IE = /msie\s[\d.]+/gi;
    let REGSTR_FF = /firefox\/[\d.]+/gi;
    let REGSTR_CHROME = /chrome\/[\d.]+/gi;
    let REGSTR_SAF = /safari\/[\d.]+/gi;
    let REGSTR_OPERA = /opr\/[\d.]+/gi;

    let info = {
      code: 0,
      system: system,
      browser: "",
      browserVersion: "",
    };
    // IE
    if (agent.indexOf("trident") > 0) {
      info.browser = agent.match(REGSTR_IE)[0].split("/")[0];
      info.browserVersion = agent.match(REGSTR_IE)[0].split("/")[1];
      return info;
    }
    // OLD_IE
    if (agent.indexOf("msie") > 0) {
      info.browser = agent.match(OLD_IE)[0].split(" ")[0];
      info.browserVersion = agent.match(OLD_IE)[0].split(" ")[1];
      return info;
    }
    // Edge
    if (agent.indexOf("edge") > 0) {
      info.browser = agent.match(REGSTR_EDGE)[0].split("/")[0];
      info.browserVersion = agent.match(REGSTR_EDGE)[0].split("/")[1];
      return info;
    }
    // firefox
    if (agent.indexOf("firefox") > 0) {
      info.browser = agent.match(REGSTR_FF)[0].split("/")[0];
      info.browserVersion = agent.match(REGSTR_FF)[0].split("/")[1];
      return info;
    }
    // Opera
    if (agent.indexOf("opr") > 0) {
      info.browser = agent.match(REGSTR_OPERA)[0].split("/")[0];
      info.browserVersion = agent.match(REGSTR_OPERA)[0].split("/")[1];
      return info;
    }
    // Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
      info.browser = agent.match(REGSTR_SAF)[0].split("/")[0];
      info.browserVersion = agent.match(REGSTR_SAF)[0].split("/")[1];
      return info;
    }
    // Chrome
    if (agent.indexOf("chrome") > 0) {
      info.browser = agent.match(REGSTR_CHROME)[0].split("/")[0];
      info.browserVersion = agent.match(REGSTR_CHROME)[0].split("/")[1];
      return info;
    } else {
      info.code = -1;
      return info;
    }
  }

  // TODO: 获取小程序设备信息
  static getWxappInfo() {
    return {
      system: "WXAPP",
      browser: "WXAPP",
      browserVersion: "1.0",
    };
  }

  // TODO: 获取ReactNative设备信息
  static getReactNativeInfo() {
    return {
      system: "RNNative",
      browser: "RNNative",
      browserVersion: "1.0",
    };
  }

  // TODO: 获取UniApp设备信息
  static getUniAppInfo() {
    return {
      system: "UNIAPP",
      browser: "UNIAPP",
      browserVersion: "1.0",
    };
  }

  // 动态加入script 到head 标签处
  static loadJS(url, callback) {
    var script = document.createElement("script"),
      fn = callback || function () {};
    script.type = "text/javascript";
    let exist = false;
    for (const v in document.getElementsByTagName("head")[0].children) {
      const dom = document.getElementsByTagName("head")[0].children[v];
      if (dom.outerHTML !== undefined && dom.outerHTML.indexOf(url) >= 0) {
        exist = true;
      }
    }
    if (exist) {
      fn();
      return;
    }

    //IE
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          fn();
        }
      };
    } else {
      //其他浏览器
      script.onload = function () {
        fn();
      };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  // 获取当前ip信息(fetch方式)
  static getIpInfoByFetch(callback) {
    const url = "http://pv.sohu.com/cityjson?ie=utf-8";
    let fetch = Fetch.getFetchToolkit();
    const request = {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    };
    return fetch(url, request)
      .then((response) => {
        return response.text();
      })
      .then((res) => {
        if (typeof callback === "function") {
          let currentCity = eval(
            "_current_city=" + res.replace("var returnCitySN = ", "")
          );
          callback(currentCity);
        }
      })
      .catch((e) => {
        Logger.trace(e);
      });
  }

  // 获取当前ip信息(动态插入script脚本方式)
  static getIpInfoByInsertScript(callback) {
    const url = "http://pv.sohu.com/cityjson?ie=utf-8";
    WebToolkit.loadJS(url, function () {
      callback(window["returnCitySN"]);
    });
  }

  static getIpInfo(callback) {
    /*IFTRUE_WXAPP*/
    // 小程序的情况需要把pv.sohu.com域名加入白名单中
    WebToolkit.getIpInfoByFetch(callback);
    /*FITRUE_WXAPP*/

    /*IFTRUE_WEBAPP*/
    WebToolkit.getIpInfoByInsertScript(callback);
    /*FITRUE_WEBAPP*/

    /*IFTRUE_RNAPP*/
    //
    WebToolkit.getIpInfoByInsertScript(callback);
    /*FITRUE_RNAPP*/

    /*IFTRUE_UNIAPP*/
    // 小程序的情况需要把pv.sohu.com域名加入白名单中
    WebToolkit.getIpInfoByFetch(callback);
    /*FITRUE_UNIAPP*/
  }

  // 获取客户端设备信息
  static getDeviceInfo() {
    /*IFTRUE_WXAPP*/
    // 小程序的情况需要把pv.sohu.com域名加入白名单中
    // const deviceInfo = WebToolkit.getWxappInfo();
    /*FITRUE_WXAPP*/

    /*IFTRUE_WEBAPP*/
    const deviceInfo = WebToolkit.getBrowserInfo();
    /*FITRUE_WEBAPP*/

    /*IFTRUE_RNAPP*/
    // const deviceInfo = WebToolkit.getReactNativeInfo();
    /*FITRUE_RNAPP*/

    /*IFTRUE_UNIAPP*/
    // const deviceInfo = WebToolkit.getUniAppInfo();
    /*FITRUE_UNIAPP*/
    return deviceInfo;
  }

  base64Encode(str) {
    return Base64.encode(str);
  }

  base64Decode(str) {
    return Base64.decode(str);
  }
}
