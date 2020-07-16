const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

let user = {
  id: "abc1234sfsdfds$32nb**",
  email: "abc@gmail.com",
  pass: "$2b$10$MwLuAqDN8SOpT25UBWvw6O5uwrYKkkmBm5pDj/21ExoM7gSWAr6c6",
};

module.exports = {
  checkLogin: (req, res, next) => {
    if (req.body.email !== user.email) {
      res.render("pages/login", { errs: ["Emai khong chinh xac!"] });
      return;
    }
    bcrypt.compare(req.body.password, user.pass, function (err, result) {
      if (result) {
        let token = jwt.sign({ data: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("userId", token, { signed: true });
        next();
      } else {
        res.render("pages/login", { errs: ["Password khong chinh xac!"] });
        return;
      }
    });
  },

  checkAuth: (req, res, next) => {
    if (!req.signedCookies.userId) {
      res.render("pages/login", { errs: [] });
      return;
    }
    jwt.verify(req.signedCookies.userId, process.env.JWT_SECRET, function (
      err,
      decoded
    ) {
      if (err) throw err;
      if (decoded.data === user.id) {
        next();
      } else {
        res.render("pages/login", { errs: [] });
        return;
      }
    });
  },
};
