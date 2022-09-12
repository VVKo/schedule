import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';
import FineSchedule from '../Schedule/FineSchedule';


const Department = () => {
  const params = useParams();
  const {
    dataLoaded,
    departmentList,
    user,
    getUserData,
    setJsonID,

  } = useContext(RozkladContext);

  const pidrozdil = departmentList[params.id];

  useEffect(() => {
    getUserData({
      user,
      users: pidrozdil.users,
      jsonID: pidrozdil.JSON,
      xlsID: pidrozdil['ІД'],
    });
    setJsonID(pidrozdil.JSON);
  }, []);

  if (!dataLoaded) return <Spinner />;
  return (
    <>
      <FineSchedule weekNumber="1" />
      <hr/>
      <FineSchedule weekNumber="2" />

    </>
  );
};

export default Department;
