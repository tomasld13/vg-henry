import {GET_ALL_VIDEOGAMES, GET_ALL_GENRES, GET_VIDEO_ID, GET_SEARCH_VIDEOS, CLEAN, CLEAN_ID} from "./actions"
//-------------------------------------------------------//
const initialState = {
    videogames: [],
    genres: [],
    videogameid: {},
    searchvideos: []
}
//-------------------------------------------------------//
export function reducer(state = initialState, {type, payload}){
    switch(type){
        case GET_ALL_VIDEOGAMES:
            return{
                ...state,
                videogames: payload
            }
        case GET_ALL_GENRES:
            return{
                ...state,
                genres: payload
            }
        case GET_VIDEO_ID:
            return{
                ...state,
                videogameid: payload
            }
        case GET_SEARCH_VIDEOS:
            return{
                ...state,
                searchvideos: payload
            }
        case CLEAN:
            return{
                ...state,
                searchvideos: payload
            }
        case CLEAN_ID:
            return{
                ...state,
                videogameid: payload
            }
        default: return state
    }
}