import {combineReducers} from "redux";
import errorReducer from "../NewProject/errorReducer";
import projectReducer from "../NewProject/projectReducer";
import categoryReducers from "../NewCategory/categoryReducers";
import securityReducer from "./securityReducer";

export default combineReducers({
    errors:errorReducer,
    project: projectReducer,
    category: categoryReducers,
    cate: categoryReducers,
    security: securityReducer
})

