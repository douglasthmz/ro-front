import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';

import { Container, AdminContent, FormContainer } from './styles';
import CreateMemberForm from './CreateMemberForm';
import CreateRoleForm from './CreateRoleForm';
import CreateFailureOriginForm from './CreateFailureOriginForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <FormContainer
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </FormContainer>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminPage: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <AdminContent>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Funções" {...a11yProps(0)} />
          <Tab label="Membros" {...a11yProps(1)} />
          <Tab label="Tipos de falha" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <CreateRoleForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreateMemberForm />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CreateFailureOriginForm />
        </TabPanel>
      </AdminContent>
    </Container>
  );
};

export default AdminPage;
