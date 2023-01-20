import React, {useContext} from 'react';
import { Row } from 'react-bootstrap';
import { FiPlusCircle } from 'react-icons/fi';
import RozkladContext from '../../../../context/RozkladContext';
import {
  InfoAboutDisciplines,
  InfoDiscipline,
} from '../../../Styled/StaffWorkShop/STYLED';

const ScheduleInfoByTeacher = ({ teacher }) => {
  const { state } = useContext(RozkladContext);

  const { academicloadfond, currentSemester, currentAcademicYear } = state;

  if (!academicloadfond) return null;

  const infoLoadByTeacher = academicloadfond[currentSemester.name].data.filter(
    r => r[4] === teacher
  );

  return (
    <InfoAboutDisciplines>
      <Row>
        <h5>Інформація про дисципліни для групи</h5>
      </Row>
      {infoLoadByTeacher.map((r, idx) => {
        return (
          <InfoDiscipline key={idx} className="border rounded-2">
            <div>{idx + 1}</div>
            <div>{r[0]}</div>
            <div>{r[1]}</div>
            <div>{r[2]}</div>
            <div>{r[4]}</div>
            <div>{r[6]}</div>
            <div>{r[7]}</div>
            <div>
              <FiPlusCircle />
            </div>
          </InfoDiscipline>
        );
      })}
    </InfoAboutDisciplines>
  );
};

export default ScheduleInfoByTeacher;
