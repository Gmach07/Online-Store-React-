import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de datos (reemplazar con una llamada a API en producción)
    const fetchUsuarios = async () => {
      const data = [
        { id: 1, nombre: "Juan Pérez", email: "juan@example.com", rol: "Comprador" },
        { id: 2, nombre: "María López", email: "maria@example.com", rol: "Comprador" },
      ];
      setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const handleDelete = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const handleEdit = (usuario) => {
    // Navega hacia la ruta de edición pasando el id del usuario
    navigate(`/editarUsuario/${usuario.id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.id}</TableCell>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              <TableCell>{usuario.rol}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(usuario)}>
                  <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(usuario.id)}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Usuarios;


