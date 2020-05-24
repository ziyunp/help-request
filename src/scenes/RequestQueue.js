import React, { useState, useEffect } from 'react';
import RequestList from '../components/RequestList';
import { getRequests } from '../utils/queryHelpers';
import { isActive } from '../utils/dataHelpers';

const columns = [
  { id: 'id', label: 'Request ID', minWidth: 100 },
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

function RequestQueue() {
  const [ requests, setRequests ] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const data = await getRequests();
      const requestsData = JSON.parse(data);
      const filteredData = requestsData.filter(d => isActive(d));
      setRequests(filteredData);
    }
    fetchData();
  }, []);
  
  return (
    <RequestList data={requests} columns={columns}/>
  );
}

export default RequestQueue;
