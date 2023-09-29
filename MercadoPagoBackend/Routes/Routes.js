const express = require("express");
const router = express.Router();

const { getComplejo, getComentarios } = require("../Data/GetDataComplejo");
const {getCanchas,getHorariosDisponibles} = require("../Data/GetDataCancha");
const postDataUser = require("../Data/PostDataUserAuht0");
const createPreference = require("../Controllers/CreatePreference");
const createAccessToken = require("../Controllers/CreateAccountMp");
const getPublicKey = require("../Data/GetPublicKey");

router.get("/getComplejo", getComplejo);

router.post("/getComentarios",getComentarios);

router.post("/getDataCanchas",getCanchas);

router.post("/getDataHorarios",getHorariosDisponibles);

router.post("/create_preference",createPreference);

router.get("/createAccessToken",createAccessToken)

router.post("/get_PublicKey",getPublicKey)

module.exports =  router