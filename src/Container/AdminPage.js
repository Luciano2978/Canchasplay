import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { BottomNavigationAction } from "@mui/material";
import { Box } from "@mui/material";
import { BottomNavigation } from "@mui/material";
import DialogLogout from "../Components/DialogLogout";
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    backgroundColor: "aqua",
    width: 400,
    border: "2px solid #000",
    padding: "2px  4px 3px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
});

const AdminPage = () => {
  const estilo = useStyles();
  const [datosAdm, setDatosAdm] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalBorrar, setModalBorrar] = useState(false);
  const [propietarioSelect, setPropietarioSelect] = useState({
    id_Propietario:"",
    nombre: "",
    apellido: "",
    num_telefono: "",
    dni: "",
    email: "",
    certificado_comercio: "",
    Verificado: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropietarioSelect((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  
  const cargarDatos = () => {
    axios
      .get("https://canchas-play.onrender.com/getDatosProp")
      .then((response) => {
        setDatosAdm(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error " + error);
      });
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalBorrar = () => {
    setModalBorrar(!modalBorrar);
  };

  const handleEditarProp = () => {
    axios
      .put(`https://canchas-play.onrender.com/editProp `, propietarioSelect)
      .then((response) => {
        cargarDatos(); // Actualizar datos después de editar
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarProp = () => {
    try {
      axios.post("https://canchas-play.onrender.com/deleteProp", {
        data: propietarioSelect,
      });

      setDatosAdm((prevDatos) =>
        prevDatos.map((propietario) =>
          propietario.id_Propietario === propietarioSelect.id_Propietario
            ? { ...propietario, Verificado: 0 }
            : propietario
        )
      );
      abrirCerrarModalBorrar();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { name: "id_Propietario", label: "ID" },
    { name: "nombre", label: "Nombre" },
    { name: "apellido", label: "Apellido" },
    { name: "num_telefono", label: "Telefono" },
    { name: "dni", label: "DNI" },
    { name: "email", label: "Correo" },
    { name: "certificado_comercio", label: "Certificado Cancha" },
    { name: "Verificado", label: "Estado" },
    {
      name: "edit",
      label: "Editar",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <EditIcon
            cursor="pointer"
            onClick={() => seleccionarPropietario(tableMeta.rowData)}
          />
        ),
      },
    },
    {
      name: "delete",
      label: "Eliminar",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <DeleteIcon
            cursor="pointer"
            onClick={() => handleDelete(tableMeta.rowData)}
          />
        ),
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {},
  };

  const bodyEditar = (
    <div className={estilo.modal}>
      <h3>Editar Propietario</h3>
      <TextField
        className={estilo.inputMaterial}
        label="Nombre"
        name="nombre"
        onChange={handleChange}
        value={propietarioSelect.nombre}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Apellido"
        name="apellido"
        onChange={handleChange}
        value={propietarioSelect.apellido}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Telefono"
        name="num_telefono"
        onChange={handleChange}
        value={propietarioSelect.num_telefono}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Dni"
        name="dni"
        onChange={handleChange}
        value={propietarioSelect.dni}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Correo"
        name="email"
        onChange={handleChange}
        value={propietarioSelect.email}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Certificado Cancha"
        name="certificado_comercio"
        onChange={handleChange}
        value={propietarioSelect.certificado_comercio}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Estado"
        name="Verificado"
        onChange={handleChange}
        value={propietarioSelect.Verificado}
      />
      <br />

      <br />
      <div align="right">
        <Button color="primary" onClick={handleEditarProp}>
          Editar
        </Button>
        <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={estilo.modal}>
      <p>
        Estás seguro que deseas eliminar al Propietario/a{" "}
        <b>{propietarioSelect.nombre}</b>?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={eliminarProp}>
          Sí
        </Button>
        <Button onClick={abrirCerrarModalBorrar}>No</Button>
      </div>
    </div>
  );

  const seleccionarPropietario = (rowData) => {
    setPropietarioSelect({
      id_Propietario: rowData[0],
      nombre: rowData[1],
      apellido: rowData[2],
      num_telefono: rowData[3],
      dni: rowData[4],
      email: rowData[5],
      certificado_comercio: rowData[6],
      Verificado: rowData[7],
    });

    abrirCerrarModalEditar();
  };

  const handleDelete = (rowData) => {
    setPropietarioSelect({
      id_Propietario: rowData[0],
      nombre: rowData[1],
      apellido: rowData[2],
      num_telefono: rowData[3],
      dni: rowData[4],
      email: rowData[5],
      certificado_comercio: rowData[6],
      Verificado: rowData[7],
    });

    abrirCerrarModalBorrar();
  };

  const [showDialogLogout, setshowDialogLogout] = useState(false);

  const handleOpenDialogLogout = () => {
    setshowDialogLogout(true);
  };

  const handleCloseDialogLogout = () => {
    setshowDialogLogout(false);
  };
  return (
    <div>
      <MUIDataTable
        title={"Datos Con Axios"}
        data={datosAdm}
        columns={columns}
        options={options}
      />

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal open={modalBorrar} onClose={abrirCerrarModalBorrar}>
        {bodyEliminar}
      </Modal>
      <Box sx={{ 
        width: "100%",  
        position: "fixed",
        bottom: 0,
        
        }}>
      <BottomNavigation
        style={{
          backgroundColor: "black"
        }}
        showLabels
      >
        <BottomNavigationAction  label="Logout" icon={<LogoutIcon  />} style={{color: "white"}} onClick={() => handleOpenDialogLogout()} />
      </BottomNavigation>
    </Box>
    <DialogLogout
        open={showDialogLogout}
        onClose={handleCloseDialogLogout}
      />
    </div>
    
  );
};

export default AdminPage;
