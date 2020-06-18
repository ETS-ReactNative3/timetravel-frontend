import React from "react";
import {BrowserRouter as Router, Route, Switch, withRouter} from "react-router-dom";
// import Navbar from "../component/navbar";
import SignInSide from "../component/SignInSide";
import SignUp from "../component/SingUp";
import Blog from "../component/home/blog";
// import addProject from "./NewProject/addProject";
// import GameList from "./GameList";
// import Register from "./Register";
// import Login from "../component/login";
import REG from "../component/REG";
import AppBar from "../component/AppBar"
import addProject from "./NewProject/addProject";
// import Iframe from "./Iframe";
import store from "./NewProject/store";
import { Provider } from "react-redux";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import Header from "./home/Header";
import Dashboard from "./NewCategory/dashboard";
import AddProjectCategory from "./home/addProjectCategory";
// import Home from "../components/home"

// import ScoreByGameId from "./ScoreByGameId";

import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import {SET_CURRENT_USER} from "./NewProject/types";
import {logout} from "./action/securityActions";

const jwtToken = localStorage.jwtToken;

if(jwtToken){
    setJWTToken(jwtToken);
    const decoded_jwtToken = jwt_decode(jwtToken);
    store.dispatch({
        type: SET_CURRENT_USER,
        payload: decoded_jwtToken
    });

    const currentTime = Date.now()/1000;
    if(decoded_jwtToken.exp < currentTime){
        store.dispatch(logout());
        window.location.href = "/";
    }
}


const GlobalStyle = createGlobalStyle`
body {
    background-color: ${props =>
    props.theme.mode === 'dark' ? '#111' : '#EEE'};
    color: ${props =>
    props.theme.mode === 'dark' ? '#EEE' : '#111'};
}
`;

function RoutesComponent() {
    return (

        <Provider store={store}>
        <Router>
            <ThemeProvider theme={{mode:'dark'}}>
                <GlobalStyle/>
            <div className="App">
                {/*<AppBar/>*/}
                {/*<Navbar/>*/}
                <div>
                    <Switch>
                        {/*<Route exact path="/" component={GameList} />*/}
                        {/*<Route exact path="/games" component={GameList} />*/}
                        {/*<Route exact path="/scores/:id" component={ScoreByGameId} />*/}
                        {/*<Route exact path="/games/:id" component={Iframe} />*/}
                        {/*<Route exact path="/register" component={Register} />*/}
                        {/*<Route exact path="/login" component={Login} />*/}
                        {/*<Route exact path="/reg" component={REG}/>*/}
                        <Route exact path="/blog" component={Blog}/>
                        {/*for login*/}
                        <Route exact path="/" component={SignInSide}/>
                        {/*for register*/}
                        <Route exact path="/register" component={SignUp} />
                        <Route exact path="blog/addProject/:id" component={addProject}/>
                        {/*<Route exact path="/games/:id" component={Iframe} />*/}
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/dashboard/blog/:id" component={Blog}/>
                        <Route exact path="/addProjectCategory/:id" component={AddProjectCategory}/>
                        <Route exact path="/header/:id" component={Header}/>
                    </Switch>
                </div>
            </div>
            </ThemeProvider>
        </Router>
        </Provider>

    );
}

export default RoutesComponent;
