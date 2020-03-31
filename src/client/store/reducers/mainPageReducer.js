import { initialState } from "../initialState.js";

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

export const mainPageReducer = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {

        case SET_USER:            
            newState = Object.assign({}, state);
            newState.user = action.user
            return newState;
    
        case LOG_OUT:            
            newState = Object.assign({}, state);
            newState = initialState;
            return newState;

        default:
            return state;
    }
};


export const setUser = (user) => ({type: SET_USER, user: user});
export const logOut = () => ({type: LOG_OUT});
