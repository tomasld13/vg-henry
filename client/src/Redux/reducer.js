import {GET_ALL_VIDEOGAMES, GET_ALL_GENRES, GET_VIDEO_ID, GET_SEARCH_VIDEOS, CLEAN, CLEAN_ID, SET_PAGE, SET_RATING, SET_PLATFORMS, SET_GENRES, SET_ORIGIN, SET_ORDER} from "./actions"
//-------------------------------------------------------//
const initialState = {
    videogames: [],
    genres: [],
    videogameid: {},
    searchvideos: [],
    order: "Descendente",
    rating: "",
    platforms: "",
    genres_filter: "",
    origin: "all",
    page: 0,
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
        case SET_ORDER:
            return{
                ...state,
                order: payload
            }
        case SET_RATING:
            return{
                ...state,
                rating: payload
            }
        case SET_PLATFORMS:
            return{
                ...state,
                platforms: payload
            }
        case SET_GENRES:
            return{
                ...state,
                genres_filter: payload
            }
        case SET_ORIGIN:
            return{
                ...state,
                origin: payload
            }
        case SET_PAGE:
        return{
            ...state,
            page: payload
        }
        default: return state
    }
}