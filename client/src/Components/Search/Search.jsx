import React from 'react';
import {useState} from "react"
import {useSelector} from "react-redux"
import {Nav} from "../Nav/Nav"
import Game from "../Game/Game.jsx"
import { Footer } from "../Footer/Footer"
import "./Search.css"
export function Search() {
    const searchVideos = useSelector(state => state.searchvideos)
    const genreState = useSelector(state => state.genres)
    //Se almacenan en un areglo los juegos que coincidieron en la busqueda con lo ingresado por le usuario.
    let arr = []
    searchVideos.map(v => arr.push(v))
    let videos = arr
    //El estado acepta modificaciones en el orden alfabetico, por rating, por plataforma y por genero
    //de la misma manera que Home.jsx
    const [state, setState] = useState({
        order:"",
        rating: "",
        platforms: "",
        genres: "",
        origin: "",
        notFound: 0
    })
    //Se declara un arreglo de plataformas que ya estas no varian
    let platformState = [
        "PC",
        "Xbox Series S/X",
        "PlayStation 4",
        "PlayStation 3",
        "Xbox 360",
        "Xbox One",
        "PlayStation 5",
        "Nintendo Switch",
        "Linux",
        "macOS",
        "Android",
        "iOS",
        "Xbox",
        "PS Vita",
        "Web"
    ]
    //-------------------------------------------------------//
    let gif = require("../props/crash-sad-unscreen.gif")
    //-------------------------------------------------------//
    function handleInputChange(e){
        setState({
            ...state,
            [e.target.id]: e.target.value,
        })
    }
    //-------------------------------------------------------//
    //Se ordena el resultado alfabeticamente de manera ascendente o descendente
    switch(state.order){
        case "Descendente":
            videos = videos.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(a.name < b.name){
                    return -1;
                }
                return 0;
            })
            break
        case "Ascendente":
            videos = videos.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(a.name < b.name){
                    return 1;
                }
                return 0;
            })
            break
        default:
            videos = arr;
            break
    }
    //-------------------------------------------------------//
    //Se ordena el resultado por el valor del rating, ascendente o descendentemente 
    switch(state.rating){
        case "Descendente-rating":
            videos = videos.sort(function(a,b){
                if(a.rating > b.rating){
                    return -1;
                }
                if(a.rating < b.rating){
                    return 1;
                }
                return 0;
            })
            break
        case "Ascendente-rating":
            videos = videos.sort(function(a,b){
                if(a.rating > b.rating){
                    return 1;
                }
                if(a.rating < b.rating){
                    return -1;
                }
                return 0;
            })
            break
        default:
            videos = arr;
            break
    }
    //-------------------------------------------------------//
    //Se filtran los resultados por plataforma o genero (igual que en home.jsx)
    if(state.platforms !== ""){
        state.origin = "all"
        videos = videos.filter(v => v.platforms.includes(state.platforms))
        document.getElementById("genres").value = ""
        document.getElementById("origin").value = "all"
        if(videos.length === 0) {
            state.notFound = 404
        }else{
            state.notFound = 0
        }
    }else if(state.genres !== ""){
        state.origin = "all"
        videos = videos.filter(v => v.genres.includes(parseInt(state.genres)))
        document.getElementById("platforms").value = ""
        document.getElementById("origin").value = "all"
        if(videos.length === 0) {
            state.notFound = 404
        }else{
            state.notFound = 0
        }
    }else{
        state.notFound = 0
        videos = arr
    }
    //-------------------------------------------------------//
    if(state.origin === "api"){
        videos = videos.filter(v => typeof v.id === "number")
        document.getElementById("platforms").value = ""
        document.getElementById("genres").value = ""
        if(videos.length < 1) {
            state.notFound = 404
        }else{
            state.notFound = 0
        }
    }else if(state.origin === "db"){
        videos = searchVideos.filter(v => typeof v.id === "string")
        document.getElementById("platforms").value = ""
        document.getElementById("genres").value = ""
        if(videos.length < 1) {
            state.notFound = 404
        }else{
            state.notFound = 0
        }
    }else if(state.origin === "all" && (state.platforms === "" && state.genres === "")){
        state.notFound = 0
        videos = arr
    }
    //-------------------------------------------------------//
    return (
      <div className="div-container">
          <Nav></Nav>
            <div className="container-filter">
            <select id="order" onChange={(e) => handleInputChange(e)}>
                <option value="Descendente">A-Z</option>
                <option value="Ascendente">Z-A</option>
            </select>
            <select id="rating" onChange={(e) => handleInputChange(e)}>
                <option value="Default-rating">Rating</option>
                <option value="Descendente-rating">Mejor Puntuados</option>
                <option value="Ascendente-rating">Peor Puntuados</option>
            </select>
                <select id="platforms"onChange={(e) => {state.origin ="all"; handleInputChange(e)}}>
                            <option value="">Plataformas</option>
                            {platformState&&platformState.map(p => {
                                return(
                                    <option key={p} value={p}>{p}</option>
                                )
                            })}</select>
                <select id="genres" onChange={(e) => {state.platforms=""; state.origin ="all"; handleInputChange(e)}}>
                            <option value="">Generos</option>
                            {genreState&&genreState.map(g => {
                                return(
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                )
                            })}</select>
                <select id="origin" onChange={(e) => {state.platforms=""; state.genres=""; handleInputChange(e)}}>
                            <option id="origin" value="all">Origen</option>
                            <option id="origin" value="api">API</option>
                            <option id="origin" value="db">DB</option>
                </select>
            </div>
            {searchVideos.length < 1? 
            <div className="circulo">
                <div className="circulo1 circulo-hijo"></div>
                <div className="circulo2 circulo-hijo"></div>
                <div className="circulo3 circulo-hijo"></div>
                <div className="circulo4 circulo-hijo"></div>
                <div className="circulo5 circulo-hijo"></div>
                <div className="circulo6 circulo-hijo"></div>
                <div className="circulo7 circulo-hijo"></div>
                <div className="circulo8 circulo-hijo"></div>
                <div className="circulo9 circulo-hijo"></div>
                <div className="circulo10 circulo-hijo"></div>
                <div className="circulo11 circulo-hijo"></div>
                <div className="circulo12 circulo-hijo"></div>
          </div>
            : searchVideos[0].name !== "error_search" && state.notFound !== 404 ? 
            //Se consulta si hay al menos 1 juego que haya coincidido con la busqueda, sino se muestra un error.
            <div>
                <div className="container-search">
                {videos && videos.map((v) => {
                    return(
                        <Game key={v.id} props={{
                            id: v.id, 
                            name: v.name, 
                            image: v.image, 
                            rating: v.rating,
                            genres: v.genres,
                            platforms: v.platforms
                        }}
                        />
                        )   
                    })
                }
                </div>
            </div>:
            <div className="not-found">
            <h1>No se encontraron resultados :(</h1>
            <img src={gif} alt="imagen-not-found"/>
           </div>}
           <Footer></Footer>
      </div>
    )
}
