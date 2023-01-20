import React from 'react';
import {useParams, useRouteMatch} from 'react-router-dom';
import StaffAudFond from './StaffAudFond';
import StaffGroupFond from './StaffGroupFond';
import StaffTeacherFond from './StaffTeacherFond';
import StaffDisciplineFond from './StaffDisciplineFond';
import StaffLoadFond from './StaffLoadFond';
import StaffSchedule from './StaffSchedule';
import StaffPreviewGroup from './StaffPreviewGroup';
import StaffPrinter from './StaffPrinter';
import StaffTeacherSchedule from './StaffTeacherSchedule';
import DropDownList from "./DropDownList";
import StaffBusyAuds from "./StaffBusyAuds";

const StaffMain = () => {
  const params = useParams();
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      {params.func === 'addaud' && <StaffAudFond />}
      {params.func === 'addgroup' && <StaffGroupFond />}
      {params.func === 'addteacher' && <StaffTeacherFond />}
      {params.func === 'adddisc' && <StaffDisciplineFond />}
      {params.func === 'addload' && <StaffLoadFond />}
      {params.func === 'totalschedule' && <StaffSchedule />}
      {params.func === 'preview' && <StaffPreviewGroup />}
      {params.func === 'printer' && <StaffPrinter />}
      {params.func === 'teacherschedule' && <StaffTeacherSchedule />}
      {params.func === 'dropdown' && <DropDownList />}
      {params.func === 'busyauds' && <StaffBusyAuds />}
    </main>
  );
};

export default StaffMain;
