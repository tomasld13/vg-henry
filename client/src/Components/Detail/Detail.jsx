import React from 'react'
import {useEffect} from "react"
import {useLocation} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getAllGenres, getVideoID} from "../../Redux/actions.js"
import {Nav} from "../Nav/Nav"
import star from "../props/estrella.png"
import "./Detail.css"

export function Detail() {
    const v = useSelector(state => state.videogameid)
    const gen = useSelector(state => state.genres)
    const dispatch = useDispatch()
    //-------------------------------------------------------//
    //Se acomoda la fecha en formato dd/mm/aaaa
    let date = v.release_date&&v.release_date.slice(0,10).split("-");
    date = v.release_date&&date[2]+"-"+date[1]+"-"+date[0]
    //-------------------------------------------------------//
    //Se toma el id desde la url y se envia la peticion al servidor.
    let id = useLocation()
    id = id.pathname.slice(6,id.length)
    //-------------------------------------------------------//
    //Se pide el juego y en caso de que no haya generos en el store, se hace un dispatch
    useEffect(() => {
      dispatch(getVideoID(id))
      if(gen.length === 0) dispatch(getAllGenres())
    },[])
    //-------------------------------------------------------//
    return (
          <div>
            <Nav></Nav>
            {v.name ?
            <div className='conteiner-detail'>
            <div className='detail'>
            <img src={v.image} alt={v.name}/>
            <h1 className="title-detail" key={id}>{v.name}</h1>
            <div className='features'>
            <div className='container-description'>
            {typeof v.id === "number" ? <p className='description' dangerouslySetInnerHTML={{__html: v.description}}/> :
            <p className='description'><p>{v.description}</p></p>}
            </div>
            <div className='not-description'>
            <p className='type-detail'><img src={star} alt="estrella-rating"/> {v.rating} <br/><br/> 
              Generos: {v.genres.map(g => {
                let gender = gen.find(x => x.id === g)
              return(
                <p key={typeof gender === "string" ? gender : gender?.id} className="pGender">{gender?.name}</p>
              )
            })}</p>
            <p className='platforms type-detail'>Plataformas: {v.platforms.map(plat => {
              return(
                <p key={typeof plat === "string" ? plat : plat.id}>{typeof plat === "string" ? plat : plat.platform?.name}</p>
              )
            })}</p>
            <p className='type-detail'>Fecha de Creación:<p className='release-detail'>{date}</p></p>
            </div>
            </div>
            </div>
          </div>
            :<div className="circulo">
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
          }      
          </div>
    )
}
