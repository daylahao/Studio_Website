import ApiBase from "./ApiBase";
import axios from "axios";

class ApiItems extends ApiBase {
    constructor() {
        super();
        this.path = "items";
    }

    async list(data) {
        return await this.httpGet(this.path, data);
    }
    async get(id,data) {
        return await this.httpGet(`${this.path}/${id}`,data);
    }
    async ListLimit(offeset,number,data) {
        return await this.httpGet(`${this.path}?limit=${number}&offset=${offeset}`, data);    
    }
    async search(key,data) {
        return await this.httpGet(`${this.path}?search=${key}`, data);
    }
    async getAllType(data) {
        return await this.httpGet(`${this.path}/type`, data);
    }
    async AddItems(form,data) {
        return await this.httpPost("cartsproducts", form, data);
    }
    async listType(data) {
        return await this.httpGet(this.path+'/type', data);
    }
    async update(id,form,data) {
        axios({
            method: "post",
            url: this.baseUrl + this.path + "/" + id,
            data: form,
            headers: { 
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
                'Accept': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "multipart/form-data",
                'auth': localStorage.getItem("key") || "",
             },
          })
            .then(function (response) {
              //handle success
              return response;
            })
            .catch(function (response) {
              //handle error
              return response;
            });
    }
    async delete(id,data) {
        return await this.httpDelete(this.path, {id:id}, data);
    }
    async insert(form,data) {
        axios({
            method: "post",
            url: this.baseUrl + this.path,
            data: form,
            headers: { 
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
                'Accept': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "multipart/form-data",
                'auth': localStorage.getItem("key") || "",
             },
          })
            .then(function (response) {
              //handle success
              return response;
            })
            .catch(function (response) {
              //handle error
              return response;
            });
    }
}

export const apiItems = new ApiItems();