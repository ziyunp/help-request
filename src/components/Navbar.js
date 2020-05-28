import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

function Navbar({ onChange }) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Tabs
      variant="fullWidth"
      indicatorColor="primary"
      value={value}
      onChange={handleChange}
      aria-label="nav tabs example"
    >
      <LinkTab label="Request Queue" href="/request-queue" {...a11yProps(0)} />
      <LinkTab label="With Helper" href="/with-helper" {...a11yProps(1)} />
      <LinkTab label="Past Requests" href="/past-requests" {...a11yProps(2)} />
    </Tabs>
  );
}

export default Navbar;