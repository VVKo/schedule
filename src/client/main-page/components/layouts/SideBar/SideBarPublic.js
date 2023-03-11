import React, { useContext } from 'react';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useRouteMatch } from 'react-router-dom';
import { GrSchedules } from 'react-icons/gr';
import RozkladContext from '../../../context/RozkladContext';

const SideBarPublic = () => {
  const { url } = useRouteMatch();
  const { state } = useContext(RozkladContext);

  const { currentSemester, academicloadfond } = state;

  if (!currentSemester || !academicloadfond) return null;

  return (
    <SubMenu icon={<GrSchedules size={'32'} />} label={'РОЗКЛАД'}>
      <MenuItem component={<Link to={`${url}grouplist`} />}>ГРУПА:</MenuItem>
      <MenuItem component={<Link to={`${url}teacherlist`} />}>
        ВИКЛАДАЧ:
      </MenuItem>
    </SubMenu>
  );
};

export default SideBarPublic;
