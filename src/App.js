import React, { useState, useEffect } from 'react';
import Appbar from './components/Appbar';

function App() {
  const [requests, setRequests] = useState(false);
  useEffect(() => {
    getRequest();
  }, []);
  function getRequest() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setRequests(data);
      });
  }
  function updateRequest(status) {
    let id = prompt('Enter request id');
    fetch('http://localhost:3001/requests', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id, status})
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getRequest();
      });
  }
  function deleteRequest() {
    let id = prompt('Enter request id');
    fetch(`http://localhost:3001/requests/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getRequest();
      });
  }
  return (
    <div className="App">
      <Appbar />
      <div>
        {requests ? requests : 'There is no request data available'}
        <br />
        <button onClick={() => updateRequest('with_helper')}>With helper</button>
        <br />
        <button onClick={() => updateRequest('addressed')}>Addressed</button>
        <br />
        <button onClick={deleteRequest}>Delete request</button>
      </div>
    </div>
  );
}
export default App;
