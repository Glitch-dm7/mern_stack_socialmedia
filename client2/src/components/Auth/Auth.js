import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useStyles from './styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { createTheme } from '@mui/system';
import jwt_decodde from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup} from '../../actions/auth'

const theme = createTheme();
const initialState = { firstName: '', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      if(isSignedUp) {
        dispatch(signup(formData, navigate))
      } else {
        dispatch(signin(formData, navigate))
      }
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
      setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
      setShowPassword(false);
    };

    useEffect(()=>{
      /* global google */
      google.accounts.id.initialize({
        client_id: "382097848584-25rgc1eb6nouh3obssadooid0d87utsr.apps.googleusercontent.com",
        callback: googleSuccess
      })

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: ""}
      )
    },[])

    const googleSuccess = async(res) => {
      console.log(res);
      console.log("Encoded JWT ID token: " + res.credential);
      var userObject = jwt_decodde(res.credential);
      console.log(userObject); 

      const result = jwt_decodde(res?.credential);
      const token = res?.credential;
      
      try {
        dispatch({ type: 'AUTH', data: {result, token} });

        navigate('/');
      } catch (error) {
        console.log(error)
      }
    };
    
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>{isSignedUp ? 'Sign Up' : 'Sign In'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                isSignedUp && (
                  <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  </>
                )
              }
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              {isSignedUp && <Input name="confirmPassword" label="Reapeat Password" handleChange={handleChange} type="password" />}
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} sx={{margin: theme.spacing(3, 0, 2),}}>
              {isSignedUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Button id="signInDiv" className={classes.googleButton} sx={{width: '100%'}}></Button>
            <Grid container sx={{justifyContent:"flex-end"}}>
              <Grid>
                <Button onClick={switchMode}>
                  { isSignedUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  )
}

export default Auth

// continue 3:08;
// "You have created a new client application that uses libraries for user authentication 
// or authorization that will soon be deprecated. 
// New clients must use the new libraries instead; 
// existing clients must also migrate before these libraries are 
// deprecated. 
// See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) 
// for more information."