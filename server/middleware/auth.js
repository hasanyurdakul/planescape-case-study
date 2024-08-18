const jwt = require("jsonwebtoken");

// Tokenin sağlanıp sağlanmadığını ve geçerli olup olmadığını kontrol eden middleware
const tokenControl = (req, res, next) => {
  // Tokeni header'dan destruct etme
  let token = req.headers.authorization;

  // Token yoksa 401 döndür
  if (!token)
    return res.status(401).json({ status: false, message: "Unauthorized" });

  // Token Bearer ile başlıyorsa, Bearer'ı kaldır
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  } else {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  // Tokeni doğrula
  jwt.verify(token, process.env.MYKEY, (err, decoded) => {
    if (err)
      return res.status(401).json({ status: false, message: "Unauthorized" });

    // Decode edilmiş tokeni req.user'a ekle
    req.user = decoded;
    next();
  });
};

module.exports = tokenControl;
