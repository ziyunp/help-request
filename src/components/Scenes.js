import React from 'react';
import TabPanel from './TabPanel';
import RequestQueue from '../scenes/RequestQueue';
import PastRequests from '../scenes/PastRequests';

function Scenes(props) {
  const { value, data } = props;
  return (
    <div>
      <TabPanel value={value} index={0}>
        <RequestQueue data={data} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PastRequests data={data} />
      </TabPanel>
    </div>
  );
}

export default Scenes;