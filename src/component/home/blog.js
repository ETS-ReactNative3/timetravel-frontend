import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
// import media from './media';
import Sidebar from './Sidebar';
import Footer from './Footer';
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
import "./headerStyle.css";
import MediaCard from "./card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import CreateProjectButton from "./CreateProjectButton";
import * as queryString from "query-string";
import Icon from "@material-ui/core/Icon";



class Blog extends Component {
    // classes = useStyles();

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getCategorys(id);
    }

    render(){
        let url = this.props.location.pathname;
        let splitUrl = url.split('/');
        const blogId = splitUrl[splitUrl.length - 1];

        const {id} = this.props.match.params;
        const {categorys} = this.props.category;

        let ide = categorys.id;
        console.log(ide);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                    <Header title="TimeTravell" className="header"/>
                <Button
                    href={"/addProjectCategory/"+id}
                    variant="contained"
                    color="primary"
                >
                    New post
                </Button>
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>

                    <div container spacing={5} >
                        <Grid>
                            {categorys.map(project => (
                                <Main title="Other media" className="media" key={project.id} category={project} blogId={blogId}/>
                            ))}
                        </Grid>
                    </div>
                </main>
            </Container>
            <Footer title="Footer" description="Something here to give the footer a purpose!!!" />
        </React.Fragment>
    );
}}

Blog.propTypes = {
    project: PropTypes.object.isRequired,
    getProjects: PropTypes.func.isRequired,
    category:PropTypes.object.isRequired,
    getCategorys: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    project:state.project,
    category:state.category,
});

export default connect(mapStateToProps,{getProjects, getCategorys })(Blog);

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

const mainFeaturedPost = {
    title: 'Nu am fost peste tot, dar este pe lista mea!',
    description:
        "Umple-ți viața cu aventuri, nu cu lucruri. Trebuie să ai povești de împărtășit, nu obiecte de arătat.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…',
};

const featuredPosts = [
    {
        title: 'Călătoriile sunt escapade în timp',
        date: 'Nov 12',
        description:
            'TCălătoriile sunt şi escapade în timp. Ai senzaţia că doar cei rămaşi acasă îmbătrânesc.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text',
    },
    {
        title: 'Călătoriile, tinerețe și libertate',
        date: 'Nov 11',
        description:
            'Descopera cele mai frumoase culturi si locuri. Traieste cele mai frumoase momente alaturi de cei dragi.',
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