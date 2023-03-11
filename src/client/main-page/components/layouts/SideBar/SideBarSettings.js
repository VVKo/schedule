import React, { useContext } from 'react';
import { MdSettingsApplications } from 'react-icons/md';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import SideBarSttingsYear from './SideBarSttingsYear';
import SideBarSettingsSem from './SideBarSettingsSem';
import RozkladContext from '../../../context/RozkladContext';

const SideBarSettings = () => {
  const { state } = useContext(RozkladContext);
  const { currentDep } = state;

  if (!currentDep) return null;

  return (
    <SubMenu
      icon={<MdSettingsApplications size={'32'} />}
      label={'Налаштування'}
    >
      <SideBarSttingsYear />
      <SideBarSettingsSem />
    </SubMenu>
  );
};

export default SideBarSettings;
