import React from 'react';
import TabPanel from './TabPanel';
import RequestQueue from '../scenes/RequestQueue';
import WithHelper from '../scenes/WithHelper';
import PastRequests from '../scenes/PastRequests';

function Scenes({ value, data, updateState }) {
  return (
    <div>
      <TabPanel value={value} index={0}>
        <RequestQueue data={data} updateState={updateState} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WithHelper data={data} updateState={updateState} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PastRequests data={data} updateState={updateState} />
      </TabPanel>
    </div>
  );
}

export default Scenes;