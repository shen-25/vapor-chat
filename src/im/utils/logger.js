export default class Logger {
  static debug = true;

  static info(message, ...optionalParams) {
    if (Logger.debug) {
      console.info(
        `${new Date().toISOString()} : ${message}`,
        ...optionalParams
      );
    }
  }

  static infoTag(tag, message, ...optionalParams) {
    if (Logger.debug) {
      console.info(
        `${new Date().toISOString()} ${tag} : ${message}`,
        ...optionalParams
      );
    }
  }

  static error(message, ...optionalParams) {
    if (Logger.debug) {
      console.error(
        `${new Date().toISOString()} : ${message}`,
        ...optionalParams
      );
    }
  }

  static errorTag(tag, message, ...optionalParams) {
    if (Logger.debug) {
      console.error(
        `${new Date().toISOString()} ${tag}  : ${message}`,
        ...optionalParams
      );
    }
  }

  static trace(e) {
    if (Logger.debug) {
      if (e instanceof Error) {
        console.error(
          `${e.message} \n ${e.stack !== undefined ? e.stack : ""}`
        );
      } else {
        console.error(e);
      }
    }
  }
}
