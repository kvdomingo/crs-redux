import {
    FETCH_ANNOUNCEMENTS_SUCCESS,
    DISPATCH_CURRENT_SEMESTER,
    FETCH_ANNOUNCEMENTS_FAILURE,
    FETCH_ANNOUNCEMENTS_REQUEST,
    FETCH_CRS_STATUS_REQUEST,
    FETCH_CRS_STATUS_SUCCESS,
    FETCH_CRS_STATUS_FAILURE,
} from "./crsDataTypes";
import axiosInstance from "../../axios/axiosDefault";

export const dispatchCurrentSemester = data => ({
    type: DISPATCH_CURRENT_SEMESTER,
    payload: data,
});

export const fetchAnnouncementsSuccess = data => ({
    type: FETCH_ANNOUNCEMENTS_SUCCESS,
    payload: data,
});

export const fetchAnnouncementsRequest = () => ({
    type: FETCH_ANNOUNCEMENTS_REQUEST,
});

export const fetchAnnouncementsFailure = () => ({
    type: FETCH_ANNOUNCEMENTS_FAILURE,
});

export const fetchCrsStatusRequest = () => ({
    type: FETCH_CRS_STATUS_REQUEST,
});

export const fetchCrsStatusSuccess = data => ({
    type: FETCH_CRS_STATUS_SUCCESS,
    payload: data,
});

export const fetchCrsStatusFailure = () => ({
    type: FETCH_CRS_STATUS_FAILURE,
});

export const fetchAnnouncements = () => dispatch => {
    dispatch(fetchAnnouncementsRequest());
    axiosInstance
        .get("/announcements")
        .then(res => dispatch(fetchAnnouncementsSuccess(res.data)))
        .catch(err => dispatch(fetchAnnouncementsFailure(err.message)));
};

export const fetchCrsStatus = () => dispatch => {
    dispatch(fetchCrsStatusRequest());
    axiosInstance
        .get("/status")
        .then(res => dispatch(fetchCrsStatusSuccess(res.data)))
        .catch(err => dispatch(fetchCrsStatusFailure(err.message)));
};
