import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    
    console.log("==== AUTH DEBUG START ====");
    console.log("HEADERS:", req.headers);
    console.log("COOKIES:", req.cookies);
    console.log("==== AUTH DEBUG END ====");

    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1];

    console.log("COOKIES:", req.cookies);
    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated again",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.id = decode.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export default isAuthenticated;


