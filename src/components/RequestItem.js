import React from 'react';
import { Button, TableRow, TableCell } from '@material-ui/core';
import StatusButton from './StatusButton';
import { deleteRequest } from '../utils/queryHelpers';
import { RAISED, ADDRESSED } from '../utils/constants';

function RequestItem({ columns, data, updateState }) {
  async function handleDelete(id) {
    const updatedRequests = await deleteRequest(id);
    updateState(updatedRequests);
  }

  return(
    <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
      {columns.map((column) => {
        if (column.label === "Actions") {
          if (data.status === RAISED) {
            return (
              <TableCell key={column.id} align={column.align} >
                <Button variant="outlined" size="small" onClick={() => handleDelete(data.id)} >
                  Cancel
                </Button>
              </TableCell>
            );
          } else {
            return (
              <TableCell key={column.id} align={column.align} className="actionButtons">
                <StatusButton label="Addressed" status={ADDRESSED} color="secondary" id={data.id} updateState={updateState} />
              </TableCell>
            );
          }

        } else {
          const value = data[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {value}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );
  
}

export default RequestItem;