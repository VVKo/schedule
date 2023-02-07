import React, { useContext, useEffect } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';

import StaffWorkShop from './StaffWorkShop/StaffWorkShop';

import SchedulePublic from '../Schedule/SchedulePublic';

const FineHeader = () => {
  const { state } = useContext(RozkladContext);
  const { currentDep, currentAcademicYear, currentSemester } = state;
  if (!currentDep) return <Spinner />;

  return (
    currentDep && (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">{currentDep.Підрозділ}</li>
          <li className="breadcrumb-item">
            {currentAcademicYear
              ? currentAcademicYear.name
              : 'Виберіть навчальний рік'}
          </li>
          <li className="breadcrumb-item">
            {currentSemester ? currentSemester.name : 'Виберіть семестр'}
          </li>
        </ol>
      </nav>
    )
  );
};

const Department = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { setCurrentDep } = useContext(RozkladContext);

  useEffect(() => {
    setCurrentDep(+params.id);
  }, []);

  return (
    <>
      <Switch>
        <Route path={`${match.path}`}>
          <>
            <FineHeader />
            <StaffWorkShop />
            <SchedulePublic />
            {/* <FineScheduleNew weekNumber="1" /> */}

            {/* <hr /> */}
            {/* <FineScheduleNew weekNumber="2" /> */}
          </>
        </Route>
      </Switch>
    </>
  );
};

export default Department;
