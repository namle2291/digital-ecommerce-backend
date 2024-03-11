const jwt = require("jsonwebtoken");

function genarateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRECT, {
    expiresIn: "60s",
  });
  return token;
}

module.exports = { genarateToken };
