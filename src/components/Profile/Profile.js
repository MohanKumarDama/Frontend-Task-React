import React, { useEffect, useState } from 'react'
import { BASE_URL, endpoint } from '../../api';
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';


const Profile = () => {
  const [name, setName] = useState('');
  const { state } = useLocation();
  const { response } = state || {};
  const navigate = useNavigate();
  let userName;
  const getUserDetails = async () => {
    const url = BASE_URL + endpoint.getUser
    let authenticatedToken = Cookies.get('authenticated');
    const userResponse = await axios.get(url, { headers: { "Authorization": `Bearer ${authenticatedToken}` } })
    console.log(userResponse,"%%%%%%%%%%%%%%%%%%%%%%%5")
    if (userResponse.status === 200) {
      setName(userResponse?.data?.data?.name)
    }
  }
  useEffect( () => {
    getUserDetails()
  }, [])


  // Check if user is authenticated and session is valid
  useEffect(() => {
    let authenticated = Cookies.get('authenticated');
    console.log(authenticated)
    if (authenticated === '' || authenticated === null || authenticated === undefined) {
      navigate('/');
    } else {
      navigate('/profile')
      return
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        // marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      mt={'auto'}
      mb={'auto'}
    >
      <Typography color={'primary'} variant="h4" component="h5">
        Welcome :  {`"${name}"`}
      </Typography>
    </Box>
  )
}

export default Profile