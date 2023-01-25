import React, { useState } from 'react';
import { ButtonToolbar, Dropdown } from 'react-bootstrap';
import {
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';


export const Hello = () => {
  const params = useParams();
  const { item } = params;

  return <>Нелло {item}</>;
};
const DropDownList = () => {
  const match = useRouteMatch();
  const [btnName, setBtnName] = useState('Dropdown Button');

  const changeButtonName = e => {
    setBtnName(e.currentTarget.text);
  };

  console.log('DropDownList', match);
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Випадаючий список</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {btnName}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: '120px', overflowY: 'scroll' }}>
              <Dropdown.Item as="button">
                <NavLink
                  to={`${match.url}/action-1`}
                  onClick={changeButtonName}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  Action 1
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <NavLink
                  to={`${match.url}/action-2`}
                  onClick={changeButtonName}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  Action 2
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item as="button">
                <NavLink
                  to={`${match.url}/action-3`}
                  onClick={changeButtonName}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  Action 3
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonToolbar>
      </div>

      <Switch>
        <Route path={`${match.path}/:item`}>
          <Hello />
        </Route>
      </Switch>
    </>
  );
};

export default DropDownList;
