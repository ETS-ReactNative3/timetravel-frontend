import React, {Component, useEffect} from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {getCategorys, getCates} from "../NewCategory/newcategory";
import {connect} from "react-redux";
import {getProjects} from "../NewProject/newproject";
import PropTypes from "prop-types";
import "./headerStyle.css";
import Main from "./Main";
import {withStyles} from "@material-ui/core/styles";

import {logout} from "../action/securityActions";

// Header.propTypes = {
//     sections: PropTypes.array,
//     title: PropTypes.string,
// };

const styles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));


class Header extends Component{

    logout(){
        this.props.logout();
        window.location.href = "/";
    }


    componentDidMount() {
        this.props.getCates();
    }

    render() {

        // const {classes} = useStyles();
        const {cates} = this.props.cate;


        const {validToken, user} = this.props.security;

        const userIsAuthenticated =(
            <Toolbar
                className="toolbar"
                // className={this.props.classes.toolbar}
            >
                <i className="i.fas.fa-user-circle mr-1"/>
                {user.fullName}
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className="toolbarTitle"
                >
                    TimeTravell
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                {/*<Button variant="outlined" size="small">*/}
                {/*    Sign up*/}
                {/*</Button>*/}
                <Link variant="outlined" size="small" href="/logout" onClick={this.logout.bind(this)}>
                    Logout
                </Link>
            </Toolbar>
        );

        const userIsNotAuthenticated =(
            <Toolbar
                className="toolbar"
                // className={this.props.classes.toolbar}
            >
                <Button size="small" href="/register">Register</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className="toolbarTitle"
                >
                    TimeTravell
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Button variant="outlined" size="small" href="/">
                    Login
                </Button>
                {/*<Link variant="outlined" size="small" href="/">*/}
                {/*    Login*/}
                {/*</Link>*/}
            </Toolbar>
        );

        let headerLinks;
        if(validToken && user){
            headerLinks = userIsAuthenticated
        } else {
            headerLinks = userIsNotAuthenticated
        }


    return (
        <React.Fragment>
            {headerLinks}
            <Toolbar component="nav" variant="dense" >
                <div>
                    {cates.map(category => (
                        <Link
                            // to={`/dashboard/blog/${category.id}`}
                            color="inherit"
                            noWrap
                            variant="body2"
                            href={"/dashboard/blog/"+ category.id}
                            className="toolbarLink"
                        >
                            {category.categoryName}
                        </Link>
                    ))}
                </div>
            </Toolbar>
        </React.Fragment>
    );
    }}

Header.propTypes = {
    cate:PropTypes.object.isRequired,
    getCates: PropTypes.func.isRequired,
    logout:PropTypes.func.isRequired,
    security:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    cate:state.cate,
    security:state.security,
});

export default connect(mapStateToProps,{ getCategorys, getCates, logout })(Header);
