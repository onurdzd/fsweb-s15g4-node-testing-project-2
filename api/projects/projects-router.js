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

router.post("/", mw.projeIsmiVarmi, async (req, res, next) => {
  try {
    const newProject=await Projects.create(req.body)
    res.status(201).json(newProject);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
