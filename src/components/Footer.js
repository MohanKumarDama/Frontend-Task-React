import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'space-between',
  },
  root1: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  image: {
    height: 23, 
    width: 100
  },

}));
const logo = require("../assets/zaperon_logo.png")
const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      {/* <Box>
        <Typography style={{ padding: 20 }} variant="body2" color="textSecondary">
          Powered By 
        </Typography>
        <img src={logo} style={{ height: 23, width: 100 }} />
      </Box> */}
      <Box className={classes.root1}>
      <Typography style={{ padding: 20 }} variant="body2" color="textSecondary">
          Powered By 
        </Typography>
        <img className={classes.image} src={logo} alt="Example" />
      </Box>
      <Box>
        <Link href="/help" color="primary" variant='h6' style={{ fontSize: 20, fontWeight: 'bold' }}>
          Need Help?
        </Link>
        <span>&nbsp;&nbsp;{'             '}&nbsp;&nbsp;</span>
        <Link href="/privacy-policy" color="primary" variant='h6' style={{ fontSize: 20, fontWeight: 'bold' }}>
          Privacy Policy <span style={{ color: '#A2A2A2' }}> &amp; </span> Terms
        </Link>
      </Box>
    </footer>
  );
};

export default Footer;
