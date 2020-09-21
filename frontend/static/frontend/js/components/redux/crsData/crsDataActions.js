import { DISPATCH_CRS_STATUS, DISPATCH_CURRENT_SEMESTER } from "./crsDataTypes";


export const dispatchCrsStatus = data => ({
    type: DISPATCH_CRS_STATUS,
    payload: data,
});

export const dispatchCurrentSemester = data => ({
    type: DISPATCH_CURRENT_SEMESTER,
    payload: data,
});
