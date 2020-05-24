import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

function RequestItem(props) {
  const { columns, data } = props;
  return(
    <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
      {columns.map((column) => {
        const value = data[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.format && typeof value === 'number' ? column.format(value) : value}
          </TableCell>
        );
      })}
    </TableRow>
  );
  
}

export default RequestItem;