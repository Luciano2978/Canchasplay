const express = require("express");
const router = express.Router();

const { getComplejo, getComentarios } = require("../Data/GetDataComplejo");
const {getCanchas,getHorariosDisponibles} = require("../Data/GetDataCancha");
const postDataUser = require("../Data/PostDataUserAuht0");
const createPreference = require("../Controllers/CreatePreference");
const createAccessToken = require("../Controllers/CreateAccountMp");
const getPublicKey = require("../Data/GetPublicKey");
const postReserva = require("../Data/PostDataReserva");
const getReserva = require("../Data/GetReserva");
const PayCreate = require("../Controllers/NotificacionWebhook");

router.get("/getComplejo", getComplejo);

router.post("/getComentarios",getComentarios);

router.post("/getDataCanchas",getCanchas);

router.post("/getDataHorarios",getHorariosDisponibles);

router.post("/create_preference",createPreference);

router.get("/createAccessToken",createAccessToken);

router.post("/get_PublicKey",getPublicKey);

router.post("/getDatos",postDataUser);

//modulo MiReservas
router.post("/create_Reserva",postReserva);

router.post("/getReservas",getReserva);

//Mp Webhook

router.post("/Notificacion",PayCreate)

module.exports =  router