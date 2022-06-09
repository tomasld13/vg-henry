import React from 'react'
import "./Create.css"
import {getAllGenres, getAllVideogames, postVideo} from "../../Redux/actions.js"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import { Nav } from '../Nav/Nav'
import { Footer } from "../Footer/Footer.jsx"

export function Create() {
    const genreState = useSelector(state => state.genres)
    const videos = useSelector(state => state.videogames)
    const dispatch = useDispatch()
    //-------------------------------------------------------//
    //Se declaran las plataformas en un arreglo ya que estas no varian
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
    //let date = new Date();
    //date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    //-------------------------------------------------------//
    //Se delcaran los estados para manejar el formulario
    const [error,setError] = useState({
    })
    const [state, setState] = useState({
        title: "",
        description: "",
        release_date: "",
        genres: [],
        platforms: [],
        rating: 0,
        image: "https://www.trecebits.com/wp-content/uploads/2020/11/Error-404.jpg"
    })
    //-------------------------------------------------------//
    //Solo en caso de que no haya juegos o generos en el state se hace un dispatch de los mismos.
    useEffect(() => {
        if(genreState.length === 0){
            dispatch(getAllGenres())
        }
        dispatch(getAllVideogames())
    },[])
    //-------------------------------------------------------//
    //Se chequea que valor tiene el evento que llamo al handleInputChange y dependiendo cual sea el mismo
    //se ejecuta un código, ya que a los arreglos hay que pushearles los valores que ingresan.
    function handleInputChange(e){
        switch(e.target.id){
            case "genres":
                if(!state.genres.includes(e.target.value)){
                    setState({
                        ...state,
                        genres: [...state.genres, e.target.value]
                    })
                }
                break
            case "platforms":
                if(!state.platforms.includes(e.target.value)){
                    setState({
                        ...state,
                        platforms: [...state.platforms, e.target.value]
                    })
                }
                break
            case "remove-genres":
                document.getElementById("genres").value= ""
                state.genres.pop()
                validate("genres")
                break
            case "remove-platforms":
                document.getElementById("platforms").value= ""
                state.platforms.pop()
                validate("platforms")
                break
            default:
                setState({
                    ...state,
                    [e.target.id]: e.target.value
                })
                break
        }
        //Se validan las entradas
        setError(validate({
            ...state,
            [e.target.id]: e.target.value
        }))
    }
    //-------------------------------------------------------//
    //Si algun input no cumple con lo pedido se crea un error para luego renderizarlo.
    let errImg = ""
    function validate(input){
        let errores = {}
        //El titulo no puede: ser nulo o incluir caracteres peligrosos.
        if(!input.title || input.title?.length < 1 || input.title?.includes("<") || input.title?.includes(">") || input.title?.includes("@")) errores.title = "Debes ingresar un titulo sin caracteres especiales."
        
        //La descripción no puede ser: Menor a 50 caracteres, tener menos de 5 palabras, ni incluir caracteres peligrosos.
        if(!input.description || input.description?.length < 50 || input.description?.split(" ").length <= 5 || input.description?.includes("<") || input.description?.includes(">") || input.description?.includes("@")) errores.description = "Debes ingresar una descripcion de al menos 50 caracteres con más de 5 palabras, sin caracteres especiales."
        
        //Al menos un genero es necesario.
        if(input.genres?.length < 1) errores.genres = "Debes seleccionar al menos un genero."
        
        //Al menos una plataforma es necesaria.
        if(input.platforms?.length < 1) errores.platforms = "Debes ingresar al menos una plataforma."
        
        //El rating no puede ser mayor a 5 ni menor a 0.
        if(input.rating > 5 || input.rating < 0) errores.rating = "El valor debe estar dentro del rango de 0-5"
        
        //Si la imagen retorna un error es porque se cargo un link invalido, por lo que se solicita uno nuevo.
        if(input._reactName === "onError") errImg = "Debes ingresar una dirección de imagen valida."
        if(input._reactName === "onLoad") errImg = ""
        errores.image = errImg
        
        return errores
    }
    //-------------------------------------------------------//
    //Chequeo que el nombre del juego a crear no exista en mi mi base o en la API.
    function inVideos(){
        let inVideos = videos.filter(v => v.name === state.title)
        return inVideos.length > 0
    }
    //-------------------------------------------------------//
    //Se interrumpe el reseteo del formulario al apretar el submit.
    //Se valida el estado, en caso de no encontrar ningun error y que el nombre
    //del juego no exista ya, se manda la petición post para crear el mismo.
    //Caso contrario se envia un alert avisandole al usuario del problema.
    function handleSubmit(e){
        e.preventDefault()
        validate(state)
        if(!error.title && !error.description && !error.genres && !error.platforms && error.image.length === 0 && !inVideos()){
            postVideo(state)
            alert("¡Tu juego fue cargado exitosamente!")
            window.location.reload()
        }else if(inVideos()){
            alert("Ya existe un juego con ese nombre.")
        }else{
            alert("¡Todavía no completaste correctamente el formulario, todos los campos son obligatorios!")
        }
    }
    //-------------------------------------------------------//
    return (
        <div>
            <Nav></Nav>
            <div className="container-form-container">
                <form id="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className='container-content-form'>
                    <div className='content-form'>
                        <label>Título</label>
                        <input type="text" id="title" name="title" required onChange={(e) => handleInputChange(e,"title")}/>
                        {error.title? <p className='error'>{error.title}</p> : null}
                    </div>
                    <div id="div_textarea" className='content-form'>
                        <label>Descripción</label>
                        <textarea name="description" id="description" rows="5" cols="25" required onChange={(e) => handleInputChange(e)}></textarea>
                        {error.description? <p className='error'>{error.description}</p> : null}
                    </div>
                    <div className='content-form'>
                        <label>Generos</label>
                        <div>
                        <label className='label_black' id="remove-genres">{state.genres?.length >= 1 ? state.genres?.map(g => g + "-") : "Elige los generos..."}</label><button type="button" id="remove-genres" onClick={(e) => handleInputChange(e)}>x</button>
                        </div>
                        <select id="genres" required onChange={(e) => handleInputChange(e)}>
                            <option value="" disabled="false"></option>
                            {genreState&&genreState.map(g => {
                                return(
                                    <option key={g.id} value={g.name}>{g.name}</option>
                                )
                            })}</select>
                        {error.genres? <p className='error'>{error.genres}</p> : null}
                    </div>
                    <div className='content-form'>
                    <div>
                    <label className='label_black' id="remove-platforms">{state.platforms?.length >= 1 ? state.platforms?.map(p => p+"-") : "Elige las plataformas..."}</label><button type="button" id="remove-platforms" onClick={(e) => handleInputChange(e)}>x</button>
                    </div>    
                    <select id="platforms" onChange={(e) => handleInputChange(e)}>
                            <option value=""  disabled="false"></option>
                            {platformState&&platformState.map(p => {
                                return(
                                    <option key={p} value={p}>{p}</option>
                                )
                            })}</select>
                        {error.platforms? <p className='error'>{error.platforms}</p> : null}
                    </div>
                    <div className='content-form'>
                        <label>Fecha de Lanzamiento</label>
                        <input type="date" pattern="\d{4}-\d{2}-\d{2}" id="release_date" name="release_date" min="1958-01-01" max="2023-01-01" required onChange={(e) => handleInputChange(e)}/>
                    </div>
                    <div className='content-form'>
                        <label>Rating</label>
                        <input type="number" step={0.1} id="rating" name="rating" required onChange={(e) => handleInputChange(e)}/>
                        {error.rating ? <p className='error'>{error.rating }</p> : null}
                    </div>
                    <div className='content-form'>
                        <label>Imagen</label>
                        <input type="text" id="image" name="imagen" required onChange={(e) => handleInputChange(e)}/>
                    </div>
                    </div>
                    <div>
                        {error.image?.length > 0 ? <p className='error'>{error.image}</p> : null}
                    <div className='end'>
                        <img id="img_end" src={state.image} alt="image_juego" onError={(e) => validate(e)} onLoad={(e) => validate(e)}></img>
                        <button type="submit" value="Enviar" className='input_send'>Enviar</button>
                    </div>
                    </div>
                </form>
            </div>
            <Footer></Footer>
        </div>
    )
}
