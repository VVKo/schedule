import React from 'react';
import { useParams } from 'react-router-dom';
import FormAddAud from '../../Forms/FormAddAud';
import FormAddTeacher from '../../Forms/FormAddTeacher';
import FormAddGroup from '../../Forms/FormAddGroup';
import FormAddDiscipline from '../../Forms/FormAddDiscipline';
import FormAddAcademicLoad from '../../Forms/FormAddAcademicLoad';
import TotalSchedule from './TotalSchedule';

const StaffMain = () => {
  const params = useParams();
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">
          {params.func === 'addaud' && <>Аудиторний фонд</>}
          {params.func === 'addteacher' && <>Викладацький фонд</>}
          {params.func === 'addgroup' && <>Груповий фонд</>}
          {params.func === 'adddisc' && <>Дисципліни</>}
          {params.func === 'addload' && <>Дані до розкладу</>}
          {params.func === 'totalschedule' && <>Усі групи</>}
        </h1>
      </div>
      {params.func === 'addaud' && <FormAddAud />}
      {params.func === 'addteacher' && <FormAddTeacher />}
      {params.func === 'addgroup' && <FormAddGroup />}
      {params.func === 'adddisc' && <FormAddDiscipline />}
      {params.func === 'addload' && <FormAddAcademicLoad />}
      {params.func === 'totalschedule' && <TotalSchedule />}
    </main>
  );
};

export default StaffMain;
