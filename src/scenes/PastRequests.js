import React, { useState, useEffect } from 'react';
import RequestList from '../components/RequestList';
import { isActive } from '../utils/dataHelpers';
import { BASE_COLUMNS } from '../utils/constants';

function RequestQueue({ data, updateState }) {
  const [ requests, setRequests ] = useState(false);
  useEffect(() => {
    function filterData() {
      const filteredData = data.filter(d => !isActive(d));
      setRequests(filteredData);
    }
    filterData();
  }, [data]);
  
  return (
    <RequestList data={requests} columns={BASE_COLUMNS} updateState={updateState} />
  );
}

export default RequestQueue;
