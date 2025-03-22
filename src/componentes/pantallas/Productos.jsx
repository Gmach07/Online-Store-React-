import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Avatar,
  Chip,
  Box,
  Skeleton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductoArray } from '../data/dataPruebas';
import { Star, ShoppingCart, ArrowForward } from '@mui/icons-material';

const Productos = () => {
  const navigate = useNavigate();

  const verProducto = (id) => {
    navigate(`/detalleProducto/${id}`);
  };

  return (
    <Container sx={{ 
      mt: 4,
      py: 3,
      position: 'relative'
    }}>
      <Typography
        variant="h3"
        sx={{ 
          mb: 6, 
          textAlign: 'center',
          fontWeight: 900,
          letterSpacing: 1.5,
          color: 'primary.main',
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            width: '100px',
            height: '4px',
            backgroundColor: 'secondary.main',
            margin: '20px auto'
          }
        }}
      >
        Nuestros Productos
      </Typography>
      
      <Grid container spacing={4}>
        {ProductoArray.map((producto) => (
          <Grid item lg={3} sm={6} md={4} xs={12} key={producto.key}>
            <Card sx={{ 
              position: 'relative',
              overflow: 'visible',
              p: 2,
              borderRadius: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}>
              {/* Badges */}
              <Box sx={{ 
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                gap: 1,
                zIndex: 1
              }}>
                <Chip
                  label="Nuevo"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
                <Chip
                  label={`${producto.unidades} en stock`}
                  color="warning"
                  size="small"
                />
              </Box>

              <CardMedia
                component="img"
                image={producto.imagen}
                alt={producto.nombre}
                sx={{ 
                  height: 250,
                  objectFit: 'contain',
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: '#f5f5f5'
                }}
              />
              
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 70,
                  height: 70,
                  position: 'absolute',
                  top: -32,
                  left: 16,
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  boxShadow: 3
                }}
              >
                ${producto.precio}
              </Avatar>
              
              <CardContent sx={{ pt: 4 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    minHeight: 64,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {producto.nombre}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                  color: 'warning.main'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fontSize="small" />
                  ))}
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{
                    minHeight: 80,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {producto.descripcion}
                </Typography>
              </CardContent>
              
              <Button
                fullWidth
                variant="contained"
                color="primary"
                endIcon={<ArrowForward />}
                onClick={() => verProducto(producto.key)}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}
              >
                Ver Detalles
              </Button>
              
              <Button
                startIcon={<ShoppingCart />}
                sx={{
                  position: 'absolute',
                  bottom: -20,
                  right: 16,
                  bgcolor: 'secondary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'secondary.dark'
                  }
                }}
              >
                Comprar
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Productos;

