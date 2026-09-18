import express, { type Express } from "express";
import path from "node:path";
import { existsSync } from "node:fs";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { allowedOrigins, trustProxyHops } from "./config";

const app: Express = express();

app.disable("x-powered-by");
app.set("trust proxy", trustProxyHops());

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
const origins = allowedOrigins();
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || origins.includes(origin.replace(/\/$/, ""))) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86_400,
  }),
);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
        connectSrc: ["'self'", ...origins],
      },
    },
  }),
);
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1_000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many requests. Please try again later." },
  }),
);

app.use("/api", router);

app.use("/api", (_req, res) => {
  res.status(404).json({ message: "Not found" });
});

const staticDir = process.env.STATIC_DIR;
if (staticDir && existsSync(staticDir)) {
  app.use(
    express.static(staticDir, {
      etag: true,
      index: false,
      setHeaders(res, filePath) {
        if (process.env.NODE_ENV !== "production") {
          res.setHeader("Cache-Control", "no-cache");
          return;
        }

        const normalizedPath = filePath.split(path.sep).join("/");
        if (normalizedPath.includes("/assets/")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          return;
        }

        // Vite public assets keep stable names and must be revalidated after a deploy.
        res.setHeader("Cache-Control", "public, max-age=3600, must-revalidate");
      },
    }),
  );
  app.use((req, res, next) => {
    if (req.method !== "GET" || !req.accepts("html")) {
      next();
      return;
    }
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    logger.error({ err: error }, "Unhandled request error");
    if (res.headersSent) return;
    const status =
      typeof error === "object" && error !== null && "status" in error
        ? Number(error.status)
        : 500;
    res.status(Number.isInteger(status) && status >= 400 ? status : 500).json({
      message: status === 413 ? "Request body is too large" : "Internal server error",
    });
  },
);

export default app;
