const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js"); // password salt
const jwt = require("jsonwebtoken");
// Register

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(), // password SALT OKAY
  });
  try {
    const saveUsered = await newUser.save();
    res.status(201).json(saveUsered);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN THE

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Credenditlast1");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const Orjpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    Orjpassword !== req.body.password &&
      res.status(401).json("Wrong Credenditlast2");
    // acessToken oluşturma
    const accessToken = jwt.sign(
      {
        // admin veya kullanıcı için
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC_KEY,
      { expiresIn: "2d" }
    );
    ///    token parola
    const { password, ...others } = user._doc; // şifer göstermeme
    res.status(200).json({...others,accessToken}); // obje içine alma olayı
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
