import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

const SENSITIVE_ROUTES = ["/login", "/signup", "/reset-password"];
const SENSITIVE_FIELDS = ["password", "token", "secret", "creditCard"];

function redactBody(body = {}) {
  const clone = { ...body };
  for (const field of SENSITIVE_FIELDS) {
    if (field in clone) clone[field] = "[REDACTED]";
  }
  return clone;
}

const loggerMiddleware = (req, res, next) => {
  try {
    const isSensitiveRoute = SENSITIVE_ROUTES.includes(req.path);
    const message = `${new Date().toString()}\n\nreq URL: ${req.path} \nreqBody: ${JSON.stringify(req.body)}`;

    logger.info("incoming request", {
      method: req.method,
      url: req.originalUrl ?? req.url,
      body: isSensitiveRoute ? "[SKIPPED]" : redactBody(req.body),message
    });
  } catch (err) {
    logger.error("request logging failed", { error: err.message });
  }
  next();
};

export default loggerMiddleware;
