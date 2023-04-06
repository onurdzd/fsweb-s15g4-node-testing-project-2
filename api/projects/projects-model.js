const db=require("../../data/db-config")

const get =() =>{
    return db("projects")
}

module.exports={get}