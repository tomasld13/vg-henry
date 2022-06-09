const axios = require("axios")
const { Genre } = require("./db.js")

async function getAllGenres(API_KEY){
    const existen = Genre.findAll()
    if(existen.lentgh > 1) return "Ya hay generos cargados"
    try {
        (await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results.map(g => Genre.create({id: g.id, name: g.name}))
        console.log("Generos cargados correctamente")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllGenres
}