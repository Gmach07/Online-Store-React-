import React from 'react';
import { Container, Typography, Grid, Card, Avatar, Icon, TextField, Button, Link } from '@mui/material';

const Login = () => {
    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={4}>
                    <Card>
                        <Avatar>
                            <Icon>person</Icon>
                        </Avatar>
                        <Typography variant="h5">
                            Ingrese Su Usuario
                        </Typography>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        type="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        type="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color="primary"
                                    >
                                        Ingresar
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="/" variant="body2">
                                        No tienes cuenta? Regístrate
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
