import Requests from "../requests/Requests";

// export const _apiHost = "https://arobs-games-server.herokuapp.com";
export const _apiHost = "http://localhost:8080/api/project";

export const getNpiecesOfWord = (str, pieces) => {
    let overview = "";
    if (str) {
        overview = str
            .split(/\s+/)
            .slice(0, pieces)
            .join(" ");
        if (str.length > overview.length) {
            overview += " ...";
        }
    }
    return overview;
};

export const saveTokenIntoLocalStorage = res => {
    if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.username);
        return true;
    }
    return false;
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    Requests.get("/logout");
};
