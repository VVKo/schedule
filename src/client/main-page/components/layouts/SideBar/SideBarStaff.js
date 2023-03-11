import React, { useContext } from 'react';
import { MdSettingsApplications } from 'react-icons/md';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import RozkladContext from '../../../context/RozkladContext';

const SideBarStaff = () => {
  const { url } = useRouteMatch();
  const { state } = useContext(RozkladContext);
  const {
    user,
    currentAcademicYear,
    currentSemester,
    departments,
    currentDep,
  } = state;

  if (
    !departments ||
    !user ||
    user.role === 'public' ||
    !currentAcademicYear ||
    !currentSemester ||
    Object.keys(currentSemester).length === 0
  )
    return null;

  const idx = departments.findIndex(
    de => de.Підрозділ === currentDep.Підрозділ
  );

  const StaffMenuItem = ({pathname, itemName}) => {
    return (
      <MenuItem component={<Link to={`${url}department/${idx}/${pathname}`} />}>
        {itemName}
      </MenuItem>
    );
  };

  return (
    <SubMenu icon={<MdSettingsApplications />} label={'STAFF'}>
      <SubMenu label={'НАЛАШТУВАННЯ:'}>
        <StaffMenuItem itemName={'Навантаження'} pathname={'addload'} />
        <StaffMenuItem itemName={'Дисципліни'} pathname={'adddisc'} />
        <StaffMenuItem itemName={'Груповий фонд'} pathname={'addgroup'} />
        <StaffMenuItem itemName={'Викладацький фонд'} pathname={'addteacher'} />
        <StaffMenuItem itemName={'Груповий фонд'} pathname={'addaud'} />
      </SubMenu>
      <SubMenu label={'РОЗКЛАД:'}>
        <StaffMenuItem itemName={'Розклад 2.0'} pathname={'schedule2'} />
        <StaffMenuItem itemName={'Викладачі'} pathname={'teacherschedule'} />
        <StaffMenuItem itemName={'Зайнятість аудиторій'} pathname={'busyauds'} />
        <StaffMenuItem itemName={'Популяція'} pathname={'population'} />
        <StaffMenuItem itemName={'ПДФ'} pathname={'printer'} />
      </SubMenu>
    </SubMenu>
  );
};

export default SideBarStaff;
