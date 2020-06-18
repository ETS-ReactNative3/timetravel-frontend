import {combineReducers} from "redux";
import errorReducers from "../NewCategory/errorReducers";
import categoryReducers from "../NewCategory/categoryReducers";

export default combineReducers({
    errors:errorReducers,
    project:categoryReducers,
})