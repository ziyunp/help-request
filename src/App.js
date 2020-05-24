import React, { useState, useEffect } from 'react';
import Appbar from './components/Appbar';
import Scenes from './components/Scenes';

function App() {
  const [sceneIndex, setSceneIndex] = useState(0);

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
        // getRequest();
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
        // getRequest();
      });
  }

  const handleTabChange = (value) => {
    setSceneIndex(value);
  }

  return (
    <div className="App">
      <Appbar onChange={handleTabChange} />
      <Scenes value={sceneIndex}/>
      <div>
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
