import React, { useState, useEffect } from 'react';
import RequestList from '../components/RequestList';
import { isActive } from '../utils/dataHelpers';
import { BASE_COLUMNS, ACTION_COLUMN } from '../utils/constants';

function RequestQueue({ data, updateState }) {
  const [ requests, setRequests ] = useState(false);
  const columns = BASE_COLUMNS.concat(ACTION_COLUMN);

  useEffect(() => {
    function filterData() {
      const filteredData = data ? data.filter(d => isActive(d)) : [];
      setRequests(filteredData);
    }
    filterData();
  }, [data]);
  
  return (
    <RequestList data={requests} columns={columns} updateState={updateState} />
  );
}

export default RequestQueue;
