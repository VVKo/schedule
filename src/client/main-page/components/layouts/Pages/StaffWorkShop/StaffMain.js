import React from 'react';
import { useParams } from 'react-router-dom';
import TotalSchedule from './TotalSchedule';
import StaffAudFond from './StaffAudFond';
import StaffGroupFond from './StaffGroupFond';
import StaffTeacherFond from './StaffTeacherFond';
import StaffDisciplineFond from './StaffDisciplineFond';
import StaffLoadFond from './StaffLoadFond';

const StaffMain = () => {
  const params = useParams();
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      {params.func === 'addaud' && <StaffAudFond />}
      {params.func === 'addgroup' && <StaffGroupFond />}
      {params.func === 'addteacher' && <StaffTeacherFond />}
      {params.func === 'adddisc' && <StaffDisciplineFond />}
      {params.func === 'addload' && <StaffLoadFond />}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">
          {params.func === 'totalschedule' && <>Усі групи</>}
        </h1>
      </div>
      {params.func === 'totalschedule' && <TotalSchedule />}
    </main>
  );
};

export default StaffMain;
