var cloudinary = require('cloudinary').v2;
let streamifier = require('streamifier');

//este controlador sube fichero a cloudinary


const uploadToCloudinary = (req, res, next) => {

    if (req.file) {

        cloudinary.config({
            cloud_name:'dqp7c3bnr' ,
            api_key: '199421971222872',
            api_secret:'i3AoS1z0nzwvEnrZuPaZDZe3cfY'
        });

        let cld_upload_stream = cloudinary.uploader.upload_stream(
            {
                folder: "img-perfil"
            },
            function (error, result) {
                req.cloudinaryImgUrl = result.url;
                next();
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    }
    else {
        next();
    }
};

module.exports = uploadToCloudinary; 