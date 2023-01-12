import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';

import StaffWorkShop from './StaffWorkShop/StaffWorkShop';
import FineScheduleNew from '../Schedule/FineScheduleNew';

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
  const params = useParams();
  const { setCurrentDep } = useContext(RozkladContext);

  useEffect(() => {
    setCurrentDep(+params.id);
  }, []);

  return (
    <>
      <FineHeader />
      <StaffWorkShop />
      <FineScheduleNew weekNumber="1" />

      <hr />
      <FineScheduleNew weekNumber="2" />
    </>
  );
};

export default Department;
