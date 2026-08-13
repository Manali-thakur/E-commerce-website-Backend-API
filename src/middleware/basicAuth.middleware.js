import { UserModel } from "../features/user/model/user.model.js";
const basicAuthorizer = (req, res, next) => {
  //1. check if its empty
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("no authorization details found");
  }
  console.log(authHeader);

  //2. extract the credentials
  // encoded in base 64
  const based64credentials = authHeader.replace("Basic ", "");
  console.log(based64credentials);

  //3. decode credentials
  const decodedCreds = Buffer.from(based64credentials, "base64").toString(
    "utf-8",
  );
  console.log(decodedCreds); //[username:password]

  const creds = decodedCreds.split(":"); //this point we get the credentials

  // checking users exist or not
  const user = UserModel.getAllUsers().find(
    (u) => u.email === creds[0] && u.password == creds[1],
  ); // it is an array contains two thing- email and password
  if(user){
    next();
  }else{
    return res.status(401).send("Incorrect Credentials");
  }
};

export default basicAuthorizer;