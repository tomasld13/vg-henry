import React from 'react'
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import "./Game.css"
import star from "../props/estrella.png"

export default function Game(params) {
    const genderStore = useSelector(state => state.genres)
    const {id, name, image, rating, genres} = params.props
    const gender = genderStore.filter(g => genres?.includes(g.id))

    return (
        <div className='container-videoGame'>
          <Link to={`/home/${id}`}>
            <img src={image} alt={name}/>
            <h2 className="titulo" key={id}>{name}</h2>
            <div className='features'>
            <p id='rating-p'><img src={star} alt="estrella-rating"/> {rating}
              {gender.map(g => {
              return(
                <p key={g.id} className="pGender">{g.name}</p>
              )
            })}</p>
            </div>
            </Link>
        </div>
    )
}
