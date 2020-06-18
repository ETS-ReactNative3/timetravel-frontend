import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import Markdown from './Markdown';
import {red} from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import {Link} from "react-router-dom";
import {deleteProjectCategory, getCategorys, getCates} from "../NewCategory/newcategory";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import DeleteIcon from '@material-ui/icons/Delete';
import * as queryString from "query-string";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import "../style/main.css"

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));



class Main extends Component{


    constructor() {
        super();
        this.state = {
            liked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            liked: !this.state.liked
        });
    }

    onDeleteClick=(category_id, project_id)=>{
        this.props.deleteProjectCategory(category_id,project_id);
        window.location.reload();
    };

    render(){
        const {category}=this.props;
        const blogId = this.props.blogId;

        const text = this.state.liked ? 'liked' : 'haven\'t liked';
        const label = this.state.liked ? 'Unlike' : 'Like';

        

    return (
        <Card className="root">
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className="avatar">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="delete">
                        <DeleteIcon fontSize="medium" onClick={this.onDeleteClick.bind(
                                        this,
                                        blogId,
                                        category.id,
                                    )}/>
                    </IconButton>
                }
                title={category.projectIdentifier}
                subheader={category.create_At}
            />
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
                        <Typography >{category.projectName}</Typography>
                    </ExpansionPanelSummary>
                <CardContent className="expandOpen">
                    <Typography paragraph>
                        {category.description}
                    </Typography>
                </CardContent>
            </ExpansionPanel>
        </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={this.handleClick}>
                    <FavoriteIcon />
                    {label}

                </IconButton>
            </CardActions>
        </Card>
    );
}}
Main.propTypes ={
    deleteProjectCategory: PropTypes.func.isRequired

};

export default connect(null,{deleteProjectCategory})(Main);

