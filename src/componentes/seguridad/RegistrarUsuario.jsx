import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const RegistrarUsuario = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '10vh',
        backgroundColor: 'background.default',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 3,
          width: 400,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Registro de Usuario
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Ingrese su nombre" variant="outlined" fullWidth />
          <TextField label="Ingrese su apellido" variant="outlined" fullWidth />
          <TextField label="Ingrese su email" type="email" variant="outlined" fullWidth />
          <TextField label="Ingrese su password" type="password" variant="outlined" fullWidth />
          <Button variant="contained" color="primary" fullWidth>
            Registrar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegistrarUsuario;

