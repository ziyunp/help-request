import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

function Navbar() {
  return (
      <List component="nav">
        <ListItem component="div">
          <ListItemText inset>
            <Typography color="inherit" variant="title">
              Request Queue
            </Typography>
          </ListItemText>


          <ListItemText inset>
            <Typography color="inherit" variant="title">
                Past Requests
            </Typography>
          </ListItemText>
        </ListItem >
      </List>
  );
}

export default Navbar;