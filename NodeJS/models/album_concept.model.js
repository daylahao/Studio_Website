const db = require("../common/connectDB");
const jwt = require('jsonwebtoken');
const { UrlGrallery } = require("../common/handleSQL");
require('dotenv').config();
const Album = (album) => {

}
Album.getAll= async (req,callback)=>{
    const limit = req.query.limit;
    console.log(limit);
    let query = `SELECT album_concept.*, 
    GROUP_CONCAT(gallery.id) AS gallery_ids,
    GROUP_CONCAT(gallery.path_image) AS gallery_paths
FROM album_concept
LEFT JOIN gallery ON album_concept.id = gallery.album_id
GROUP BY album_concept.id;`;
    if(limit){
        query = `SELECT album_concept.*, 
    GROUP_CONCAT(gallery.id) AS gallery_ids,
    GROUP_CONCAT(gallery.path_image) AS gallery_paths
FROM album_concept
LEFT JOIN gallery ON album_concept.id = gallery.album_id
GROUP BY album_concept.id LIMIT ${limit};`;
    }

    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        }
        // console.log(result)
        result = result.map(({gallery_ids,gallery_paths,...album})=>{
            gallery_paths = gallery_paths.split(',').map((a)=>UrlGrallery(a));
            gallery_ids =  gallery_ids.split(',');
            album['imagepath'] = gallery_paths;
            return album
            });

        console.log(result)
        return callback(result);
    });
}
Album.getById = async (id,callback)=>{
    const query = `SELECT album_concept.*, 
       GROUP_CONCAT(gallery.id) AS gallery_ids,
       GROUP_CONCAT(gallery.path_image) AS gallery_paths
FROM album_concept 
LEFT JOIN gallery ON album_concept.id = gallery.album_id 
WHERE album_concept.id = ?
GROUP BY album_concept.id `;
    db.query(query,id,(err, result) => {
        if (err) {
            console.log(err);
            return callback(false);
        }
        console.log(id)
        result = result.map(({gallery_ids,gallery_paths,...album})=>{
            if(gallery_paths!=null){
            gallery_paths = gallery_paths.split(',').map((a)=>UrlGrallery(a));
            gallery_ids =  gallery_ids.split(',');}
            album['imagepath'] = gallery_paths;
            return album
            });
            console.log(result)
            return callback(result);
    });   
}
Album.insert  = async (item,imagelist,callback)=>{
    const query = `INSERT INTO album_concept SET ?`;
    db.query(query, item, (err, result) => {
        if (err) {
            return callback(false);
            // throw err;
        }else{
        console.log(result);
        imagelist.map((path)=>{
            let image_ = {
                // id:path.split('.')[0],
                path_image:path,
                album_id:result.insertId
            }
            console.log(image_);
            const queryImage = `INSERT INTO gallery SET ?`;
            db.query(queryImage,image_,(err, result) => {
                if (err) {
                    return callback(false);
                    // throw err;)
                }else{
                    console.log(result);
                }
        });
    });
    return callback(true);
    }
});
}
Album.update = async (item,callback)=>{
    const query = `UPDATE album_concept SET ? WHERE id=?`
    db.query(query,item,item.id,(err,result)=>{
        if(err){
            return callback(false);
        }else{
            return callback(true);
        }
    })
}
Album.delete = async (id,callback)=>{
    const query = `DELETE FROM album_concept WHERE id = ?`;
    db.query(query,id,(err,result)=>{
        if(err){
            return callback(false);
        }else{
            return callback(result);
        }
    })
}
Album.insertImage = async (id,listname,callback)=>{
    listname.map((path)=>{
    const query = `INSERT INTO gallery SET ?`;
    db.query(query,path,(err,result)=>{
        if(err){
            return callback(false)
        }
    })
})
    return callback(true);
}
Album.deleteImage =  async (id,id_image,callback)=>{
    const query = `DELETE FROM gallery WHERE id  = ? AND album_id = ?`
    db.query(query,id_image,id,(err,result)=>{
        if(err){
            return callback(false);
        }else{
            return callback(true);
        }
    })
}
module.exports = Album;