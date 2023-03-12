import React, { useState,useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import "./SignIn.css"
import { BASE_URL, endpoint } from '../../api';
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie";
const user = require("../../assets/ic_user.png")

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [error, setError] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    siginIn()

  };
  const OnSignUp = () => {
    navigate('/signup')

  }
  useEffect(() => {
    let authenticated = Cookies.get('authenticated');
    if (authenticated === '' || authenticated === null || authenticated === undefined) {
      navigate('/');
    } else {
      navigate('/profile')
      return
    }
  }, [navigate]);

  const siginIn = async () => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email !== "" && email.match(mailformat) && password !== "") {
      setError(false);
      setEmailError("")
      setErrorPass(false)
      setPasswordErr("")
      const url = BASE_URL + endpoint.login
      const response = await axios.post(url, {
        email: email,
        password: password
      })
      if (response.data.status === 200) {
        const inOneMinute = new Date(new Date().getTime() + 5 * 60 * 1000);
        Cookies.set('authenticated', response.data.token, { expires:inOneMinute}); // Session expires in 1 Min
        navigate('/profile', { state: { response: response.data } })
      }
      console.log(response.data, "signIn");
    } else {

      if (email === "" || email === null || email === undefined || !email.match(mailformat)) {
        setEmailError("Please Enter a Valid Email-Id")
        console.log(emailError);
        setError(true);
      }
      if (password.length < 8 || password === "" || password === null || password === undefined) {
        setPasswordErr("Password must be 8 character long")
        setErrorPass(true)
      }
    }

  }
  const onEmailChange = (e) => {
    e.preventDefault()
    console.log(e)
    setError(false)
    setEmail(e.currentTarget.value)
  }
  const onPasswordChange = (e) => {
    e.preventDefault()
    console.log(e)
    setErrorPass(false)
    setPassword(e.currentTarget.value)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className='user'>
        <img src={user} className="img1" alt='userImg' />
      </div>
      <p className='welcome'>
        Welcome !
      </p>
      <p className='tag'>
        Let's connect to your workspace. Please enter your email to continue.
      </p>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <OutlinedInput
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmailChange}
            type="email"
            error={error}
          />
          {error && <Typography sx={{ color: 'red', justifyContent: 'center', alignContent: 'center', margin: 0 }}>{emailError}</Typography>}
        </FormControl>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            onChange={onPasswordChange}
            error={errorPass}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff sx={{ color: '#003FB9' }} /> : <Visibility sx={{ color: '#003FB9' }} />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errorPass && <Typography sx={{ color: 'red', justifyContent: 'center', alignContent: 'center', margin: 0 }}>{passwordErr}</Typography>}
        </FormControl>

          <Grid item xs={6} md={12} >
            <Typography>
              <p className='for'>
                Forgot password?
              </p>
            </Typography>
          </Grid>
        <Button
          onClick={siginIn}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        {/* <Button
          onClick={OnSignUp}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 0, mb: 2 }}
          color="success"
        >
          Create New Account
        </Button> */}
      </Box>
    </Box>
  );
}