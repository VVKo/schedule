import React, { useContext, useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import RozkladContext from '../../../context/RozkladContext';

const CurrentSemDD = () => {
  const {
    state,
    setCurrentSemester,
    getAudFond,
    getGroupFond,
    getTeacherFond,
    getDisciplineFond,
    getAcademicLoadFond,
  } = useContext(RozkladContext);
  const [title, setTitle] = useState('Виберіть семестр');

  const {
    currentAcademicYear,
    currentSemester,
    audfond,
    teacherfond,
    groupfond,
    disciplinefond,
    academicloadfond,
  } = state;

  if (!currentAcademicYear) return null;

  useEffect(() => {
    !currentSemester && setTitle(currentSemester.name);
  }, [currentSemester]);

  const fondInit = (val, fond, getFond) => {
    if (!fond) {
      getFond(val, currentAcademicYear.id);
    } else if (!(val in fond)) {
      getFond(val, currentAcademicYear.id);
    } else getFond(val, currentAcademicYear.id);
  };
  const handleClick = e => {
    const val = e.target.textContent;
    setTitle(val);
    setCurrentSemester({
      name: val,
    });

    if (val !== 'Виберіть семестр') {
      fondInit(val, audfond, getAudFond);
      fondInit(val, teacherfond, getTeacherFond);
      fondInit(val, groupfond, getGroupFond);
      fondInit(val, disciplinefond, getDisciplineFond);
      fondInit(val, academicloadfond, getAcademicLoadFond);
    } else {
      academicYearRef.current.disabled = false;
      swRef.current.disabled = true;
    }
  };
  return (
    <NavDropdown id="dropdown-basic-button" title={title}>
      <NavDropdown.Item>
        <div onClick={handleClick}>1 семестр</div>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <div onClick={handleClick}>2 семестр</div>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default CurrentSemDD;
