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

const idGecerlimi=async(req,res,next)=>{
    try {
        let {id}=req.params
        const project=await Projects.getById(id)
        if(project){
            req.payload=project
            next()
        }else{
            next({
                status:404,
                message:"İlgili id nolu proje yok"
            })
        }
    } catch (error) {
        next(error)
    }
}

const projeIsmiVarmi=async(req,res,next)=>{
    try {
        const project=await Projects.getByName(req.body.name)
        if(project){
            next({
                status:404,
                message:"İlgili proje ismi daha önce kullanılmış"
            })
        }else{
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports={datadaProjeVarmi,idGecerlimi,projeIsmiVarmi}