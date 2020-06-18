import React, {Component} from "react";
import Requests from "../requests/Requests";
import {_apiHost} from "../utils/utils";
// import "../styles/iframe.css";
// import Popup from "./Popup";
// import Loader from "./Spinner";

export default class Iframe extends Component {
    constructor(props) {
        window.setScore = score => {
            this.state.score = score;
            this.togglePopup();
        };
        super(props);
        this.state = {
            name: "",
            showPopup: false,
            score: null,
            username: "",
            error: null,
            gameId: null
        };
    }

    togglePopup = () => {
        this.setState(prevState => ({
            showPopup: !prevState.showPopup
        }));
    };

    async componentDidMount() {
        const id = await this.props.match.params.id;
        const game = await Requests.get("/games/" + id);
        if (!game.ok) {
            this.setState({error: game.error});
            setTimeout(() => this.props.history.push("/login"), 3000);
        } else {
            this.setState({
                name: game.name,
                username: localStorage.getItem("username"),
                gameId: id
            });
        }
    }

    render() {
        const host = _apiHost + "/games/";
        const index = "/index.html";
        const gameAuth = (
            <div className="iframe_cont">
                <div className="iframe-container">
                    {this.state.name ? (
                        <iframe
                            className="iframe"
                            title={this.state.name}
                            src={host + this.state.name + index}
                            sandbox="allow-same-origin allow-scripts allow-modals"
                        />
                    ) : (
                        <Loader width={200}/>
                    )}
                </div>
                {this.state.showPopup ? (
                    <Popup
                        score={this.state.score}
                        username={this.state.username}
                        gameId={this.state.gameId}
                        closePopup={this.togglePopup}
                    />
                ) : null}
            </div>
        );
        const gameError = (
            <div className="errorMessage">
                <div>{this.state.error}</div>
                <div>Please log in!</div>
            </div>
        );

        return <div>{!this.state.error ? gameAuth : gameError}</div>;
    }
}
