const router = require("express").Router();

const Projects = require("./projects-model");
const mw = require("./projects-middleware");

router.get("/", mw.datadaProjeVarmi, async (req,res, next) => {
  try {
    res.status(201).json(req.payload);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
