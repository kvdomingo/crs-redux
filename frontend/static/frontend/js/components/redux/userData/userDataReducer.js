import {
    LOGOUT_USER,
    FETCH_CURRENT_USER_REQUEST,
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_CURRENT_USER_FAILURE,
} from "./userDataTypes";


const initialState = {
    userData: [],
    loggedIn: !!(localStorage.getItem("token")),
    loginLoading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return {
                ...state,
                userData: [],
                loggedIn: false,
            };
        case FETCH_CURRENT_USER_REQUEST:
            return {
                ...state,
                loginLoading: true,
            };
        case FETCH_CURRENT_USER_SUCCESS:
            return {
                ...state,
                userData: action.payload,
                loggedIn: true,
                loginLoading: false,
            };
        case FETCH_CURRENT_USER_FAILURE:
            return {
                ...state,
                userData: [],
                loggedIn: false,
                loginLoading: false,
            };
        default:
            return state;
    }
}

export default reducer;
