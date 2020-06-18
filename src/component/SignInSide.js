import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {login} from "../component/action/securityActions";

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
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class SignInSide extends Component{
    // const classes = useStyles();

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors:{}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.security.validToken){
            this.props.history.push("/dashboard")
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.security.validToken){
            this.props.history.push("/dashboard")
        }

        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }
    }

    onSubmit(e){
        e.preventDefault();
        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(LoginRequest);
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    render() {
        const { errors } = this.state;
        return (
            <Grid container component="main"
                  // className={classes.root}
            >
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}
                      // className={classes.image}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div
                        // className={classes.paper}
                    >
                        <Avatar
                            // className={classes.avatar}
                        >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form
                            // className={classes.form}
                            noValidate>
                            <form onSubmit={this.onSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="username"
                                autoComplete="email"
                                autoFocus
                                value={this.state.username}
                                onChange={this.onChange}
                                className={classnames("username",{"is-invalid":errors.username
                                })}
                            />
                                {errors.username && (
                                    <div className="invalid-feedback">{errors.username}</div>
                                )}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.onChange}
                                className={classnames("password",{"is-invalid":errors.password
                                })}
                            />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            <input type="submit"/>
                            </form>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

SignInSide.propTypes = {
    login: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security:state.security,
    errors:state.errors
});

export default connect(mapStateToProps,{login})(SignInSide);