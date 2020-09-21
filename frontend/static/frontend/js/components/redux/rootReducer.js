import { combineReducers } from "redux";
import userDataReducer from "./userData/userDataReducer";
import crsDataReducer from "./crsData/crsDataReducer";


const rootReducer = combineReducers({
    userData: userDataReducer,
    crsData: crsDataReducer,
});

export default rootReducer;
