/**
 * 返回平台所用的 fetch 工具
 * */
export default class Fetch {
  static getFetchToolkit() {
    let httpFetch;
    if (
      typeof global.fetch !== "undefined" &&
      typeof global.fetch === "function"
    ) {
      httpFetch = global.fetch;
    } else if (typeof fetch === "function") {
      httpFetch = fetch;
    } else {
      /*IFTRUE_WXAPP*/
      httpFetch = require("wxapp-fetch");

      /*IFTRUE_WEBAPP*/
      httpFetch = require("isomorphic-fetch");
    }
    return httpFetch;
  }
}
