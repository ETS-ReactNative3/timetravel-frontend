import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { addProjectCategory } from "../NewCategory/newcategory";
import PropTypes from "prop-types";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Button from "@material-ui/core/Button";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Footer from "./Footer";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

class AddProjectCategory extends Component{

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        this.props.addProjectCategory(id);

        this.state = {
            projectName: "",
            projectIdentifier: this.props.match.params, // was projectIdentifier: ""
            description: "",
            categoryName:"",
            descriere:"",
            create_At:"",
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.errors){
    //         this.setState({ [e.target.name]: e.target.value });
    //     }
    // }

    // handleDele


    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const newProject = {
            projectName: this.state.projectName,
            // projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            categoryName: this.state.categoryName,
            descriere: this.state.descriere,
        };

        this.props.addProjectCategory(
            this.state.projectIdentifier,
            newProject,
            this.props.history
        );
    }

    render() {
        const { id }=this.props.match.params;
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="TimeTravell" className="header"/>
                <main>
                    <div container spacing={5} >
                        <Grid>
                            <Card className="root">
                                <form onSubmit={this.onSubmit}>
                                <CardMedia
                                    className="media"
                                    image="/static/images/cards/paella.jpg"
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <ExpansionPanel className="expand">
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography >
                                                <TextField name="projectName" value={this.state.projectName}  onChange={this.onChange} id="standard-basic" label="Adauga nume" />
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <CardContent className="expandOpen">
                                            <Typography paragraph>
                                                <TextField name="description" value={this.state.description}  onChange={this.onChange} id="standard-basic" label="Adauga descriere" />
                                            </Typography>
                                        </CardContent>
                                    </ExpansionPanel>
                                </CardContent>
                                    <input type="submit" className="btn btn-primary btn-block mt-4"
                                           />
                                </form>
                            </Card>
                        </Grid>
                    </div>
                </main>
            </Container>
            <Footer title="Footer" description="Something here to give the footer a purpose!!!" />
        </React.Fragment>
        );
    }
}

AddProjectCategory.propTypes={
    addProjectCategory: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    post: PropTypes.object,
};

const mapStateToProps = state =>({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {addProjectCategory}
)(AddProjectCategory);