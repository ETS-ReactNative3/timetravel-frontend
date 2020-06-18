
import { _apiHost } from "../utils/Utils";


async function request(url, params, method = "GET") {
    const options = {
        method,
        headers: setHeaders()
    };

    if (params) {
        if (method === "GET") {
            url += "?" + objectToQueryString(params);
        } else {
            options.body = JSON.stringify(params);
        }
    }

    const response = await fetch(_apiHost + url, options);
    let result = {};

    if (response.status !== 200) {
        try {
            result = await response.json();
            return generateErrorResponse(response.ok, response.status, result.error);
        } catch (error) {
            return generateErrorResponse(
                false,
                response.status,
                "Something went wrong"
            );
        }
    }

    try {
        result = await response.json();
        result.ok = true;
        result.status = response.status;
        return result;
    } catch (error) {
        return generateErrorResponse(
            false,
            response.status,
            "Something went wrong"
        );
    }
}

function setHeaders() {
    return localStorage.getItem("token")
        ? {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-access-token": localStorage.getItem("token")
        }
        : {
            "Content-Type": "application/json",
            Accept: "application/json"
        };
}

function objectToQueryString(obj) {
    return Object.keys(obj)
        .map(key => key + "=" + obj[key])
        .join("&");
}

function generateErrorResponse(ok, status, error) {
    return {
        ok: ok,
        status: status,
        error: error
    };
}

function get(url, params) {
    return request(url, params);
}

function create(url, params) {
    return request(url, params, "POST");
}

function update(url, params) {
    return request(url, params, "PUT");
}

function remove(url, params) {
    return request(url, params, "DELETE");
}

export default {
    get,
    create,
    update,
    remove
};
