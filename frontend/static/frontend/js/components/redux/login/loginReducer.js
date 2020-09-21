import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./loginTypes";

const initialState = {
    username: "",
    password: "",
    loading: false,
    error: "",
    userData: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                userData: action.payload,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                userData: [],
            };
        default:
            return state;
    }
}

export default reducer;
