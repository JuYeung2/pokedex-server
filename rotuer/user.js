const express = require("express");
const router = express.Router();
const login = require("../service/login");
const signup = require("../service/signup");
const update = require("../service/update");
const change = require("../service/find");
//로그인
router.post("/login", (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  login(userid, password)
    .then((result) => {
      res.set("token", result);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
//회원가입
router.post("/signup", (req, res) => {
  signup(req.body)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
//닉네임 변경
router.patch("/update", (req, res) => {
  const userid = req.body.userid;
  const newNickname = req.body.nickname;
  update(userid, newNickname)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
//비밀번호 찾기(변경)
router.patch("/find", async (req, res) => {
  const { nickname, userid, newPassword } = req.body;

  try {
    const result = await change(nickname, userid, newPassword);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(401).send(err.message);
  }
});

module.exports = router;
