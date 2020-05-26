import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import Modal from 'react-modal';
import CreateRequest from './CreateRequest';
import Navbar from './Navbar';

function Appbar(props) {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  function toggleOpenRequestModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeRequestModal() {
    setIsModalOpen(false);
  }

  return (
    <AppBar color='primary' position="static">
      <Toolbar className="top">
        <Typography variant="title" color="inherit" className="top-left">
          Help-Request App
        </Typography>       
        <div className="top-middle">
        <Navbar onChange={props.onChange}/>
        </div>
        <div className="top-right">
          <Button variant="contained" onClick={toggleOpenRequestModal}>
            New Request
          </Button>
          <Modal 
            isOpen={isModalOpen} 
            onRequestClose={closeRequestModal} 
            centered
            style={customStyles}
            ariaHideApp={false}
          >
						<CreateRequest closeModal={closeRequestModal} updateState={props.updateState}/>
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
    transform: "translate(-50%,-50%)"
  }
};

export default Appbar;