import {DELETE_PROJECT_CATEGORY, GET_CATEGORYS, GET_CATES, GET_PROJECTS} from "../NewProject/types";

const initialState = {
    categorys: [],
    category: {},
    // project_categorys: [],
    // project_category: {}
    // categoryss: [],
    cates:[],
    cate:{},
    // cate:{},
};

export default function (state=initialState, action){
    switch (action.type) {
        case GET_CATEGORYS:
            return{
                ...state,
                categorys: action.payload
            };
        case GET_CATES:
            return{
                ...state,
                cates:action.payload
            };
        case DELETE_PROJECT_CATEGORY:
            return{
                ...state,
                categorys: state.categorys.filter(category => category.categoryName !== action.payload )
            };
        default:
            return state
    }
}
