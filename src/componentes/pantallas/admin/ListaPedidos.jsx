import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Visibility, Cancel } from "@mui/icons-material";

const ListaPedidos = () => {
  // Datos de ejemplo (puedes reemplazarlos con tu propia lógica o fetch a una API)
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: "Juan Pérez", total: 59.99, fecha: "2025-03-18", estado: "Pendiente" },
    { id: 2, cliente: "María López", total: 89.5, fecha: "2025-03-19", estado: "En proceso" },
    { id: 3, cliente: "Carlos Ramírez", total: 120, fecha: "2025-03-20", estado: "Completado" },
  ]);

  // Acción para ver detalles del pedido (podrías navegar a otra ruta o abrir un modal)
  const handleView = (id) => {
    console.log(`Ver detalles del pedido con ID: ${id}`);
    // Ejemplo: navigate(`/detallePedido/${id}`);
  };

  // Acción para cancelar el pedido
  const handleCancel = (id) => {
    console.log(`Cancelar pedido con ID: ${id}`);
    // Aquí podrías cambiar el estado a 'Cancelado', llamar a la API, etc.
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.id === id ? { ...pedido, estado: "Cancelado" } : pedido
      )
    );
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos.map((pedido) => (
            <TableRow key={pedido.id}>
              <TableCell>{pedido.id}</TableCell>
              <TableCell>{pedido.cliente}</TableCell>
              <TableCell>${pedido.total}</TableCell>
              <TableCell>{pedido.fecha}</TableCell>
              <TableCell>{pedido.estado}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleView(pedido.id)}>
                  <Visibility color="primary" />
                </IconButton>
                <IconButton onClick={() => handleCancel(pedido.id)}>
                  <Cancel color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListaPedidos;
