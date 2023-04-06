const Projects=require("./projects-model")
const db=require("../../data/db-config")

const newProject={name:"test1",description:"açıklama1"}

beforeAll(async()=>{
    await db.migrate.rollback();
    await db.migrate.latest()
})

beforeEach(async ()=> {
    await db.seed.run()
})

test("environment ayarı testing olarak ayarlandı",()=>{
    expect(process.env.NODE_ENV).toBe("testing")
})

describe("--------getAll-------",()=>{
    let projects;
    beforeEach(async ()=> {
        projects=await Projects.get()
    })
    test("[1] tüm projereler gösteriliyor",()=>{
        expect(projects).toHaveLength(2)
    })
})

describe("--------getById-------",()=>{
    let project;
    beforeEach(async ()=> {
        project=await Projects.getById(1)
    })
    test("[2] istenilen id li proje gösteriliyor",()=>{
        expect(project).toBeDefined()
        expect(project).toHaveProperty("name","Shopping Cart")
    })
})

describe("--------create-------",()=>{
    let createdProject;
    beforeEach(async ()=> {
        createdProject=await Projects.create(newProject)
    })
    test("[3] yeni eklenen proje gösteriliyor",()=>{
        expect(createdProject).toBeDefined()
        expect(createdProject).toMatchObject(newProject)
    })
})


describe("--------delete-------",()=>{
    let project;
    beforeEach(async ()=> {
        await Projects.remove(1)
        project=await Projects.getById(1)
    })
    test("[4] id si verilen projeyi siliyor",()=>{
        expect(project).not.toBeDefined()
    })
})

