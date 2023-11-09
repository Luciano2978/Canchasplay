const express = require("express");
const router = express.Router();

const { getDataComplejo, getComentarios } = require("../Data/GetDataComplejo");
const {getCanchas,getHorariosDisponibles} = require("../Data/GetDataCancha");
const postDataUser = require("../Data/PostDataUserAuht0");
const createPreference = require("../Controllers/CreatePreference");
const createAccessToken = require("../Controllers/CreateAccountMp");
const getPublicKey = require("../Data/GetPublicKey");
const postReserva = require("../Data/PostDataReserva");
const getReserva = require("../Data/GetReserva");
const PayCreate = require("../Controllers/NotificacionWebhook");
const postComentario = require("../Data/PostDataComentarios");

//Propietario
const getDataHorarios = require('../Data/GetHorarios');
const { postComplejo, fileUpload_Logo, postUbicacion } = require('../Data/PostDataComplejo');
const { PostCancha, fileUpload_imgCancha } = require('../Data/PostDataCancha');
const { getCancha } = require('../Data/GetCanchas');
const { PutChancha } = require('../Data/PutCanchas');
const DeleteCancha = require('../Data/DeleteCanchas');
const { postHorario } = require('../Data/PostDataHorario');
const { getComplejo } = require('../Data/GetComplejo');
const PutEstadoComplejo = require('../Data/PutEstadoComplejo');
const { PutHorario } = require("../Data/PutHorario");
const { DeleteHorario } = require("../Data/DeleteHorario");

router.get("/getDataComplejo", getDataComplejo);

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

router.post("/postComentario",postComentario);

//Mp Webhook

router.post("/Notificacion",PayCreate)

//propietario
router.post('/images/post', fileUpload_Logo, postComplejo);
router.post('/createCancha', fileUpload_imgCancha, PostCancha);
router.post('/getCancha', getCancha);
router.put('/editCancha/:id', PutChancha);
router.delete('/deleteCancha/:id', DeleteCancha);
router.post('/createHorario', postHorario);
router.get("/getComplejo", getComplejo);
router.get('/getHorarios/:canchaId', getDataHorarios);
router.put('/editHorario/:id', PutHorario)
router.put("/putEstado", PutEstadoComplejo)
router.delete("/deleteHorario/:id", DeleteHorario)


module.exports =  router