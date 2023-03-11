import React, { useContext, useEffect, useState } from 'react';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from 'react-pro-sidebar';
import { AiOutlineMenu } from 'react-icons/ai';
import { Button, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  MdHomeFilled,
  MdOutlineBungalow,
  MdRestore,
  MdSettingsApplications,
} from 'react-icons/md';
import RozkladContext from '../../../context/RozkladContext';
import SideBarSettings from './SideBarSettings';
import SideBarStaff from './SideBarStaff';
import SideBarDepartments from './SideBarDepartments';
import SideBarPublic from './SideBarPublic';

const SideBar = () => {
  const { url } = useRouteMatch();
  const { state, resetCurrentDep, getUser } = useContext(RozkladContext);
  const { user, currentDep } = state;
  const { collapseSidebar, collapsed } = useProSidebar();
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Sidebar>
      <Menu>
        <MenuItem
          icon={
            collapsed ? (
              <Button variant="outline-light" onClick={() => collapseSidebar()}>
                <AiOutlineMenu style={{ color: '#333333' }} />
              </Button>
            ) : (
              undefined
            )
          }
          style={{
            margin: '10px 0 20px 0',
            color: '#999999',
          }}
        >
          {!collapsed && (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginLeft: '15px',
                }}
              >
                <h3 style={{ color: '#999' }}>РОЗКЛАД</h3>

                <Button
                  variant="outline-light"
                  onClick={() => collapseSidebar()}
                >
                  <AiOutlineMenu style={{ color: '#333333' }} />
                </Button>
              </div>
              <div>{user && user.role}</div>
            </div>
          )}
        </MenuItem>
        <OverlayTrigger
          placement={'right'}
          overlay={<Tooltip id={`tooltip-home`}>До списку підрозділів</Tooltip>}
        >
          <MenuItem
            icon={<MdRestore size={'32'} />}
            onClick={() => {
              resetCurrentDep();
            }}
            component={<Link to={`${url}`} />}
          >
            Підрозділи
          </MenuItem>
        </OverlayTrigger>

        <SideBarDepartments />

        <SideBarSettings />
        <SideBarStaff />
        <SideBarPublic />
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
