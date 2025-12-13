// Example middleware
module.exports = function (req, res, next) {
  // Example: log request method and URL
  console.log(`${req.method} ${req.url}`);
  next();
};
