import { DISPATCH_CRS_STATUS, DISPATCH_CURRENT_SEMESTER } from "./crsDataTypes";

const initialState = {
    crsStatus: [],
    currentSemester: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPATCH_CRS_STATUS:
            return {
                ...state,
                crsStatus: action.payload,
            };
        case DISPATCH_CURRENT_SEMESTER:
            return {
                ...state,
                currentSemester: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
