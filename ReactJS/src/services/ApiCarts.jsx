import ApiBase from "./ApiBase";

class ApiCarts extends ApiBase {
    constructor() {
        super();
        this.path = "cartsproducts/";
    }

    async listitems(data) {
        return await this.httpGet(this.path+'user', data);
    }
    async updateItemCart(item,data){
        return await this.httpPost(this.path+'update', item, data);
    }
    async completeCart(data){
        return await this.httpPost(this.path+'complete', data);
    }
    async deleteItemCart(item){
        return await this.httpDelete(this.path, item);
    }
}

export const apiCarts = new ApiCarts();