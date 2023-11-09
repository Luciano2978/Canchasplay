import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { useAuth0 } from '@auth0/auth0-react';

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
    id_Propietario: "",
    id_Cuenta: "",
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
    axios
      .get("http://localhost:8080/getDatosProp")
      .then((response) => {
        setDatosAdm(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error " + error);
      });
  }, []);

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalBorrar = () => {
    setModalBorrar(!modalBorrar);
  };

  const handleEditarProp = () => {
    axios
      .put(`http://localhost:8080/editProp `, propietarioSelect)
      .then((response) => {
        var dataNueva = datosAdm;
        dataNueva.map((propietario) => {
          if (propietario.id_Propietario === propietarioSelect.id_Propietario) {
            propietario.id_Propietario = propietarioSelect.id_Propietario;
            propietario.id_Cuenta = propietarioSelect.id_Cuenta;
            propietario.nombre = propietarioSelect.nombre;
            propietario.apellido = propietarioSelect.apellido;
            propietario.num_telefono = propietarioSelect.num_telefono;
            propietario.dni = propietarioSelect.dni;
            propietario.email = propietarioSelect.email;
            propietario.certificado_comercio =
              propietarioSelect.certificado_comercio;
            propietario.Verificado = propietarioSelect.Verificado;
          }
        });
        setDatosAdm(dataNueva);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarProp = async () => {
    try {
      await axios.delete("http://localhost:8080/deleteProp", {
        data: propietarioSelect,
      });

      setDatosAdm((prevDatos) =>
        prevDatos.filter(
          (propietario) =>
            propietario.id_Propietario !== propietarioSelect.id_Propietario
        )
      );

      abrirCerrarModalBorrar();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      name: "id_Propietario",
      label: "ID",
      options: { filter: true, sort: true },
    },
    { name: "id_Cuenta", label: "ID_Cuenta" },
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
        label="ID"
        name="id_Propietario"
        onChange={handleChange}
        value={propietarioSelect && propietarioSelect.id_Propietario}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="ID_Cuenta"
        name="id_Cuenta"
        onChange={handleChange}
        value={propietarioSelect && propietarioSelect.id_Cuenta}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Nombre"
        name="nombre"
        onChange={handleChange}
        value={propietarioSelect && propietarioSelect.nombre}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Apellido"
        name="apellido"
        onChange={handleChange}
        value={propietarioSelect && propietarioSelect.apellido}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Telefono"
        name="num_telefono"
        onChange={handleChange}
        value={propietarioSelect && propietarioSelect.num_telefono}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Dni"
        name="dni"
        onChange={handleChange}
        value={propietarioSelect && propietarioSelect.dni}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Correo"
        name="email"
        onChange={handleChange}
        value={propietarioSelect && propietarioSelect.email}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Certificado Cancha"
        name="certificado_comercio"
        onChange={handleChange}
        value={propietarioSelect && propietarioSelect.certificado_comercio}
      />
      <br />
      <TextField
        className={estilo.inputMaterial}
        label="Estado"
        name="Verificado"
        onChange={handleChange}
        value={propietarioSelect && propietarioSelect.Verificado}
      />
      <br />

      <br />
      <div align="right">
        <Button color="primary" onClick={() => handleEditarProp()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className={estilo.modal}>
      <p>
        Estás seguro que deseas eliminar al Propietario/a{" "}
        <b>{propietarioSelect && propietarioSelect.nombre}</b>?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => eliminarProp()}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalBorrar()}>No</Button>
      </div>
    </div>
  );

  const seleccionarPropietario = (rowData) => {
    setPropietarioSelect({
      id_Propietario: rowData[0],
      id_Cuenta: rowData[1],
      nombre: rowData[2],
      apellido: rowData[3],
      num_telefono: rowData[4],
      dni: rowData[5],
      email: rowData[6],
      certificado_comercio: rowData[7],
      Verificado: rowData[8],
    });

    abrirCerrarModalEditar();
    console.log(propietarioSelect);
  };

  const handleDelete = (rowData) => {
    setPropietarioSelect({
      id_Propietario: rowData[0],
      id_Cuenta: rowData[1],
      nombre: rowData[2],
      apellido: rowData[3],
      num_telefono: rowData[4],
      dni: rowData[5],
      email: rowData[6],
      certificado_comercio: rowData[7],
      Verificado: rowData[8],
    });
    console.log(propietarioSelect, "adasdsada");
    abrirCerrarModalBorrar();
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
    </div>
  );
};

export default AdminPage;
