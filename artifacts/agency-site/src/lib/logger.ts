const isDev = import.meta.env.DEV;

const styles = {
  prefix: "color: white; background-color: #2563eb; padding: 2px 6px; border-radius: 4px; font-weight: bold;",
  info: "color: #2563eb; font-weight: 500;",
  warn: "color: #d97706; font-weight: bold; background-color: #fef3c7; padding: 2px 4px; border-radius: 2px;",
  error: "color: white; font-weight: bold; background-color: #dc2626; padding: 2px 4px; border-radius: 2px;",
  route: "color: #059669; font-style: italic; background-color: #d1fae5; padding: 2px 4px; border-radius: 2px;",
  apiOk: "color: #059669; font-weight: bold;",
  apiErr: "color: #dc2626; font-weight: bold;"
};

const logger = {
  info: (msg: string, ...args: unknown[]) => {
    if (isDev) console.info(`%cSeichox%c ${msg}`, styles.prefix, styles.info, ...args);
  },
  warn: (msg: string, ...args: unknown[]) => {
    console.warn(`%cSeichox%c ${msg}`, styles.prefix, styles.warn, ...args);
  },
  error: (msg: string, ...args: unknown[]) => {
    console.error(`%cSeichox%c ${msg}`, styles.prefix, styles.error, ...args);
  },
  route: (path: string) => {
    if (isDev) console.info(`%cSeichox%c navigate → %c${path}`, styles.prefix, "", styles.route);
  },
  api: (method: string, path: string, status: number, ms: number) => {
    const ok = status >= 200 && status < 400;
    const style = ok ? styles.apiOk : styles.apiErr;
    const label = `%cSeichox API%c ${method} ${path} → %c${status} (${ms}ms)`;
    if (ok) {
      if (isDev) console.info(label, styles.prefix, "", style);
    } else {
      console.error(label, styles.prefix, "", style);
    }
  },
};

export default logger;
