const router = require("express").Router();

const Projects = require("./projects-model");
const mw = require("./projects-middleware");

router.get("/", mw.datadaProjeVarmi, async (req, res, next) => {
  try {
    res.status(201).json(req.payload);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  mw.datadaProjeVarmi,
  mw.idGecerlimi,
   (req, res, next) => {
    try {
      res.status(201).json(req.payload);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", mw.projeIsmiVarmi,mw.bosGonderimVarmi, async (req, res, next) => {
  try {
    const newProject=await Projects.create(req.body)
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id",  mw.idGecerlimi,async (req, res, next) => {
    try {
      const deletedProject=await Projects.getById(req.params.id)
      await Projects.remove(req.params.id)
      res.status(201).json({message:`${deletedProject.project_id} id nolu proje silindi`});
    } catch (error) {
      next(error);
    }
  });

  router.put("/:id",  mw.idGecerlimi,mw.bosGonderimVarmi,async (req, res, next) => {
    try {
     await Projects.updates(req.params.id,req.body)
     const updatedProject=await Projects.getById(req.params.id)
    res.status(201).json(updatedProject);
    } catch (error) {
      next(error);
    }
  });  

module.exports = router;
