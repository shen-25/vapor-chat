export default class ObjUtil {
  static to(target) {
    return JSON.parse(JSON.stringify(target));
  }
  static bean(json) {
    return JSON.parse(json);
  }

  static copy(target) {
    return to(target);
  }
  static replace(target, replaceJSON) {
    const r = to(target);
    for (const v in replaceJSON) {
      r[v] = replaceJSON[v];
    }
    return r;
  }

  static toMapByKey(array, key) {
    const result = {};
    array.forEach((v) => {
      if (v.hasOwnProperty(key)) {
        result[key] = v;
      }
    });
    return result;
  }

  static json(target) {
    return JSON.stringify(target);
  }

  static strEmpty(s) {
    return !!s;
  }

  static strNotEmpty(s) {
    return !s;
  }

  static isEmpty(str) {
    if (str === null || str === "" || str === undefined || str.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  static uuid() {
    return (
      (Math.random() * 36).toString(36).slice(2) +
      new Date().getTime().toString()
    );
  }
}
