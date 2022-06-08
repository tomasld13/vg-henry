import React from 'react'
import { useEffect } from 'react'
import { getAllGenres, getAllVideogames } from '../../Redux/actions'
import "./Welcome.css"
import { Link } from 'react-router-dom'
import vD from "../props/the-witcher-fondo.mp4"
import { useDispatch } from 'react-redux'

export function Welcome() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllGenres())
    dispatch(getAllVideogames())
  }, [dispatch])
  return (
    <div className='conteiner'>
    <div className='welcome'>
        <video muted autoPlay preload="true" 
               loop 
               src={vD}>
        </video>
        <Link to="/home">
        <h1>VIDEO GAMES HENRY</h1>
        </Link>
    </div>
    <p id='by'> by Tomás Ledesma</p>
    </div>
  )
}
