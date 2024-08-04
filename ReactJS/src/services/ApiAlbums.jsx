import ApiBase from "./ApiBase";

class ApiAlbums extends ApiBase {
    constructor() {
        super();
        this.path = "albums";
    }
    async listLimit(limit,data) {
        this.path="albums/?limit="+limit;
        return await this.httpGet(this.path, data);
    }
    async list() {
        return await this.httpGet(this.path);
    }
}

export const apiAlbums = new ApiAlbums();