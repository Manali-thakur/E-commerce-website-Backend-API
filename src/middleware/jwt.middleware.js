import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // 1.Read tokin
  //  token must be send in the authorization header
  console.log(req.headers);
  const token = req.headers["authorization"];

  // 2. if no token return the error
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  // 3. check if token is valid
  try {
    const payload = jwt.verify(token, "ZdePxPHU9L63rddFpJfdfJdM");
    console.log(req.userId);
    req.userId = payload.userID;
    console.log(payload);
  } catch (err) {
    // 4. return error
    return res.status(401).send("Unauthorized!!!");
  }

  // 5. call next middleware
  next();
};

export default jwtAuth;
