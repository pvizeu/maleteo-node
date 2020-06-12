const crud = require('../lib/crudBlogs');


const fullListOfBlogs = async (req,res,err) => { //lee filtrando email o name o el primero
    try{
       // if(req.query.email){
        console.log("hemos entrado en el controlador de blogs")
        const blogs = await crud.findBlogs(req,res);
        console.log("hemos salido de la llamada a findBlogs")
        console.log(blogs);
        if(Object.keys(blogs).length == 0) res.status(202).json({status:202,message:"no existe blogs",data:blogs});

        //res.json(newUser);
        res.status(200).json({status:200,message:"leido correctamente",data:blogs});
        //}
    }
    catch(err){   
        res.status(403).json({status:403,message:err.message});
    }

};

module.exports = {
    fullListOfBlogs
};