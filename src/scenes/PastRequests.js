import React, { useState, useEffect } from 'react';
import RequestList from '../components/RequestList';
import { isActive } from '../utils/dataHelpers';

const columns = [
  { id: 'id', label: 'Request ID', minWidth: 100},
  { id: 'title', label: 'Title', minWidth: 300},
  {
    id: 'location',
    label: 'Location',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 200,
  },
];

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
    <RequestList data={requests} columns={columns} updateState={updateState} />
  );
}

export default RequestQueue;
