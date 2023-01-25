import React from 'react';
import { useParams } from 'react-router-dom';
import StaffAudFond from './StaffAudFond';
import StaffGroupFond from './StaffGroupFond';
import StaffTeacherFond from './StaffTeacherFond';
import StaffDisciplineFond from './StaffDisciplineFond';
import StaffLoadFond from './StaffLoadFond';
import StaffSchedule from './StaffSchedule';
import StaffPreviewGroup from './StaffPreviewGroup';
import StaffPrinter from './StaffPrinter';
import StaffTeacherSchedule from './StaffTeacherSchedule';
import DropDownList from './DropDownList';
import StaffBusyAuds from './StaffBusyAuds';
import StaffPopulation from './StaffPopulation';
import { StaffMainSTYLED } from '../../../Styled/StaffWorkShop/STYLED';

const StaffMain = () => {
  const params = useParams();
  return (
    <StaffMainSTYLED>
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
      {params.func === 'population' && <StaffPopulation />}
    </StaffMainSTYLED>
  );
};

export default StaffMain;
