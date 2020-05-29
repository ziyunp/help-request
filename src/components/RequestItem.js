import React from 'react';
import { IconButton, TableRow, TableCell } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import StatusButton from './StatusButton';
import { deleteRequest } from '../utils/queryHelpers';
import { RAISED, ADDRESSED, WITH_HELPER } from '../utils/constants';
import { formatStatusString } from '../utils/dataHelpers';

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
              <TableCell key={column.id} align={column.align}>
                <div className="action-buttons">
                  {data.isNext && 
                        <StatusButton label="Give Help" status={WITH_HELPER} color="primary" style={{ backgroundColor: green[500] }} id={data.id} updateState={updateState} />
                    }
                    <IconButton size="small" style={{ marginLeft: 20 }} aria-label="delete" onClick={() => handleDelete(data.id)}>
                      <DeleteIcon />
                    </IconButton>
                </div>
              </TableCell>
            );
          } else {
            return (
              <TableCell key={column.id} align={column.align}>
                <div className="action-buttons">
                  <StatusButton label="Addressed" status={ADDRESSED} color="primary" id={data.id} updateState={updateState} />
                </div>
              </TableCell>
            );
          }

        } else {
          const value = column.id === 'status' ? formatStatusString(data[column.id]): data[column.id];
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