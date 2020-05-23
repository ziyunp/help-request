import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

import Navbar from './Navbar';

function Appbar() {
  return (
    <AppBar color='primary' position="static">
      <Toolbar className="top">
        <Typography variant="title" color="inherit" className="top-left">
          Help-Request App
        </Typography>       
        <div className="top-middle">
        <Navbar />
        </div>
        <div className="top-right">
          <Button variant="contained">New Request</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;