import React, { useState } from 'react';
import { 
  Container, 
  Stepper, 
  Step, 
  StepLabel, 
  Typography, 
  TextField, 
  Grid, 
  Button, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: '2rem 0',
  },
  stepper: {
    marginBottom: '2rem',
  },
  form: {
    marginTop: '1rem',
  },
  button: {
    marginTop: '1rem',
  },
}));

const ProcesoCompra = ({ carrito: carritoProp }) => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  // Carrito recibido por state o por prop
  const carrito = location.state?.carrito || carritoProp || [];

  const [activeStep, setActiveStep] = useState(0);

  // Estados para datos de envío
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');

  // Estado para método de pago
  const [metodoPago, setMetodoPago] = useState('');

  const steps = ['Envío', 'Método de pago', 'Resumen del pedido'];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Genera un ID aleatorio y navega a OrdenCompra
  const finalizarPedido = () => {
    // Ejemplo de ID aleatorio (6 dígitos)
    const orderId = Math.floor(100000 + Math.random() * 900000);

    navigate(`/ordenCompra/${orderId}`, {
      state: {
        direccion,
        ciudad,
        pais,
        metodoPago,
        carrito
      }
    });
  };

  return (
    <Container className={classes.container}>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Paso 0: Datos de Envío */}
      {activeStep === 0 && (
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className={classes.form}
        >
          <Typography variant="h6">Información de Envío</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección"
                variant="outlined"
                fullWidth
                required
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ciudad"
                variant="outlined"
                fullWidth
                required
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="País"
                variant="outlined"
                fullWidth
                required
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                className={classes.button}
              >
                Continuar
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Paso 1: Método de Pago */}
      {activeStep === 1 && (
        <Box className={classes.form}>
          <Typography variant="h6">Método de Pago</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="select-pago-label">
                  Seleccione un método de pago
                </InputLabel>
                <Select
                  labelId="select-pago-label"
                  id="select-pago"
                  label="Seleccione un método de pago"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <MenuItem value="tarjeta">Tarjeta de crédito</MenuItem>
                  <MenuItem value="paypal">Paypal</MenuItem>
                  <MenuItem value="transferencia">Transferencia bancaria</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  onClick={handleBack}
                >
                  Atrás
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={handleNext}
                >
                  Continuar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Paso 2: Resumen del Pedido */}
      {activeStep === 2 && (
        <Box className={classes.form}>
          <Typography variant="h6">Resumen del Pedido</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Dirección:</strong> {direccion}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Ciudad:</strong> {ciudad}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>País:</strong> {pais}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Método de Pago:</strong> {metodoPago}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Productos:</Typography>
              {carrito.length === 0 ? (
                <Typography variant="body1">
                  El carrito está vacío.
                </Typography>
              ) : (
                carrito.map((producto) => (
                  <Typography key={producto.key} variant="body1">
                    {producto.nombre} - {producto.cantidad} x ${producto.precio.toFixed(2)} = ${(producto.cantidad * producto.precio).toFixed(2)}
                  </Typography>
                ))
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Total: ${carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={6}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  onClick={handleBack}
                >
                  Atrás
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  onClick={finalizarPedido}
                >
                  Realizar Pedido
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProcesoCompra;


