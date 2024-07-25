const multer = require('multer');
require('dotenv').config();
const storageAvt = multer.diskStorage({
    destination: (req, file, cb)=>{
    //   # This part defines where the files need to be saved
      cb(null, process.cwd()+"/images/avatars")
    },
    filename: (req, file, cb)=>{
        var ext = file.originalname.split('.').pop();
        cb(null, new Date().getTime()+"."+ext);
    }
  })
  const storageGallery = multer.diskStorage({
    destination: (req, file, cb)=>{
    //   # This part defines where the files need to be saved
      cb(null, process.cwd()+'/images/gallery')
    },
    filename: (req, file, cb)=>{
        var name = file.originalname.split('.')[0].replace(/\s/g, '');
        var ext = file.originalname.split('.').pop();
        cb(null, new Date().getTime()+name+"."+ext);
    }
  })
  const storageItems = multer.diskStorage({
    destination: (req, file, cb)=>{
    //   # This part defines where the files need to be saved
      cb(null, process.cwd()+'/images/items')
    },
    filename: (req, file, cb)=>{
    //   # This part sets the file name of the file
    var ext = file.originalname.split('.').pop();
    cb(null, new Date().getTime()+"."+ext);
    }
  })
    const uploadAvt = multer({ storage: storageAvt });
    const uploadGallery = multer({ storage: storageGallery });
    const uploadItems = multer({ storage: storageItems });
module.exports = {
    uploadAvt,
    uploadGallery,
    uploadItems
}