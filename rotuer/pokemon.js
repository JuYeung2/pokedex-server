const express = require('express');
const router = express.Router();
const {Pokeidsearch, Pokemonidsearch} = require('../service/pokeapi');
const Pokemon = require('../models/pokemons');
//api 불러오기,api id 검색
router.post('/idsearch',(req,res) =>{
    Pokeidsearch(req.body.id)
  .then(result => {
    res.status(200).send(result);
  })
  .catch(error => {
    res.status(401).send(err);
  });
});
//db에 저장
async function save() {
    for (let i = 1; i <= 151; i++) {
      try {
        const result = await PokePokeidsearch(i);
        // console.log(result.name);
        await Pokemon.create({
            id: i,
            name: result.name,
            feature: result.feature,
            description: result.description,
            type1: result.type1,
            type2: result.type2,
            imageurl: result.imageurl,
            imagegif: result.imagegif
         });
      } catch (err) {
        console.error(err);
      }
    }
  }
//db에 id로 포켓몬 검색
router.post("/dbidsearch",(req,res) => {
   Pokemonidsearch(req.body.id).then(result => {
    if(result instanceof Error)
        throw result;
    res.status(200).send(result);
}).catch(err => {
    res.status(401).send(err.message);
   })
});
  
//이름으로 api 검색
// router.post('/namesearch',(req,res) => {
//     pokeapi.Pokenamesearch(req.body.name).then(result =>{
//         res.status(200).send(result);
//     }).catch(err => {
//         res.status(401).send(err);
//     })
// })
module.exports = {router,save};