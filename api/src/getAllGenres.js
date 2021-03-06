const axios = require("axios")
const { Genre } = require("./db.js")

async function getAllGenres(API_KEY){
    const existen = await Genre.findAll()
    if(existen.lentgh > 1) return "Ya hay generos cargados"
    else{
        try {
            (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results.map(g => Genre.create({id: g.id, name: g.name}))
            console.log("Generos cargados correctamente")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    getAllGenres
}