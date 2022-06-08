import axios from "axios"
//-------------------------------------------------------//
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES"
export const GET_ALL_GENRES = "GET_ALL_GENDERS"
export const GET_VIDEO_ID = "GET_ALL_VIDEO_ID"
export const GET_SEARCH_VIDEOS = "GET_SEARCH_VIDEOS"
export const POST_VIDEO = "POST_VIDEO"
export const CLEAN = "CLEAN"
export const CLEAN_ID = "CLEAN_ID"
//-------------------------------------------------------//
export const getAllVideogames = () => {
    return async function (dispatch) {
      return(
        await axios("/api/videogames")
        .then(data => {
          const videos = data.data.map((v) => ({
            id: v.id, 
            name: v.name, 
            image: v.image, 
            rating: v.rating, 
            genres: v.genres.map(g => g.id),
            release_date: v.release_date,
            platforms: v.platforms}))
          dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: videos
        })
      })
    )
  };
};
//-------------------------------------------------------//
export const getAllGenres = () => {
    return async function (dispatch) {
      return(
        axios("/api/genres")
        .then(data => {
          dispatch({
            type: GET_ALL_GENRES,
            payload: data.data
        })
      })
    )
  };
};
//-------------------------------------------------------//
export const getVideoID = (id) => {
  return async function (dispatch) {
    return(
      await axios(`/api/videogames/${id}`)
      .then(data => {
        const video = {
          id: data.data.id, 
          name: data.data.name, 
          image: data.data.image, 
          rating: data.data.rating, 
          genres: data.data.genres.map(g => g.id), 
          platforms: data.data.platforms,
          release_date: data.data.release_date,
          description: data.data.description}
        dispatch({
          type: GET_VIDEO_ID,
          payload: video
      })
    })
  )
};
};
//-------------------------------------------------------//
export const getSearchVideos = (name) => {
  return async function (dispatch) {
    return(
      await axios(`/api/videogames?name=${name}`)
      .then(data => {
        const videos = Array.isArray(data.data) ? data.data.map((v) => ({
          id: v.id, 
          name: v.name, 
          image: v.image, 
          rating: v.rating, 
          genres: v.genres.map(g => g.id),
          release_date: v.release_date, 
          platforms: v.platforms})) : [data.data]
        dispatch({
          type: GET_SEARCH_VIDEOS,
          payload: videos
      })
    })
  )};
}
//-------------------------------------------------------//
export const postVideo = async (video) =>{
  try {
    await axios.post("/api/videogames", 
      {
        name: video.title,
        description: video.description,
        genres: video.genres,
        platforms: video.platforms,
        release_date: video.release_date,
        rating: video.rating,
        image: video.image
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  } catch (error) {
    console.log(error)
  }   
  
}
//-------------------------------------------------------//
export const clean = () => {
  return{
    type: CLEAN,
    payload: []
  }
}
//-------------------------------------------------------//
export const cleanID = () => {
  return{
    type: CLEAN_ID,
    payload: {}
  }
}