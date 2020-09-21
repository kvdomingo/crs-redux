import { DISPATCH_USER_DATA } from "./userDataTypes";


export const dispatchUserData = data => ({
    type: DISPATCH_USER_DATA,
    payload: data ,
});
