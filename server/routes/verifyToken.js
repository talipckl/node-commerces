const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // header içinde bear ksımı için
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // token bearere boşluğunda once berarer ismni kaldırma
    jwt.verify(token, process.env.JWT_SEC_KEY, (error, user) => {
      if (error) res.status(403).json("token geçerli değil");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Token kimliği  sizi doğrulayamadı");
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("izin verilmiyor");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("sadece Adminler işlem yapabilr...");
      }
    });
  };
module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
