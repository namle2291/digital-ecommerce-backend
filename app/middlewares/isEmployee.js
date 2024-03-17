const isEmployee = (req, res, next) => {
  const { userType } = req.user;
  if (userType === "employee" || "admin") {
    next();
    return;
  }
  res.json({
    success: false,
    message: "You are not employee!",
  });
};

module.exports = isEmployee;
