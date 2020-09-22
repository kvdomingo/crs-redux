import {
    DISPATCH_CURRENT_SEMESTER,
    FETCH_ANNOUNCEMENTS_SUCCESS,
    FETCH_ANNOUNCEMENTS_REQUEST,
    FETCH_ANNOUNCEMENTS_FAILURE,
    FETCH_CRS_STATUS_REQUEST,
    FETCH_CRS_STATUS_SUCCESS,
    FETCH_CRS_STATUS_FAILURE,
} from "./crsDataTypes";

const initialState = {
    crsStatus: [],
    currentSemester: [],
    announcements: [],
    announcementsLoading: false,
    announcementsError: "",
    status: [],
    statusLoading: false,
    statusError: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DISPATCH_CURRENT_SEMESTER:
            return {
                ...state,
                currentSemester: action.payload,
            };
        case FETCH_ANNOUNCEMENTS_SUCCESS:
            return {
                ...state,
                announcements: action.payload,
                announcementsLoading: false,
                announcementsError: "",
            };
        case FETCH_ANNOUNCEMENTS_REQUEST:
            return {
                ...state,
                announcementsLoading: true,
                announcementsError: "",
            };
        case FETCH_ANNOUNCEMENTS_FAILURE:
            return {
                ...state,
                announcementsLoading: false,
                announcementsError: action.payload,
            };
        case FETCH_CRS_STATUS_REQUEST:
            return {
                ...state,
                statusLoading: true,
                statusError: "",
            };
        case FETCH_CRS_STATUS_SUCCESS:
            return {
                ...state,
                statusLoading: false,
                status: action.payload,
            };
        case FETCH_CRS_STATUS_FAILURE:
            return {
                ...state,
                statusLoading: false,
                statusError: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
