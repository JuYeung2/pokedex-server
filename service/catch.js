const {User, Pokemon, Mypokemon} = require('../models/index');
async function Catchpoke(userid,pokeid){
    try{
    const user = await User.findOne({
        where: {id : userid}
    });
    if(!user)
        return new Error("유저 정보를 찾을수 없습니다")
    const pokemon = await Pokemon.findOne({
        where: {id : pokeid}
    });
    if(!pokemon)
        return new Error("정확한 포켓몬이 아닙니다.");
    const mypokemon = await Mypokemon.findAndCountAll({
        where: {userid: userid} && {pokeid: pokeid}
    })
    if(mypokemon.count >= 1)
        throw new Error("이미 잡은 포켓몬입니다.");
    await Mypokemon.create({
            userid: userid,
            pokeid: pokeid,
        });
    return ("잡기 성공");
    } catch(err) {
        return err;
    }
}

module.exports = Catchpoke;