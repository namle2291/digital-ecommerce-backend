const isAdmin = (req, res, next) => {
  const { userType } = req.user;
  if (userType === "admin") {
    next();
    return;
  }
  res.json({
    success: false,
    message: "You are not admin!",
  });
};

module.exports = isAdmin;
