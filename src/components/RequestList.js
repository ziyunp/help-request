import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow }from '@material-ui/core';
import RequestItem from './RequestItem';
import { createData } from '../utils/dataHelpers';
import { RAISED } from '../utils/constants';

function RequestList({ columns, data, updateState }) {
  const [ requests, setRequests ] = useState([]);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  function handleChangePage (event, newPage) {
    setPage(newPage);
  };

  function handleChangeRowsPerPage (event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    function getData() {
      if (data) {
        let pos = 1;
        const rows = [];
        for (let i = 0; i < data.length; i++) {
          let isNext = false;
          if (data[i].status === RAISED && 
            (i - 1 < 0 || data[i - 1].status !== RAISED)) {
              isNext = true;
          }
          rows.push(createData(pos++, isNext, data[i]));
        }
        setRequests(rows);
      }
    }
    getData();
  }, [data]);
 
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <RequestItem columns={columns} data={row} updateState={updateState} />
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={requests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>

  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 650,
  },
});

export default RequestList;