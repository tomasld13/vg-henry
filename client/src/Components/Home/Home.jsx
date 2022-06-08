import React from 'react';
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {getAllVideogames, getAllGenres, cleanID} from "../../Redux/actions.js"
import {Nav} from "../Nav/Nav"
import Game from "../Game/Game.jsx"
import arrow from "../props/arrow-icon-b.png"
import "./Home.css"
import { Footer } from "../Footer/Footer.jsx"

export function Home(){

    const dispatch = useDispatch()
    const [state, setState] = useState({
        order:"",
        rating: "",
        page: 0,
        platforms: "",
        genres: "",
        origin: "all",
        notFound: 0
    })
    const videoState = useSelector(state => state.videogames)
    const genreState = useSelector(state => state.genres)
    let videosOrigin = videoState
    //Seteo las plataformas en un arreglo ya que estas no varian.
    const platformState = [
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
    //Uso la siguiente función para dividir el arreglo de juegos en 15,
    //de esta manera logro que solo se visualicen 15 juegos por página.
    let page = -1;
    function quince(array){
        if(array?.length === 0) return []
        let paginas = Math.floor(array.length / 15)
        let arr = []
        let inicio = 0;
        let cut = 15;
        while(paginas >= 0){
            let cortado = array.slice(inicio, cut)
            if(cortado.length === 0) break
            arr.push(cortado)
            inicio = cut;
            cut+=15
            paginas-=1
        }
        return arr
    }
    let arr = quince(videosOrigin)
    let videos = arr[state.page] 
    //-------------------------------------------------------//
    let gif = require("../props/crash-sad-unscreen.gif")
    //-------------------------------------------------------//
    useEffect(() => {
        if(!videoState || videosOrigin.length === 0){
            dispatch(getAllGenres())
        }
        if(!genreState || genreState.length === 0){
            dispatch(getAllVideogames())
        }
        //Se llama a cleanID para borrar la información del ultimo juego en el que pedimos los detalles
        //para que al entrar en details con el proximo juego no se vuelva a ver la información del anterior
        //hasta que vuelva a cargar el siguiente.
        dispatch(cleanID())
    }, [])
    //-------------------------------------------------------//
    function handleInputChange(e){
        setState({
            ...state,
            [e.target.id]: e.target.value,
        })
    }
    //-------------------------------------------------------//
    //Modifico el orden alfabetico.
    switch(state.order){
        case "Ascendente":
            videos = videosOrigin.sort(function(a,b){
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
            videos = videosOrigin.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(a.name < b.name){
                    return -1;
                }
                return 0;
            })
            break
    }
    //-------------------------------------------------------//
    //Modifico el orden en caso que se el usuario elija un ordenamiento por rating.
    switch(state.rating){
        case "Descendente-rating":
            videos = videosOrigin.sort(function(a,b){
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
            videos = videosOrigin.sort(function(a,b){
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
            videos = arr[state.page];
            break
    }
    //-------------------------------------------------------//
    //Modifico los juegos que se muestran dependiendo el filtro que aplique el usuario.
    //ya sea por plataforma o por genero. Si elije uno, el otro vuelve a tener un valor vacío,
    //ya que no se pueden aplicar ambos filtros en simultaneo.
    if(state.platforms !== ""){
        let plat = videosOrigin.filter(v => v.platforms.includes(state.platforms))
        arr = quince(plat)
        videos = arr[state.page]
        document.getElementById("page").value = state.page
        document.getElementById("genres").value = ""
        document.getElementById("origin").value = "all"
        if(!videos || videos.length === 0) {
            state.notFound = 404
        }else{
            state.notFound = 0
        }
    }else if(state.genres !== ""){
        let gen = videosOrigin.filter(v => v.genres.includes(parseInt(state.genres)))
        arr = quince(gen)
        videos = arr[state.page]
        document.getElementById("page").value = state.page
        document.getElementById("platforms").value = ""
        document.getElementById("origin").value = "all"
        if(!videos || videos.length === 0) {
            state.notFound = 404
        }else{
            state.notFound = 0
        }
    }else{
        //En caso de que no se seleccione ningun filtro los juegos se vuelven a mostrar con normalidad.
        if(document.getElementById("page")!== null) document.getElementById("page").value = state.page
        arr = quince(videosOrigin)
        videos = arr[state.page]
    }
    //-------------------------------------------------------//
    //Se muestran los juegos filtrando si su origen es de la API o de la DataBase. En el caso que no se encuentre ninguno
    //Se le avisa al usuario y se resetea el origin.
    if(state.origin === "api"){
        videos = videos.filter(v => typeof v.id === "number")
        document.getElementById("page").value = state.page
        document.getElementById("platforms").value = ""
        document.getElementById("genres").value = ""
        if(!videos || videos.length < 1) {
            state.notFound = 404
        }else{
            state.notFound = 0
        }
    }else if(state.origin === "db"){
        let dbs = videosOrigin.filter(v => typeof v.id === "string")
        arr = quince(dbs)
        videos = arr[state.page]
        document.getElementById("page").value = state.page
        document.getElementById("platforms").value = ""
        document.getElementById("genres").value = ""
        if(!videos || videos.length < 1) {
            state.notFound = 404
        }else{
            state.notFound = 0
        }
    }else if(state.platforms === "" && state.genres === ""){
        if(document.getElementById("page")!== null) document.getElementById("page").value = state.page
        videos = arr[state.page]
        state.notFound = 0
    }
    //-------------------------------------------------------//
    return(
        <div className="div-container">
            <Nav id="top" onClick={(e) => handleInputChange(e,"search")}></Nav>
            <div className="container-filter">
                <select id="order" onChange={(e) => handleInputChange(e)}>
                    <option value="Descendente">A-Z</option>
                    <option value="Ascendente">Z-A</option>
                </select>
                <select id="rating" onChange={(e) => handleInputChange(e)}>
                    <option value="">Rating</option>
                    <option value="Descendente-rating">Mejor a Peor</option>
                    <option value="Ascendente-rating">Peor a Mejor</option>
                </select>
                {<select id="platforms" onChange={(e) => {state.page = 0; state.origin ="all"; state.genres="";handleInputChange(e)}}>
                            <option value="">Plataformas</option>
                            {platformState&&platformState.map(p => {
                                return(
                                    <option key={p} value={p}>{p}</option>
                                )
                            })}</select>}
                <select id="genres" onChange={(e) => {state.page = 0; state.platforms=""; state.origin ="all"; handleInputChange(e)}}>
                            <option value="">Generos</option>
                            {genreState&&genreState.map(g => {
                                return(
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                )
                            })}</select>
                <select id="origin"  onChange={(e) => {state.page = 0; state.platforms=""; state.genres=""; handleInputChange(e)}}>
                            <option id="origin" value="all">Origen</option>
                            <option id="origin" value="api">API</option>
                            <option id="origin" value="db">DB</option>
                </select>
                </div>
                <div className="container-filter">
                <select id="page" onChange={(e) => handleInputChange(e)}>
                    {arr&&arr.map(v => {
                        page++
                        return (
                            <option key={page} value={page}>Pagina: {page+1}</option>
                        )
                    })}
                </select>
                </div>
            {videoState.length < 1 ? 
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
            : state.notFound === 404 ? <div className="not-found">
                                        <h1>No se encontraron resultados :(</h1>
                                        <img src={gif} alt="imagen-not-found"/>
                                       </div>
            :
            <div className="container-container-home">
                <div className="container-home">
                {videos && videos.map((v) => {
                    return(
                        <Game key={v.id} props={{
                            id: v.id, 
                            name: v.name, 
                            image: v.image, 
                            rating: v.rating,
                            genres: v.genres
                        }}
                        />
                        )   
                    })
                }
                </div>
                <div className="container-filter">
                <a id="subir" href="#top"><img src={arrow} alt="arrow-up"/></a>
                </div>
            </div>}
            <Footer></Footer>
        </div>
    )
}