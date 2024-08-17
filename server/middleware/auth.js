const jwt = require("jsonwebtoken");

const tokenControl = (req, res, next) => {
  // Extract token from Authorization header
  let token = req.headers.authorization;

  // Check if token is provided
  if (!token)
    return res.status(401).json({ status: false, message: "Unauthorized" });

  // Extract token if it includes "Bearer"
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  } else {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  // Verify the token
  jwt.verify(token, process.env.MYKEY, (err, decoded) => {
    if (err)
      return res.status(401).json({ status: false, message: "Unauthorized" });

    // Attach decoded data to request object
    req.user = decoded;
    next();
  });
};

module.exports = tokenControl;
