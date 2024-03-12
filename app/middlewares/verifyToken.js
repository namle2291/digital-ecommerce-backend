const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (token.startsWith("Bearer")) {

    const tokenString = token.split(" ")[1];

    jwt.verify(tokenString, process.env.JWT_SECRECT, function (err, decoded) {
      if (err) next(err);
      req.user = { _id: decoded._id };
      next();
    });
    
  } else {
    return res.status(500).json({
      success: false,
      // Yêu cầu xác thực
      mesage: "Require Authentication!!!",
    });
  }
}

module.exports = verifyToken;
