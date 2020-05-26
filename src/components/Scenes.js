import React from 'react';
import TabPanel from './TabPanel';
import RequestQueue from '../scenes/RequestQueue';
import PastRequests from '../scenes/PastRequests';

function Scenes(props) {
  const { value, data, updateState } = props;
  return (
    <div>
      <TabPanel value={value} index={0}>
        <RequestQueue data={data} updateState={updateState} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PastRequests data={data} updateState={updateState} />
      </TabPanel>
    </div>
  );
}

export default Scenes;