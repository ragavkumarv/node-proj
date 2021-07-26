import jwt from "jsonwebtoken";

// custom middle ware
export const auth = (request, response, next) => {
  // Authorizatoin | x-auth-token
  try {
    const token = request.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECERET_KEY); // if does not match throws error
    next();
  } catch (err) {
    response.status(401); // 200 ok  401
    response.send({ err: err.message });
  }
};
