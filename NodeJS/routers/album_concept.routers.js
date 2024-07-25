const albumcontroller = require('../controllers/album_concept.controller');
const {uploadGallery} = require('../common/handlefiles');
const { auth } = require('../common/hashPassword');
module.exports=function (router){
    router.get("/albums",albumcontroller.getAll);
    router.get("/albums/:id",albumcontroller.getById);
    router.post("/albums",uploadGallery.any(),auth(['ADMIN','MOD']),albumcontroller.insert);
    router.delete("/albums",uploadGallery.any(),auth(['ADMIN','MOD']),albumcontroller.delete);
    router.post("/albums/update",uploadGallery.any(),auth(['ADMIN','MOD'],albumcontroller.update));
    router.post("/albums/add/:id",uploadGallery.any(),auth(['ADMIN','MOD'],albumcontroller.insertImage));
    router.delete("/albums/:id",uploadGallery.any(),auth(['ADMIN','MOD'],albumcontroller.deleteImage));
}