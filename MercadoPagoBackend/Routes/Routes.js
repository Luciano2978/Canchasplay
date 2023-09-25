const express = require("express");
const router = express.Router();

const { getComplejo, getComentarios } = require("../Data/GetDataComplejo");


// Home page route.
router.get("/getComplejo", getComplejo);


router.get("/getComentarios",getComentarios);



module.exports =  router