import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { createRequest } from '../utils/queryHelpers';

function CreateRequest(props) {
  const { closeModal } = props;
  const handleSubmit = () => {
    
  }
  return (
    <div>
      <Typography variant="title">New Request</Typography>
      <Button 
        variant="outlined" 
        size="small" 
        className="close-button" 
        onClick={closeModal}
      >
        close
      </Button>
      <form noValidate autoComplete="off">
        <div className="input">
          <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth/>
        </div>
        <div className="input">
          <TextField id="outlined-basic" label="Location" variant="outlined" />
        </div>
        <div className="input form-buttons">
        <div className="cancel">
          <Button 
            variant="outlined" 
            onClick={closeModal}
          >
            cancel
          </Button>
        </div>
        <div className="submit">
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            color="primary"
          >
            submit
          </Button>
        </div>
        </div>
      </form>
    </div>
  );
}

export default CreateRequest;