const express = require("express");
const router = express.Router();
const path = require("path");
const accountModel = require("../module/mongodb.js");
const bodyParser = require("body-parser");
const model = require("mongoose");
const check = require("./dangki.js");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const wed = (app) => {
  router.get("/", (req, res, next) => {
    const duongdanfile2 = path.join(__dirname, "../view/home.html");
    res.sendFile(duongdanfile2);
  });
  router.get("/dangki", (req, res, next) => {
    const duongdanfile1 = path.join(__dirname, "../view/dangki.html");
    res.sendFile(duongdanfile1);
  });
  router.post("/dangki", check.checkdk);

  router.get(
    "/dangnhap",
    (req, res, next) => {
      const duongdanfile = path.join(__dirname, "../view/dangnhap.html");
      res.sendFile(duongdanfile);
    },
    check.checkdn
  );

  return app.use("/", router);
};
module.exports = wed;
