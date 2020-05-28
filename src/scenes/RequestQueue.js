import React, { useState, useEffect } from 'react';
import RequestList from '../components/RequestList';
import { isPending } from '../utils/dataHelpers';

const columns = [
  { id: 'pos', label: 'No.', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 300 },
  {
    id: 'location',
    label: 'Location',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 50,
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 150,
    align: 'center'
  },
];

function RequestQueue({ data, updateState }) {
  const [ requests, setRequests ] = useState(false);

  useEffect(() => {
    function filterData() {
      const filteredData = data.filter(d => isPending(d));
      setRequests(filteredData);
    }
    filterData();
  }, [data]);
  
  return (
    <RequestList data={requests} columns={columns} updateState={updateState} />
  );
}

export default RequestQueue;
