const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    const tokenString = token.split(" ")[1];

    jwt.verify(tokenString, process.env.JWT_SECRECT, function (err, decoded) {
      if (err) {
        const error = Error("token expired!");
        return res.status(401).json({
          success: false,
          mesage: "token expired!",
        });
      }

      const { _id, userType } = decoded;
      req.user = { _id, userType };
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      // Yêu cầu xác thực
      mesage: "Require Authentication!!!",
    });
  }
}

module.exports = verifyToken;
