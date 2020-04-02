import { initialState } from "../initialState.js";

const SET_USER = "SET_USER";
const SET_USER_DATA = "SET_USER_DATA";
const LOG_OUT = "LOG_OUT";

export const mainPageReducer = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {

        case SET_USER:            
            newState = Object.assign({}, state);
            newState.user = action.user
            return newState;
        
        case SET_USER_DATA:            
            newState = Object.assign({}, state);
            newState.userData = action.userData.userData;
            newState.isOwner = action.userData.isOwner;
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
export const setUserData = (userData) => ({type: SET_USER_DATA, userData: userData});
export const logOut = () => ({type: LOG_OUT});
