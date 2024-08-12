import axios from "axios";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
export default class ApiBase {
    constructor() {
        this.baseUrl = "http://localhost:3000/";
    }

    httpPost(uri, data, options) {
        return this.httpRequest(uri, "POST", data, options);
    }

    httpPut(uri, data, options) {
        return this.httpRequest(uri, "PUT", data, options);
    }
    httpPostForm(uri, data, options) {
        return this.httpFormRequest(uri, "POST", data,options);
    }
    httpGet(uri, data, options) {
        // console.log(this.baseUrl + uri);
        return this.httpRequest(uri, "GET", data, options);
    }

    httpDelete(uri,data, options) {
        return this.httpRequest(uri, "DELETE", data, options);
    }
    httpFormRequest(uri, method, data, options) {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: this.baseUrl + uri,
                data: data,
                headers: {
                    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'multipart/form-data',
                    'auth': localStorage.getItem("key") || "",
                },
                ...options
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((axiosError) => {
                    console.error(axiosError);
                    reject("SERVER_ERROR");
                });
        })};
    httpRequest(uri, method, data, options) {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: this.baseUrl + uri,
                data: method !== "GET" ? data : omitBy(data, isNil),
                params: method === "GET" ? data || "" : "",
                headers: {
                    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    
                    'Content-Type': 'application/json',
                    'auth': localStorage.getItem("key") || "",
                },
                ...options
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((axiosError) => {
                    console.error(axiosError);
                    reject("SERVER_ERROR");
                });
        });
    }
}