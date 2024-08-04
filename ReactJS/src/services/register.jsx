import ApiBase from "./ApiBase";

class RegisterApi extends ApiBase {
    constructor() {
        super();
        this.path = "users/register";
    }

    async CreateUser(data) {
        return await this.httpPost(this.path, data);
    }
}

export const registerApi = new RegisterApi();