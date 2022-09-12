import React, { useContext } from 'react';
import './styles/FineHeader.css';
import { Link, Route, Switch } from 'react-router-dom';
import {
  FineNavBar,
  HumburgerCheckBoxFine,
  HumburgerFine,
  LogoFine,
  MenuFine,
  NavDropdownCaptionFine,
  NavDropdownFine,
  NavLinksFine,
  NavMenuPidrozdily,
  NavPidrozdilyFine,
} from './styles/FineHeaderSTYLED';
import RozkladContext from '../../../context/RozkladContext';
import Department from '../Pages/Department';
import Spinner from '../../Spinner/Spinner';
import {UpdateButtonServer} from "../../Styled/StyledComponents";

const FineHeader = () => {


  const { dataLoaded, saveToServer, change, departmentList, isDataLoaded } = useContext(RozkladContext);


  return (
    <FineNavBar>
      <Switch>
        {departmentList.map((dep, idx) => (
          <Route key={idx} path={`/${idx}`} component={Department} />
        ))}
      </Switch>
      <LogoFine> Розклад </LogoFine>
      <UpdateButtonServer onClick={saveToServer} change={change}>
        Зберегти дані на сервері
      </UpdateButtonServer>
      <NavMenuPidrozdily visible={!isDataLoaded}>
        <NavPidrozdilyFine>
          <a>Структурний підрозділ</a>
          <NavDropdownFine>
            {departmentList.map((dep, idx) => (
              <li key={idx}>
                <Link to={`/department/${idx}`}>
                  <p>{dep['Підрозділ']}</p>
                </Link>
              </li>
            ))}
          </NavDropdownFine>
        </NavPidrozdilyFine>
      </NavMenuPidrozdily>
      <NavLinksFine>
        <HumburgerCheckBoxFine type="checkbox" id="checkbox_toggle" />
        <HumburgerFine htmlFor="checkbox_toggle">&#9776;</HumburgerFine>
        <MenuFine visible={isDataLoaded}>
          <li>
            <a href="/">About</a>
          </li>
          <NavDropdownCaptionFine>
            <a>Services</a>
            <NavDropdownFine>
              <li>
                <a href="/">Dropdown 1 </a>
              </li>
              <li>
                <a href="/">Dropdown 2</a>
              </li>
              <li>
                <a href="/">Dropdown 2</a>
              </li>
              <li>
                <a href="/">Dropdown 3</a>
              </li>
              <li>
                <a href="/">Dropdown 4</a>
              </li>
            </NavDropdownFine>
          </NavDropdownCaptionFine>
          <li>
            <a href="/">Pricing</a>
          </li>
          <li>
            <a href="/">Contact</a>
          </li>
        </MenuFine>
      </NavLinksFine>
    </FineNavBar>
  );
};

export default FineHeader;
