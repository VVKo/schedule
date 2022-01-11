import React, { useEffect, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import NavBar from './dashboard/NavBar';
import MainField from './dashboard/MainField';

import server from '../../utils/server';

const { serverFunctions } = server;

const App = () => {
  const [state, setState] = useState({
    isLogined: false,
    accessToken: '',
    email: '',
    name: '',
    role: 'guest',
    data: [],
    list: [],
  });
  useEffect(() => {
    serverFunctions
      .getListOfPidrozdils()
      .then(res => {
        setState(prevState => {
          const tmp = { ...prevState };
          tmp.list = res;

          return tmp;
        });
      })
      .catch(alert);
  }, []);

  const [ssss, setSs] = useState('');

  const handleSideBar = from => {
    setSs(from);
  };
  const getLogoutState = st => {
    serverFunctions
      .getListOfPidrozdils()
      .then(res => {
        const tmp = { ...st };
        tmp.list = res;
        setState(tmp);
      })
      .catch(alert);
  };

  const getLoginState = st => {
    setState({ ...st });
  };

  const updateData = obj => {
    console.log('==================updateData have done');
    setState(prevState => {
      const tmp = { ...prevState };
      tmp.data[Number(obj.row) - 1][Number(obj.col) - 1] = obj.aud;
      tmp.data[Number(obj.row) - 1][7] = tmp.data[Number(obj.row) - 1]
        .slice(8)
        .filter(r => r !== '').length;
      return tmp;
    });
  };

  return (
    <BrowserRouter>
      {state.isLogined ? (
        <NavBar state={state} updateData={updateData} logOut={getLogoutState} />
      ) : null}
      <MainField
        state={state}
        logIn={getLoginState}
        sideBarState={ssss}
        sidebarHandler={handleSideBar}
        updateData={updateData}
      />
    </BrowserRouter>
  );
};

export default App;
