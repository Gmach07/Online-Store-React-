import React, { useState } from 'react';
import {
  Avatar,
  Container,
  Divider,
  Grid,
  Icon,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ImageUploading from 'react-images-uploading';
import {
  Email,
  LocationOn,
  Payment,
  History,
  CameraAlt,
  Person,
  Lock
} from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: '16px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  avatarWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  avatarPerfil: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    border: `4px solid ${theme.palette.primary.main}`,
  },
  uploadButton: {
    borderRadius: '50%',
    padding: 12,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    position: 'absolute',
    bottom: 8,
    right: 'calc(50% - 60px)',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  input: {
    marginBottom: theme.spacing(3),
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
    }
  },
  divider: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.divider,
  },
  button: {
    marginTop: theme.spacing(3),
    fontWeight: 700,
    padding: theme.spacing(1.5),
    borderRadius: '12px',
    fontSize: '1rem',
  },
  userInfo: {
    padding: theme.spacing(4),
    borderRadius: '16px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    height: '100%',
  },
  listItem: {
    padding: theme.spacing(2),
    borderRadius: '8px',
    marginBottom: theme.spacing(2),
    transition: '0.3s',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    }
  },
}));

const Perfil = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);

  const onChangeImage = (imageList) => {
    setImages(imageList);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.title}>
              Mi Perfil
            </Typography>
            
            <Box className={classes.avatarWrapper}>
              <ImageUploading
                value={images}
                onChange={onChangeImage}
                maxNumber={1}
                dataURLKey="data_url"
              >
                {({ imageList, onImageUpload, onImageUpdate }) => (
                  <Box position="relative">
                    <Avatar
                      className={classes.avatarPerfil}
                      src={imageList[0]?.data_url || "https://i.pravatar.cc/300"}
                    />
                    <Button
                      className={classes.uploadButton}
                      onClick={() => imageList.length ? onImageUpdate(0) : onImageUpload()}
                    >
                      <CameraAlt fontSize="medium" />
                    </Button>
                  </Box>
                )}
              </ImageUploading>
            </Box>

            <form className={classes.form}>
              <TextField
                className={classes.input}
                label="Nombre"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
                value="German Luis"
              />
              
              <TextField
                className={classes.input}
                label="Apellido"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
                value="Machado Mejia"
              />
              
              <TextField
                className={classes.input}
                label="Correo"
                type="email"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <Email color="action" sx={{ mr: 1 }} />
                }}
                value="gmachado72015@gmail.com"
                disabled
              />
              
              <Divider className={classes.divider} />

              <TextField
                className={classes.input}
                label="Nueva Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <Lock color="action" sx={{ mr: 1 }} />
                }}
              />
              
              <TextField
                className={classes.input}
                label="Confirmar Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: <Lock color="action" sx={{ mr: 1 }} />
                }}
              />

              <Button
                fullWidth
                variant="contained"
                size="large"
                className={classes.button}
              >
                Guardar Cambios
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper className={classes.userInfo}>
            <Typography variant="h5" className={classes.title}>
              Actividad Reciente
            </Typography>
            
            <List>
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <History color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Pedido #12345"
                  secondary="Entregado el 15 de marzo, 2024"
                />
              </ListItem>
              
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <LocationOn color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Dirección Principal"
                  secondary="Calle Falsa 123, Ciudad, País"
                />
              </ListItem>
              
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <Payment color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Método de Pago"
                  secondary="Tarjeta Visa **** 1234"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Perfil;