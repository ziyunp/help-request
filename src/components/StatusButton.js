import React from 'react';
import { Button } from '@material-ui/core';
import { updateRequest } from '../utils/queryHelpers';

function StatusButton(props) {
  const { label, status, color, id, updateState } = props; 

  async function handleClick(id, status) {
    const updatedRequests = await updateRequest(id, status);
    updateState(updatedRequests);

  }
  return (
    <Button size="small" color={color} variant="contained" onClick={() => handleClick(id, status)}>
      {label}
    </Button>
  );
  
}

export default StatusButton;