import ApiBase from "./ApiBase";

class UserApi extends ApiBase {
    constructor() {
        super();
        this.path = "users";
    }

    async LoginUser(data) {
        return await this.httpPost(this.path+'/login', data);
    }
    async GetInformation(data){
        return await this.httpGet(this.path+'/info',data);
    }
    async SendEmail(data){
        return await this.httpPost(this.path+'/emailnotify',data);
    }
}

export const userApi = new UserApi();