import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCategory } from "./newcategory";

class addCategory extends Component{
    constructor() {
        super();

        this.state = {
            categoryName: "",
            descriptionCategory: "",
            projects:"",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps= (nextProps) => {
        if(Object.keys(nextProps.category).length){
            const{
                categoryName,
                descriptionCategory,
                projects,
            } = nextProps.category;

            this.state({
                categoryName,
                descriptionCategory,
                projects:projects
                ? nextProps.projects.filter((selectedProject) =>{
                    return projects.find((project) =>{
                        return project.id === selectedProject.id;
                    });
                    })
                    :[],
            });
        }
    };

    componentDidMount = () => {
        if(this.isUpdateAction()){
            const {id} = this.props.match.params;
            this.props.getCategorys(id, this.props.history);
        }
        this.props.getProjects();
    };

    isUpdateAction = () =>{
        return window.location.href.includes("update");
    };

    onDropDownChange = (e) =>{
        this.setState({[e.target.name]:e.target.value});
    };

    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const newCategory = {
            categoryName: this.state.categoryName,
            descriptionCategory: this.state.descriptionCategory,
        };

        console.log(newCategory);
        this.props.createCategory(newCategory, this.props.history)
    }

    render() {
        return (
            <div>
                <div className="project">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">
                                    Create / Edit project form
                                </h5>
                                <hr />
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control form-control-lg"
                                               placeholder="Project name"
                                               name="projectName"
                                               value={this.state.categoryName}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control form-control-lg"
                                               placeholder="Unique Project ID"
                                               name="projectIdentifier"
                                               value={this.state.descriptionCategory}
                                               onChange={this.onChange}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default addProject;
addCategory.propTypes = {
    createCategory : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    category:state.category.category,
    projects: state.project.projects,
});

export default connect(mapStateToProps,
    {createCategory,
        getCategorys,
        getProjects,
    }
) (addCategory);
