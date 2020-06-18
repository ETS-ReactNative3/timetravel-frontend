import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createNewUser } from "./action/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



class SignUp extends Component{

    constructor() {
        super();

        this.state = {
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // componentDidMount() {
    //     if(this.props.security.validToken){
    //         this.props.history.push("/dashboard")
    //     }
    // }

    componentWillReceiveProps( nextProps) {
        if (nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            fullName: this.state.fullName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        this.props.createNewUser(newUser, this.props.history);
    }

    // const classes = useStyles();
    render(){

        const { errors } = this.state;
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div
                // className={classes.paper}
            >
                <Avatar
                    // className={classes.avatar}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form
                    // className={classes.form}
                    noValidate>
                    <form onSubmit={this.onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                placeholder="Email Address (username)"
                                required
                                fullWidth
                                // id="firstName"
                                // label="First Name"
                                autoFocus
                                value={this.state.username}
                                onChange={this.onChange}
                                className={classnames("username",{"is-invalid":errors.username
                                })}
                            />
                            {errors.username && (
                                <div className="invalid-feedback">{errors.username}</div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="fullName"
                                autoComplete="lname"
                                placeholder="Full Name"
                                value={this.state.fullName}
                                onChange={this.onChange}
                                className={classnames("name",{"is-invalid":errors.fullName
                                })}
                            />
                            {errors.fullName && (
                                <div className="invalid-feedback">{errors.fullName}</div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Password"
                                className={classnames("name",{"is-invalid":errors.password
                                })}
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-confirmPassword"
                                placeholder="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.onChange}
                                className={classnames("name",{"is-invalid":errors.confirmPassword
                                })}
                            />
                            {errors.confirmPassword && (
                                <div className="invalid-feedback">{errors.confirmPassword}</div>
                            )}
                        </Grid>
                        {/*<Grid item xs={12}>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
                        {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                    </Grid>
                        <input type="submit"/>
                    </form>
                    {/*<Button*/}
                    {/*    type="submit"*/}
                    {/*    fullWidth*/}
                    {/*    variant="contained"*/}
                    {/*    color="primary"*/}
                    {/*    // className={classes.submit}*/}
                    {/*>*/}
                    {/*    Sign Up*/}
                    {/*</Button>*/}
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}}

SignUp.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state =>({
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {createNewUser}
    )(SignUp);