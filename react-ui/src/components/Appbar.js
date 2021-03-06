import React, { useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import Modal from 'react-modal';
import CreateRequest from './CreateRequest';
import Navbar from './Navbar';
import GiveHelp from './GiveHelp';

function Appbar({ onChange, updateState, getQueuePos }) {
  const [ isRequestModalOpen, setRequestModalOpen ] = useState(false);
  const [ isHelpModalOpen, setHelpModalOpen ] = useState(false);

  function toggleOpenRequestModal() {
    setRequestModalOpen(!isRequestModalOpen);
  }

  function closeRequestModal() {
    setRequestModalOpen(false);
  }

  function toggleOpenHelpModal() {
    setHelpModalOpen(!isHelpModalOpen);
  }

  function closeHelpModal() {
    setHelpModalOpen(false);
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
          <div className="left">
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
              <CreateRequest 
                closeModal={closeRequestModal} 
                updateState={updateState}
                getQueuePos={getQueuePos}
              />
            </Modal>
          </div>
          <div className="right">
          <Button variant="contained" onClick={toggleOpenHelpModal}>
            Give help
          </Button>
          <Modal 
            isOpen={isHelpModalOpen} 
            onHelpClose={closeHelpModal} 
            centered
            style={customStyles}
            ariaHideApp={false}
          >
						<GiveHelp closeModal={closeHelpModal} updateState={updateState}/>
					</Modal>
          </div>
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