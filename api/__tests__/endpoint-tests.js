const Projects=require("../projects/projects-model")
const request=require("supertest")
const server = require("../server")
const db=require("../../data/db-config")

beforeAll(async ()=> {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=> {
    await db.seed.run();
})

describe("------------ [GET] api/Projects -------------",()=>{
    test("[1] tüm projeleri dönüyor",async ()=>{
        const res=await request(server).get("/api/projects")
        const projects=await Projects.get()
        expect(res.body).toHaveLength(projects.length)
    })
})

describe("------------ [GET] api/Projects/:id -------------",()=>{
    test("[2] istenilen id li projeyi dönüyor",async ()=>{
        const res=await request(server).get("/api/projects/1")
        expect(res.body).toMatchObject({name:"Shopping Cart"})
        expect(res.status).toEqual(201)
    })
    test("[3] istenilen id li projeyi yoksa hata mesajı verir",async ()=>{
        const res=await request(server).get("/api/projects/5")
        expect(res.body.message).toMatch(/İlgili id nolu proje yok/)
        expect(res.status).toEqual(404)
    })
})

describe("------------ [POST] api/Projects/ -------------",()=>{
    test("[4] eklenen projeyi döndürüyor",async ()=>{
        const newProject={name:"boo",description:"foo"}
        const res=await request(server).post("/api/projects/").send(newProject)
        expect(res.body).toMatchObject(newProject)
        expect(res.status).toEqual(201)
    })
    test("[5] eklenen projeye mevcutsa hata mesajı dönüyor",async ()=>{
        const newProject={name:"Shopping Cart",description:"foo"}
        const res=await request(server).post("/api/projects/").send(newProject)
        expect(res.body.message).toMatch(/İlgili proje ismi daha önce kullanılmış/)
        expect(res.status).toEqual(404)
    })
})