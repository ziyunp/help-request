import React, { useState } from 'react';
import Appbar from './components/Appbar';
import Scenes from './components/Scenes';

function App() {
  const [sceneIndex, setSceneIndex] = useState(0);

  


  const handleTabChange = (value) => {
    setSceneIndex(value);
  }

  return (
    <div className="App">
      <Appbar onChange={handleTabChange} />
      <Scenes value={sceneIndex}/>
    </div>
  );
}
export default App;
