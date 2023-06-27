const express = require("express");
const router = express.Router();
const userSearch = require("../service/userService/userSearch");
const tokenUtil = require("../lib/tokenUtil");
const { isLoggedIn } = require("../lib/loginUtil");

const {
  Pokeclean,
  Pokefull,
  Pokeintimate,
} = require("../service/gameService/pokeBringUp");

// 포켓몬 상태 받아와서 DB에 저장 수정.
//청결

router.patch("/pokeclean", isLoggedIn, async (req, res) => {
  try {
    const tokenbearer = req.headers.authorization;
    const token = tokenbearer.substring(7);
    const myemail = tokenUtil.verifyToken(token).email;
    const user = await userSearch(myemail);
    const myid = user.id;
    const myPokeid = req.body.pokeid;
    const clean = req.body.clean;
    const result = await Pokeclean(myid, myPokeid, clean);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

//포만도
router.patch("/pokefull", isLoggedIn, async (req, res) => {
  try {
    const tokenbearer = req.headers.authorization;
    const token = tokenbearer.substring(7);
    const myemail = tokenUtil.verifyToken(token).email;
    const user = await userSearch(myemail);
    const myid = user.id;
    const myPokeid = req.body.pokeid;
    const full = req.body.full;
    const result = await Pokefull(myid, myPokeid, full);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

//산책
router.patch("/pokeintimate", isLoggedIn, async (req, res) => {
  try {
    const tokenbearer = req.headers.authorization;
    const token = tokenbearer.substring(7);
    const myemail = tokenUtil.verifyToken(token).email;
    const user = await userSearch(myemail);
    const myid = user.id;
    const myPokeid = req.body.pokeid;
    const intimate = req.body.intimate;
    const result = await Pokeintimate(myid, myPokeid, intimate);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;