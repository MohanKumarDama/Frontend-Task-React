import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import "./SignUp.css"
import { BASE_URL, endpoint } from '../../api';
import { useNavigate } from 'react-router-dom'
const user = require("../../assets/ic_user.png")

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [nameErr, setNameErr] = useState("")
  const [error, setError] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    OnSignUp()

  };
  const OnSignUp = async () => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(email.match(mailformat));
    const url = BASE_URL + endpoint.register;
    if (email !== "" && email.match(mailformat) && password !== "" && userName !== undefined && userName!== "") {
      const response = await axios.post(url, {
       name: userName,
       email: email,
       password: password
      })
      console.log(userName, email, password,"userName, email, password")
      if (response.status === 201) {
        navigate('/')
      }
      console.log(userName, email, password)
      setError(false);
      setEmailError("")
      setErrorPass(false)
      setPasswordErr("")
      setNameErr("")
      setErrorName(false)
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
      if (userName === "" || userName === null || userName === undefined) {
        setNameErr("Name cannot be Empty")
        setErrorName(true)
      }
    }
  }
  const onEmailChange = (e) => {
    e.preventDefault()
    setError(false)
    setEmail(e.currentTarget.value)
  }
  const onPasswordChange = (e) => {
    e.preventDefault()
    setErrorPass(false)
    setPassword(e.currentTarget.value)
  }
  const onNameChange = (e) => {
    e.preventDefault()
    setErrorName(false)
    setUserName(e.currentTarget.value)
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
        Register
      </p>
      <p className='tag'>
        Enter your details to create a new account
      </p>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="name">Name</InputLabel>
          <OutlinedInput
            margin="normal"
            required
            fullWidth
            // id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={onNameChange}
            type="username"
            error={errorName}
          />
          {errorName && <Typography sx={{ color: 'red', justifyContent: 'center', alignContent: 'center', margin: 0 }}>{nameErr}</Typography>}
        </FormControl>
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
        <Button
          onClick={OnSignUp}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}