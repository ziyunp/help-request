import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from '@material-ui/core';
import { createRequest } from '../utils/queryHelpers';

function CreateRequest({ closeModal, updateState }) {
  const [ titleValue, setTitleValue ] = useState('');
  const [ locationValue, setLocationValue ] = useState('');
  const { handleSubmit, register, errors } = useForm();

  function handleTitleChange (e) {
    setTitleValue(e.target.value);
  }

  function handleLocationChange (e) {
    setLocationValue(e.target.value);
  }

  async function onSubmit () {
    const updatedRequests = await createRequest(titleValue, locationValue);
    updateState(updatedRequests);
    closeModal();
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
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="input">
          <TextField
            id="outlined-basic" 
            label="Title" 
            variant="outlined" 
            fullWidth
            name="title"
            value={titleValue}
            onChange={handleTitleChange}
            inputRef={register({ required: true })}
            required
            error={errors.title}
            />
        </div>
        <div className="input">
          <TextField
            id="outlined-basic" 
            label="Location" 
            variant="outlined" 
            name="location"
            value={locationValue}
            onChange={handleLocationChange}
            inputRef={register({ required: true })}
            required
            error={errors.location}
            />
        </div>
        <div className="input action-buttons">
        <div className="left">
          <Button 
            variant="outlined" 
            onClick={closeModal}
          >
            cancel
          </Button>
        </div>
        <div className="right">
          <Button 
            type="submit"
            variant="contained" 
            onClick={handleSubmit(onSubmit)}
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