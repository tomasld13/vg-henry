const { Router } = require('express');
const { Videogame, Genre, API_KEY } = require("../db")
const axios = require("axios")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
//-------------------------------------------------------//
const getVideogamesAPI = async () => {
        /*let arr = []
        arr = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`).then(data => {return data.data.results})
        */
        let arr = [1,2,3,4,5]
        arr = await Promise.all(arr.map(async num =>{
            let json = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${num}`);
            return json.data.results
        }))
        return arr.flat().map(v => {
            return {
                id:v.id, 
                name:v.name,
                release_date: v.released,
                rating: v.rating,
                platforms: v.platforms.map(p => p.platform.name),
                genres: v.genres,
                image: v.background_image
            }
        })
        /*
        return await  Promise.all(arr.flat().map(async v => {
        let description = await axios.get(`https://api.rawg.io/api/games/${v.id}?key=${API_KEY}`)
        console.log("hola")
        return { 
             id:v.id, 
             name:v.name,
             description: description.data.description,
             release_date: v.released,
             rating: v.rating,
             platforms: v.platforms.map(p => p.platform.name),
             genres: v.genres,
             image: v.background_image
    })) */
}

//-------------------------------------------------------//
router.get("/", async (req, res, next) => {
    const nombre = req.query.name
    if(typeof nombre === "string"){
        try {
            const videosAPI = await getVideogamesAPI()
            let videosDB = await Videogame.findAll({include:{model:Genre}});
            videosDB = videosDB.map(v => {
            return{
                id:v.id, 
                name: v.name,
                description: v.description,
                release_date: v.release_date,
                rating: v.rating,
                platforms: v.platforms,
                genres: v.genres,
                image: v.image
                }
            })
            let allVideos = videosAPI.concat(videosDB)
            allVideos = allVideos.filter(v => ((v.name).toLowerCase()).includes(nombre.toLowerCase()))
            allVideos = allVideos.slice(0,15)
            return allVideos.length > 0 ? res.send(allVideos) : res.send({name: "error_search"})
        } catch (error) {
            return next(error)   
        }
    }else{
        try{
            const videosAPI = await getVideogamesAPI()
            let videosDB = await Videogame.findAll({include:{model:Genre}});
            videosDB = videosDB.map(v => {
                return{
                    id: v.id,
                    name:v.name,
                    genres: v.genres,
                    image: v.image,
                    rating:v.rating,
                    platforms: v.platforms,
                    release_date: v.release_date
                }
            })
            res.send(videosAPI.concat(videosDB))
        }catch(error){
            return next(error)
        }
    }
})
//-------------------------------------------------------//
router.get("/:id", async (req, res, next) => {
    const {id} = req.params
    try {
        if(id.length < 10){
            let videoAPI = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            videoAPI = videoAPI.data
            if(videoAPI){
                return res.send({
                    id:videoAPI.id, 
                    name: videoAPI.name,
                    description: videoAPI.description,
                    rating: videoAPI.rating,
                    platforms: videoAPI.platforms,
                    genres: videoAPI.genres,
                    image: videoAPI.background_image,
                    release_date: videoAPI.released,
                 })
            }
        }else{
            const videoDB = await Videogame.findByPk(id,{include:{model: Genre}});
                if(videoDB) return res.send({
                   id:videoDB.id, 
                   name: videoDB.name,
                   description: videoDB.description,
                   release_date: videoDB.release_date,
                   rating: videoDB.rating,
                   platforms: videoDB.platforms,
                   genres: videoDB.genres,
                   image: videoDB.image
                })
        }
    } catch (error) {
        next(error)
    }
})
//-------------------------------------------------------//
router.post("/", async (req, res, next) => {
    const {name, description, release_date, rating, platforms, image, genres} = req.body
    try {
        let genresArr = await Genre.findAll()
        genresArr = genresArr.filter(g => genres.includes(g.dataValues.name))
        const newVideoGame = await Videogame.create({
            name,
            description,
            release_date,
            rating, 
            platforms,
            image,
        })
        await newVideoGame.setGenres(genresArr.flat())
        res.send(newVideoGame)
    } catch (error) {
        next(error)
    }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
