import React, { useState } from 'react';
import { AppBar, Button, Icon, Toolbar, Typography } from '@material-ui/core';
import Modal from 'react-modal';
import CreateRequest from './CreateRequest';
import Navbar from './Navbar';

function Appbar({ onChange, updateState }) {
  const [ isRequestModalOpen, setRequestModalOpen ] = useState(false);

  function toggleOpenRequestModal() {
    setRequestModalOpen(!isRequestModalOpen);
  }
  function closeRequestModal() {
    setRequestModalOpen(false);
  }

  return (
    <AppBar color='primary' position="static">
      <Toolbar className="top">
        <Typography variant="title" color="inherit" className="top-left">
          Help-Request App
        </Typography>       
        <div className="top-middle">
        <Navbar onChange={onChange}/>
        </div>
        <div className="top-right">
          <Button variant="contained" onClick={toggleOpenRequestModal}>
            New Request
          </Button>
          <Modal 
            isOpen={isRequestModalOpen} 
            onRequestClose={closeRequestModal} 
            centered
            style={customStyles}
            ariaHideApp={false}
          >
						<CreateRequest closeModal={closeRequestModal} updateState={updateState}/>
					</Modal>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "500px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
    minHeight: "200px"
  }
};

export default Appbar;