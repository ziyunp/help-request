import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from '@material-ui/core';
import { createRequest } from '../utils/queryHelpers';

function CreateRequest(props) {
  const [ titleValue, setTitleValue ] = useState('');
  const [ locationValue, setLocationValue ] = useState('');
  const { handleSubmit, register, errors } = useForm();
  const { closeModal } = props;

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocationValue(e.target.value);
  }

  const onSubmit = () => {
    console.log(errors.title);
    createRequest(titleValue, locationValue);
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