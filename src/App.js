import React, { useEffect, useState } from 'react';
import Appbar from './components/Appbar';
import Scenes from './components/Scenes';
import { getRequests } from './utils/queryHelpers';

function App() {
  const [ sceneIndex, setSceneIndex ] = useState(0);
  const [ requests, setRequests ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRequests();
      const requestsData = JSON.parse(data);  
      setRequests(requestsData);
    }
    fetchData();
  }, []);

  function handleTabChange (value) {
    setSceneIndex(value);
  }

  function updateState(data) {
    const requestsData = data ? JSON.parse(data) : [];  
    setRequests(requestsData);
  }

  return (
    <div className="App">
      <Appbar onChange={handleTabChange} updateState={updateState} />
      <Scenes value={sceneIndex} data={requests} />
    </div>
  );
}
export default App;
