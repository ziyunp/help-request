import React, { useEffect, useState } from 'react';
import Appbar from './components/Appbar';
import Scenes from './components/Scenes';
import { getRequests } from './utils/queryHelpers';
import { isActive } from './utils/dataHelpers';

function App() {
  const [ sceneIndex, setSceneIndex ] = useState(0);
  const [ requests, setRequests ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getRequests();
      const requestsData = data ? JSON.parse(data) : [];
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

  function getLastQueuePosition() {
    const requestsInQueue = requests.filter(req => isActive(req));
    return requestsInQueue.length;
  }

  return (
    <div className="App">
      <Appbar 
        onChange={handleTabChange} 
        updateState={updateState} 
        getQueuePos={getLastQueuePosition}
      />
      <Scenes value={sceneIndex} data={requests} updateState={updateState} />
    </div>
  );
}
export default App;
