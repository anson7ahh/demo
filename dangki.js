const express = require("express");
const app = express();
const path = require("path");
const accountModel = require("../module/mongodb.js");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const checkdk = (req, res, next) => {
  const username = req.body.username;
  const pasword = req.body.pasword;
  const paswordagain = req.body.paswordagain;
  accountModel
    .findOne({
      username: username,
    })
    .then((data) => {
      if (data) {
        res.json("da co tk");
      } else if (pasword === paswordagain) {
        accountModel.create({
          username: username,
          pasword: pasword,
          paswordagain: paswordagain,
        });
      } else {
        return res.status(400).json("mat khau ko khop");
      }
    })
    .then((data) => {
      res.json("tao tk thanh cong");
    })
    .catch((err) => {
      return res.status(500).json("that bai");
    });
};

const checkdn = (req, res, next) => {
  const username = req.body.username;
  const pasword = req.body.pasword;

  accountModel
    .findOne({
      username: username,
      pasword: pasword,
    })
    .then((data) => {
      if (data) {
        const token = jwt.sign({ _id: data._id }, "mk");
        return res.json({
          message: "thanh cong",
          token: token,
        });
      } else {
        return res.status(400).json("that bai");
      }
    })

    .catch((err) => {
      res.status(500).json("loi he thong");
    });

  try {
    const token = req.cookies.token;
    const ketqua = jwt.verify(token, "mk");
    accountModel
      .findOne({
        _id: ketqua,
      })
      .then((data) => {
        if (data) {
          req.data = data;
          next();
        } else {
          res.json("chua du quyen");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("token ko hop le");
      });
  } catch (err) {
    return res.redirect("/dangnhap");
  }
};

module.exports = { checkdk, checkdn };
