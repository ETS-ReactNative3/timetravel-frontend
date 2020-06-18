import axios from "axios";
import {GET_ERRORS, GET_CATEGORYS, GET_CATES, GET_PROJECTS, DELETE_PROJECT_CATEGORY} from "../NewProject/types";

export const createCategory = (project, history) => async dispatch =>{
    try{
        const res = await axios.post
        ("http://localhost:8080/api/category",project);
        history.push("/blog")
    } catch (err) {
        dispatch({
            type:GET_ERRORS,
            payload:err.response.data,
        })
    }
};

export  const addProjectCategory = (
        category_id,
        project_category,
        history

) => async dispatch =>{
    try{
        const response = await axios.post("http://localhost:8080/api/project/" + category_id.id + "/category", project_category);

        history.push("/dashboard/blog/"+category_id.id);
        dispatch({
            type:GET_PROJECTS,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const deleteProjectCategory = (category_id, project_id) => async dispatch => {

    if(
        window.confirm(
            "You are deleting project task "+category_id+", this action cannot be undone"
        )
    ){
        const response =  await axios.delete("http://localhost:8080/api/category/" + category_id + "/" + project_id);
        dispatch({
            type: DELETE_PROJECT_CATEGORY,
            payload: response
        })
    }
};

export const getCategorys = category_id => async dispatch => {

    const res = await axios.get(`http://localhost:8080/api/project/${category_id}`);
    dispatch({
        type: GET_CATEGORYS,
        payload: res.data
    });

};

export const getCates = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/api/category/all");
    dispatch({
        type: GET_CATES,
        payload: res.data
    })
};

