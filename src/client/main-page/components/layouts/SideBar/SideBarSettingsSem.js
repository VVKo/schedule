import React, { useContext, useState } from 'react';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import RozkladContext from '../../../context/RozkladContext';

const SideBarSettingsSem = () => {
  const {
    state,
    setCurrentSemester,
    getAudFond,
    getGroupFond,
    getTeacherFond,
    getDisciplineFond,
    getAcademicLoadFond,
  } = useContext(RozkladContext);
  const [title, setTitle] = useState('');
  const {
    currentAcademicYear,
    audfond,
    teacherfond,
    groupfond,
    disciplinefond,
    academicloadfond,
  } = state;

  console.log('SideBarSettingsSem', currentAcademicYear);
  if (!currentAcademicYear) return null;
  const fondInit = (val, fond, getFond) => {
    if (!fond) {
      getFond(val, currentAcademicYear.id);
    } else if (!(val in fond)) {
      getFond(val, currentAcademicYear.id);
    }
  };

  const handleClick = e => {
    const val = e.target.textContent;
    setTitle(val[0]);
    setCurrentSemester({
      name: val,
    });

    fondInit(val, audfond, getAudFond);
    fondInit(val, teacherfond, getTeacherFond);
    fondInit(val, groupfond, getGroupFond);
    fondInit(val, disciplinefond, getDisciplineFond);
    fondInit(val, academicloadfond, getAcademicLoadFond);
  };
  return (
    <SubMenu label={`Семестр: ${title === '' ? 'Оберіть' : title}`}>
      <MenuItem>
        <div onClick={handleClick}>1 семестр</div>
      </MenuItem>
      <MenuItem>
        <div onClick={handleClick}>2 семестр</div>
      </MenuItem>
    </SubMenu>
  );
};
export default SideBarSettingsSem;
