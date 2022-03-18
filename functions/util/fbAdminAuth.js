module.exports = (req, res, next) => {
  if (req.user.admin === true) {
    return next();
  } else {
    return res.status(403).json("Unauthorized: not admin.");
  }
};
