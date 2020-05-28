import React, { useState, useEffect } from 'react';
import RequestList from '../components/RequestList';
import { isWithHelper } from '../utils/dataHelpers';
import { BASE_COLUMNS, ACTION_COLUMN } from '../utils/constants';

function WithHelper({ data, updateState }) {
  const [ requests, setRequests ] = useState(false);
  const columns = BASE_COLUMNS.concat(ACTION_COLUMN);

  useEffect(() => {
    function filterData() {
      const filteredData = data.filter(d => isWithHelper(d));
      setRequests(filteredData);
    }
    filterData();
  }, [data]);
  
  return (
    <RequestList data={requests} columns={columns} updateState={updateState} />
  );
}

export default WithHelper;
