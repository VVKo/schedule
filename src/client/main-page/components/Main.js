import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Start from './layouts/Start/Start';
import Department from './layouts/Pages/Department';
import { RozkladProvider } from '../context/RozkladContext';
import { StyledMain } from './Styled/StyledComponents';
import ModalLayout from './layouts/Modal/ModalLayout';
import SideBar from './layouts/SideBar/SideBar';
import TopBar from './layouts/TopBar/TopBar';
import StaffMain from "./layouts/Pages/StaffWorkShop/StaffMain";
import PublicSchedule from "./layouts/Schedule/PublicSchedule";
import Groups from "./layouts/Pages/Groups";
import Teachers from "./layouts/Pages/Teachers";

const Main = () => {
  return (
    <RozkladProvider>
      <ProSidebarProvider>
        <div style={{ display: 'flex', position: 'relative' }}>
          <Router>
            <SideBar />

            <StyledMain>
              <TopBar />
              <Switch>
                <Route path="/grouplist" component={Groups} />
                <Route path="/teacherlist" component={Teachers} />
                <Route path="/publicschedule" component={PublicSchedule} />
                <Route path="/department/:id/:func" component={StaffMain} />
                <Route path="/department/:id" component={Department} />
                <Route path="/" component={Start} />
              </Switch>
            </StyledMain>
          </Router>
          <ModalLayout />
          <ToastContainer />
        </div>
      </ProSidebarProvider>
    </RozkladProvider>
  );
};

export default Main;
