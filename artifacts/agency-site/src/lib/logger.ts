const isDev = import.meta.env.DEV;

const logger = {
  info: (msg: string, ...args: unknown[]) => {
    if (isDev) console.info(`[NexCore] ${msg}`, ...args);
  },
  warn: (msg: string, ...args: unknown[]) => {
    console.warn(`[NexCore] ${msg}`, ...args);
  },
  error: (msg: string, ...args: unknown[]) => {
    console.error(`[NexCore] ${msg}`, ...args);
  },
  route: (path: string) => {
    if (isDev) console.info(`[NexCore] navigate → ${path}`);
  },
  api: (method: string, path: string, status: number, ms: number) => {
    const ok = status >= 200 && status < 400;
    const label = `[NexCore API] ${method} ${path} → ${status} (${ms}ms)`;
    if (ok) {
      if (isDev) console.info(label);
    } else {
      console.error(label);
    }
  },
};

export default logger;
