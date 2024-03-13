const jwt = require("jsonwebtoken");

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRECT, {
    expiresIn: "30m",
  });
  return token;
}

module.exports = { generateToken };
