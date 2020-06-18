import React, {useState} from "react";
// import "./styles/style.css";
import RoutesComponent from "./component/routesComponents";
import {createGlobalStyle, ThemeProvider} from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    background-color: ${props =>
        props.theme.mode === 'dark' ? '#111' : '#EEE'};
    color: ${props =>
        props.theme.mode === 'dark' ? '#EEE' : '#111'};
}
`;

function App() {

    return (<ThemeProvider theme={{mode:'dark'}}>
                <GlobalStyle/>
                <RoutesComponent />

        </ThemeProvider>
        );

}
export default App;
