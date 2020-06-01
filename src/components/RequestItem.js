import React from 'react';
import { IconButton, TableRow, TableCell } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import StatusButton from './StatusButton';
import { RAISED, ADDRESSED, WITH_HELPER, GIVE_HELP, PENDING, RESOLVED, CANCELLED } from '../utils/constants';
import { formatStatusString, formatDateString } from '../utils/dataHelpers';
import { updateRequest } from '../utils/queryHelpers';

function RequestItem({ columns, data, updateState }) {
  async function handleDelete(id) {
    const updatedRequests = await updateRequest(id, CANCELLED);
    updateState(updatedRequests);
  }

  return(
    <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
      {columns.map((column) => {
        if (column.label === "Actions") {
          if (data.status === RAISED) {
            return (
              <TableCell key={column.id} align={column.align}>
                <div className="action-buttons">
                  <div className="left">
                    {data.isNext 
                      ? <StatusButton 
                          label={GIVE_HELP}
                          status={WITH_HELPER} 
                          color="primary" 
                          style={{ backgroundColor: green[500] }} 
                          id={data.id} 
                          updateState={updateState} 
                        />
                      : <StatusButton 
                          label={PENDING}
                          variant="contained"
                          style={{ width: 85 }}
                          id={data.id}
                          disabled
                        />                    
                    }
                  </div>
                  <div className="right">
                    <IconButton size="small" aria-label="delete" onClick={() => handleDelete(data.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            );
          } else {
            return (
              <TableCell key={column.id} align={column.align}>
                <div className="action-buttons">
                  <StatusButton label={RESOLVED} status={ADDRESSED} color="primary" id={data.id} updateState={updateState} />
                </div>
              </TableCell>
            );
          }

        } else {
          const value = column.id === 'status' 
            ? formatStatusString(data[column.id])
            : column.id === 'created_at' 
              ? formatDateString(data[column.id])
              : data[column.id];

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