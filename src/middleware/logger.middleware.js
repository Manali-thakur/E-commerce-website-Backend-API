import fs from "fs";

const fsPromise = fs.promises;

async function log(logData) {
  try {
    logData = `\n ${new Date().toString()} -${logData}`;
    await fsPromise.appendFile("log.txt", logData);
  } catch (err) {
    console.log(err);
  }
}

// wrapping the function inside middleware then using middleware for the requests
const loggerMiddleware = async (req, res, next) => {
    // dont log when user send sigin req so we don't save the password
  if (!req.url.includes("login")) {
    const logData = `${req.url} = ${JSON.stringify(req.body)}`;
    // 1. Log request body
    await log(logData);
  } else {
    // imp to call next() in the pipeling else the function is not complete
    next();
  }
};

export default loggerMiddleware;
