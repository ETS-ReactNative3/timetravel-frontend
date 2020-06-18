import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from '../home/Header';
import MainFeaturedPost from '../home/MainFeaturedPost';
import FeaturedPost from '../home/FeaturedPost';
import Main from '../home/Main';
// import media from './media';
import Sidebar from '../home/Sidebar';
import Footer from '../home/Footer';
// import styleMedia from "src/Styles/media.css";
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';
import { connect } from 'react-redux';
import { getProjects } from "../NewProject/newproject";
// import {getCategory, getCates} from "../NewCategory/newcategory";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {getCategorys} from "../NewCategory/newcategory";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Link from "@material-ui/core/Link";
import "../home/headerStyle.css";
import MediaCard from "../home/card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import {getCates} from "../NewCategory/newcategory";
import Projects from "../home/Projects";


class Dashboard extends Component {

    componentDidMount() {
        this.props.getProjects();
    }

    render(){

        const {projects} = this.props.project;

        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Header title="TimeTravell" className="header"/>
                    <main>
                        <MainFeaturedPost post={mainFeaturedPost} />
                        <Grid container spacing={4}>
                            {featuredPosts.map((post) => (
                                <FeaturedPost key={post.title} post={post} />
                            ))}
                        </Grid>
                        <div container spacing={5} >
                            <Grid>
                                {projects.map(project => (
                                    <Projects title="Other media" className="media" key={project.id} category={project}/>
                                ))}
                            </Grid>
                        </div>
                    </main>
                </Container>
                <Footer title="Footer" description="Something here to give the footer a purpose!!!" />
            </React.Fragment>
        );
    }}

Dashboard.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired,
    cate:PropTypes.object.isRequired,
    getCates: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    project:state.project,
    category:state.category,
    cate: state.cate,
});

export default connect(mapStateToProps,{getProjects, getCates })(Dashboard);

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…',
};

const featuredPosts = [
    {
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
];

// const posts = [post1, post2, post3];

const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        { title: 'March 2020', url: '#' },
        { title: 'February 2020', url: '#' },
        { title: 'January 2020', url: '#' },
        { title: 'November 1999', url: '#' },
        { title: 'October 1999', url: '#' },
        { title: 'September 1999', url: '#' },
        { title: 'August 1999', url: '#' },
        { title: 'July 1999', url: '#' },
        { title: 'June 1999', url: '#' },
        { title: 'May 1999', url: '#' },
        { title: 'April 1999', url: '#' },
    ],
    social: [
        { name: 'GitHub', icon: GitHubIcon },
        { name: 'Twitter', icon: TwitterIcon },
        { name: 'Facebook', icon: FacebookIcon },
    ],
};