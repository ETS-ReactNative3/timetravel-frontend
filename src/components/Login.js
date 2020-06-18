import React, {Component} from 'react';
import Requests from "../requests/Requests";
import '../Styles/loginn.css';
import {saveTokenIntoLocalStorage} from "../utils/Utils";
// import {Link} from 'react-router-dom';
import FacebookLoginBtn from 'react-facebook-login';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            password: "",
            loginerror: ""
        };
    }

    state = {
        auth: false,
        name: '',
        picture: ''
    };

    handleNameChange = event => {
        this.setState({name: event.target.value});
    };

    handlePasswordChange = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = async event => {
        event.preventDefault();
        const {name, password} = this.state;
        const response = await Requests.create("/login", {name: name, password: password});
        if (!response.ok) {
            this.setState({loginerror: response.error});
        }
        if (response.auth) {
            saveTokenIntoLocalStorage(response);
            this.props.history.push("/");
        }
    };

    toRegister = () => {
        this.props.history.push("/register");
    };

    componentClicked = () => {
        console.log('facebook btn clicked')
    };

    responseFacebook = (response) => {
        console.log(response)
    };

    render() {
        let facebookData;

        this.state.auth ?
            facebookData = (
                <div>
                    Hi!
                </div>
            ) :
            facebookData = (
                <FacebookLoginBtn
                    appId="1088597931155576"
                    autoLoad={true}
                    fields="name,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                />
            );

        return (
            <body className="body">
            <div className="body-content">
                <div className="photo">
                    {/*<img className="img" src="../images/img.jpg"></img>*/}
                    <input type="image" className="img" src="../images/img.jpg"/>
                </div>
                <div className="main-article">

                    <div className="photo-content">
                        <h1 className="title-content"> TimeTravel</h1>
                    </div>
                    <div className="login-content">
                        <input
                            type="text"
                            name="name"
                            placeholder="Username"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            className="enter-username"
                        />
                        <div className="overlap-text">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                className="enter-password"
                            />
                            <a href="#">Forgot?</a>
                            <div className="invalid-feedback">
                                <p className="validation">{this.state.loginerror}</p>
                            </div>
                        </div>

                        <button type="submit" className="btn-login">
                            Log in
                        </button>
                        <div className="or-content">
                            <div className="draw1"></div>
                            <div className="or">OR</div>
                            <div className="draw1"></div>
                        </div>
                        <div className="loginBtn loginBtn--facebook">
                            {facebookData}
                        </div>
                        <a className="forgot-password" href="#"> Forgot password?</a>
                    </div>
                </div>
                <div className="sing-up-user">
                    <div className="s-part">
                        Don't have an account?<a onClick={this.toRegister}>Sing up</a>
                    </div>
                </div>
            </div>
            </body>
        )
    }
}

