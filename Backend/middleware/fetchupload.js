var jwt = require('jsonwebtoken');
const Farmer = require("../Models/FarmerSchema");
const path= require('path');
const multer=require('multer');
const { ClassNames } = require('@emotion/react');
const {
    S3,
} = require("@aws-sdk/client-s3");
const multerS3 = require("multer-s3");
const s3=new S3({
    credentials: {
        accessKeyId:process.env.S3_ACCESS_KEY,
        secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
    },

    region:process.env.S3_BUCKET_REGION,
});

const fetchfarmer = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    
    
    const token = req.header("auth");
    
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET);
        //console.log(data.user.id);
        const farmerl = await Farmer.findById(data.user.id);
        //console.log(farmerl);
        if(!farmerl){
            res.status(403).send({ error: "Please authenticate as a farmer" });
        }
        else{
            req.user = data.user;
            next();
        }
        
        
    } catch (error) {
        //console.log(error)
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}
/* var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'images/')
    },
    filename: function(req,file,cb){
        let ext =  path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
}) */

var upload = (bucketName)=> multer({
    storage:multerS3({
        s3:s3,
        bucket:bucketName,
        metadata:function(req,file,cb){
            cb(null,{fieldName:file.fieldname});
        },
        key:function(req,file,cb){
            cb(null,`image-${Date.now()}.jpeg`);
        }
    }),
 
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
          
           return cb('Only .png, .jpg and .jpeg format allowed!')
        }
      },
     
    limits : {fileSize : 2090000}
})

var uploadCrop = (req, res, next) => {
    console.log("here")
    const uploadSingle = upload("digitalmandi").single(
      "image"
    );
  
    uploadSingle(req, res, async (err) => {
      if (err)
        return res.status(400).json({ success: n, message: err.message });
      else{
        // console.log("inside upload",req.file.location) 
        req.image = req.file.location
        next();
      }
        
    //   res.status(200).json({ data: req.file.location });
    });
  };

const fetchupload={fetchfarmer,uploadCrop}
module.exports = fetchupload;