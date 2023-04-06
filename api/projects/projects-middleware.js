const Projects = require("./projects-model")

const datadaProjeVarmi=async(req,res,next)=>{
    try {
        const projects=await Projects.get()
        if(projects){
            req.payload=projects
            next()
        }else{
            next({
                status:404,
                message:"Data da kayıtlı proje yok"
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports={datadaProjeVarmi}