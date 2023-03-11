import React, { useContext, useEffect, useState } from 'react';
import { MdHomeFilled, MdOutlineBungalow } from 'react-icons/md';
import { Button, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useRouteMatch } from 'react-router-dom';
import RozkladContext from '../../../context/RozkladContext';

const SideBarDepartments = () => {
  const { url } = useRouteMatch();
  const { state, setCurrentDep } = useContext(
    RozkladContext
  );
  const [show, setShow] = useState('ПІДРОЗДІЛИ');
  const {
    departments,
    currentDep,
  } = state;
  useEffect(() => {
    setShow(!currentDep ? 'ПІДРОЗДІЛИ' : currentDep.Підрозділ);
  }, [currentDep]);
  return (
    <>
      {!currentDep ? (
        <SubMenu icon={<MdHomeFilled size={'32'} />} label={show}>
          {departments ? (
            <>
              {departments
                .filter(ob => {
                  if (show === 'ПІДРОЗДІЛИ') return ob;

                  return show === ob.Підрозділ;
                })
                .map((dep, idx) => (
                  <OverlayTrigger
                    key={idx}
                    placement={'right'}
                    overlay={
                      <Tooltip id={`tooltip-${idx}`}>
                        {dep['Підрозділ']}
                      </Tooltip>
                    }
                  >
                    <MenuItem
                      icon={
                        dep.IMG.includes('http') ? (
                          <img
                            src={`${dep.IMG}`}
                            // width="32"
                            // height="32"
                            style={{
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              display: 'flex',
                              justifyContent: 'center',
                              height: '32px',
                            }}
                            alt={dep['Підрозділ']}
                          />
                        ) : (
                          <MdOutlineBungalow size={'32'}/>
                        )
                      }
                      onClick={() => {
                        setCurrentDep(idx);
                        setShow(dep.Підрозділ);
                      }}
                      component={<Link to={`${url}department/${idx}`} />}
                      active={dep['Підрозділ'] === show}
                    >
                      {dep['Підрозділ']}
                    </MenuItem>
                  </OverlayTrigger>
                ))}
            </>
          ) : (
            <MenuItem
              icon={
                <Button variant="outline-light" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    variant="dark"
                  />
                  <span className="visually-hidden">Loading...</span>
                </Button>
              }
              style={{
                margin: '10px 0 20px 0',
                color: '#999999',
              }}
            />
          )}
        </SubMenu>
      ) : (
        <MenuItem
          icon={
            currentDep.IMG.includes('http') ? (
              <img
                src={`${currentDep.IMG}`}
                // width="32"
                // height="32"
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  height: '32px',
                }}
                alt={currentDep['Підрозділ']}
              />
            ) : (
              <MdOutlineBungalow />
            )
          }
          active={currentDep['Підрозділ'] === show}
        >
          {currentDep['Підрозділ']}
        </MenuItem>
      )}
    </>
  );
};

export default SideBarDepartments;
