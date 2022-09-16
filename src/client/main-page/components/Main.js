import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Start from './layouts/Start/Start';
import Department from './layouts/Pages/Department';
import { RozkladProvider } from '../context/RozkladContext';
import CHeader from './layouts/Header/Header';
import { StyledMain } from './Styled/StyledComponents';
import ModalLayout from './layouts/Modal/ModalLayout';




const Main = () => {

  return (
    <RozkladProvider>
      <Router>
        <CHeader />

        <StyledMain>
          <Switch>
            <Route exact path="/department/:id" component={Department} />
            <Route path="/">
              <Start />
            </Route>
          </Switch>
        </StyledMain>
      </Router>
      <ModalLayout />
      <ToastContainer />
    </RozkladProvider>
  );
};

export default Main;
