import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
import anime from '../../images/sharingan2.png';
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/');

        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        console.log(token);

        if(token) {
            const decodedToken = decode(token);
            console.log(decodedToken);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

  return (
    <>
        <AppBar className={classes.appBar} position='static' color='inherit' sx={{flexDirection: 'row'}}>
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant='h4' align='center'sx={{fontWeight: 'bold'}} >Anime Club</Typography>
            <img className={classes.image} src={anime} alt="anime" height="60px"/>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>LOGOUT</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}

        </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar
