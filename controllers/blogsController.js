const crud = require('../lib/crudBlogs');

const fullListOfBlogs = async (req,res) => { //lee filtrando email o name o el primero
    try{
       // if(req.query.email){
        console.log("hemos entrado en el controlador de blogs")
        const blogs = await crud.findBlogs(req,res);
        console.log("hemos salido de la llamada a findBlogs")
        console.log(blogs);
        if(Object.keys(blogs).length == 0) res.status(200).json({status:404,message:"no existe blogs",data:[]});

        //res.json(newUser);
        res.status(200).json({status:200,message:"leido correctamente",data:blogs});
        //}
    }
    catch(err){   
        res.status(403).json({status:403,message:err.message,data:[]});
    }

};

module.exports = {
    fullListOfBlogs
};