const db=require("../../data/db-config")

const get =() =>{
    return db("projects")
}

const getById =(project_id) =>{
    return db("projects").where("project_id",project_id).first()
}

const getByName=(project_name)=>{
    return db("projects").where("name",project_name).first()
}

const create =async (project) =>{
    const newProjectId= await db("projects").insert(project)
    const newProject=await getById(newProjectId[0])
    return newProject
}

const remove=(project_id)=>{
    return db("projects").where("project_id",project_id).del(project_id)
}

module.exports={get,getById,getByName,create,remove}