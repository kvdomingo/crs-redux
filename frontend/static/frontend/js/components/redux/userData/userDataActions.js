import {
    LOGOUT_USER,
    FETCH_CURRENT_USER_REQUEST,
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_CURRENT_USER_FAILURE,
} from "./userDataTypes";
import axiosInstance from "../../axios/axiosDefault";


export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const fetchCurrentUserRequest = () => ({
    type: FETCH_CURRENT_USER_REQUEST,
});

export const fetchCurrentUserSuccess = data => ({
    type: FETCH_CURRENT_USER_SUCCESS,
    payload: data,
});

export const fetchCurrentUserFailure = () => ({
    type: FETCH_CURRENT_USER_FAILURE,
});

export const fetchCurrentUser = () => dispatch => {
    dispatch(fetchCurrentUserRequest());
    axiosInstance.get("/auth/user/current")
        .then(res => dispatch(fetchCurrentUserSuccess(res.data)))
        .catch(err => {
            dispatch(fetchCurrentUserFailure());
            axiosInstance.defaults.headers["Authorization"] = "";
        });
};
