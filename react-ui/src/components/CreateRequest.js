import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from '@material-ui/core';
import { createRequest } from '../utils/queryHelpers';

function CreateRequest({ closeModal, updateState, getQueuePos }) {
  const [ titleValue, setTitleValue ] = useState('');
  const [ locationValue, setLocationValue ] = useState('');
  const [ queuePos, setQueuePos ] = useState(0);

  const { handleSubmit, register, errors } = useForm();

  function handleTitleChange (e) {
    setTitleValue(e.target.value);
  }

  function handleLocationChange (e) {
    setLocationValue(e.target.value);
  }

  async function onSubmit () {
    const currentPosition = getQueuePos();
    setQueuePos(currentPosition + 1);
    const updatedRequests = await createRequest(titleValue, locationValue);
    updateState(updatedRequests);
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
      {queuePos === 0 
        ? <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="input">
                <TextField
                  id="outlined-basic" 
                  label="Question Summary" 
                  variant="outlined" 
                  fullWidth
                  name="title"
                  value={titleValue}
                  onChange={handleTitleChange}
                  inputRef={register({ required: true })}
                  required
                  />
                  {errors.title && 
                    <Typography variant="subtitle2" color="secondary">
                      Required
                    </Typography>
                  }
              </div>
              <div className="input">
                <TextField
                  id="outlined-basic" 
                  label="Location e.g. Computer-32" 
                  fullWidth
                  variant="outlined" 
                  name="location"
                  value={locationValue}
                  onChange={handleLocationChange}
                  inputRef={register({ required: true })}
                  required
                  />
                  {errors.location && 
                    <Typography variant="subtitle2" color="secondary">
                      Required
                    </Typography>
                  }
              </div>
              <div className="input form-buttons">
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
          : <div className="empty-modal">
              <Typography variant="body1">
                Request submitted.<br/>
                Your position in queue is: {queuePos}
              </Typography>
            </div>
        }
    </div>
  );
}

export default CreateRequest;