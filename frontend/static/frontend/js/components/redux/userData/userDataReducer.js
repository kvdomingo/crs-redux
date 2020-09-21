import { DISPATCH_USER_DATA } from "./userDataTypes";

const initialState = {
    userData: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPATCH_USER_DATA:
            return { userData: action.payload };
        default:
            return state;
    }
}

export default reducer;
