import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./loginTypes";
import axiosDefault from "../../axios/axiosDefault";


export const loginRequest = (username, password) => ({
    type: LOGIN_REQUEST,
    payload: { username, password },
});

export const loginSuccess = data => ({
    type: LOGIN_SUCCESS,
    payload: data,
});

export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const fetchLogin = (username, password) => {
    return dispatch => {
        axiosDefault.post("/auth/token/obtain", {
             username, password
        })
            .then(res => {
                let { data } = res;
                dispatch(loginSuccess(data));
            })
            .catch(err => {
                let error = err.message;
                dispatch(loginFailure(error));
            });
    }
}
