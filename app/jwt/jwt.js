const jwt = require("jsonwebtoken");

function generateToken(payload, expire = "30s") {
  const token = jwt.sign(payload, process.env.JWT_SECRECT, {
    expiresIn: expire,
  });
  return token;
}

module.exports = { generateToken };
