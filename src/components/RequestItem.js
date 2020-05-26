import React from 'react';
import { Button, TableRow, TableCell } from '@material-ui/core';
import StatusButton from './StatusButton';
import { deleteRequest } from '../utils/queryHelpers';

function RequestItem(props) {
  const { columns, data, updateState } = props;

  async function handleDelete(id) {
    const updatedRequests = await deleteRequest(id);
    updateState(updatedRequests);
  }
  
  return(
    <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
      {columns.map((column) => {
        if (column.label === "Actions") {
          if (data.status === "raised") {
            return (
              <TableCell key={column.id} align={column.align} >
                <div className="action-buttons">
                  <div className="left">
                    <StatusButton label="With Helper" status="with_helper" color="primary" id={data.id} className="left" updateState={updateState} />
                  </div>
                  <div className="right">
                    <Button variant="outlined" size="small" onClick={() => handleDelete(data.id)} className="right" >
                      Cancel
                    </Button>
                  </div>              
                </div>
                
              </TableCell>
            );
          } else {
            return (
              <TableCell key={column.id} align={column.align} className="actionButtons">
                <StatusButton label="Addressed" status="addressed" color="secondary" id={data.id} className="left" updateState={updateState} />
              </TableCell>
            );
          }

        } else {
          const value = data[column.id];
          return (
            <TableCell key={column.id} align={column.align}>
              {column.format && typeof value === 'number' ? column.format(value) : value}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );
  
}

export default RequestItem;