import React from 'react';
import { Button } from '@material-ui/core';
import { updateRequest } from '../utils/queryHelpers';

function StatusButton({ label, status, color, id, updateState, style, disabled }) {
  async function handleClick(id, status) {
    const updatedRequests = await updateRequest(id, status);
    updateState(updatedRequests);
  }

  return (
    <Button 
      size="small" 
      color={color} 
      style={style} 
      variant="contained" 
      onClick={() => handleClick(id, status)} 
      disabled={disabled}
      style={{ ...style, width: 87 }}
    >
      {label}
    </Button>
  );
  
}

export default StatusButton;