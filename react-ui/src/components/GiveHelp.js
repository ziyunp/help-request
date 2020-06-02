import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { getNextRequest, updateRequest } from '../utils/queryHelpers';
import { WITH_HELPER, GIVE_HELP } from '../utils/constants';

function GiveHelp({ closeModal, updateState }) {
  const [ request, setRequest ] = useState({});
  const [ helped, setHelped ] = useState(false);
  const { handleSubmit } = useForm();

  async function onSubmit () {
    const updatedRequests = await updateRequest(request.id, WITH_HELPER);
    updateState(updatedRequests);
    setHelped(true);
  }

  useEffect(() => {
    async function fetchData() {
      const data = await getNextRequest();
      const request = data ? JSON.parse(data) : [];  
      setRequest(request[0]);
    }
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="title">Next Request</Typography>
      <Button 
        variant="outlined" 
        size="small" 
        className="close-button" 
        onClick={closeModal}
      >
        close
      </Button>
      {request && !helped 
        ? (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <Typography variant="body1">Title: {request.title}</Typography>
          </div>
          <div className="input">
            <Typography variant="body1">Location: {request.location}</Typography>
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
              style={{ backgroundColor: green[500] }} 
            >
              {GIVE_HELP}
            </Button>
          </div>
          </div>
        </form>
        ) 
        : request && helped 
          ? (
            <div className="empty-modal">
              <Typography>
                Please respond to the request at location: {request.location}
              </Typography>
            </div>
          )
          : (
            <div className="empty-modal">
              <Typography>There is no pending request in the queue.</Typography>
            </div>
          )
      }
    </div>
  );
}

export default GiveHelp;