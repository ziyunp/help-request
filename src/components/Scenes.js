import React from 'react';
import TabPanel from './TabPanel';
import RequestQueue from '../scenes/RequestQueue';
import PastRequests from '../scenes/PastRequests';

function Scenes(props) {
  const { value } = props;
  return (
    <div>
      <TabPanel value={value} index={0}>
        <RequestQueue />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PastRequests />
      </TabPanel>
    </div>
  );
}

export default Scenes;