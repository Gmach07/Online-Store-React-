import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../../../actions/UsuarioActions";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getUsuarios({ pageIndex: page, pageSize: rowsPerPage });

        // ✅ Corrección aquí: accede a response.data.data directamente
        if (response && response.data && Array.isArray(response.data.data)) {
          setUsuarios(response.data.data);
          setTotalUsers(response.data.count || 0);
        } else {
          console.warn("Estructura de respuesta inesperada para getUsuarios:", response);
          setUsuarios([]);
          setTotalUsers(0);
          setError("La API devolvió una estructura de datos inesperada.");
        }
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setError("Error al cargar los usuarios. Por favor, inténtelo de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    console.log(`Simulando eliminación del usuario con ID: ${id}`);
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const handleEdit = (usuario) => {
    navigate(`/editarUsuario/${usuario.id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Cargando usuarios...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', color: 'error.main' }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  if (usuarios.length === 0 && !loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h6">No hay usuarios para mostrar.</Typography>
      </Box>
    );
  }

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
              <TableCell>{usuario.admin ? "Admin" : "Usuario"}</TableCell>
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
      />
    </TableContainer>
  );
};

export default Usuarios;
