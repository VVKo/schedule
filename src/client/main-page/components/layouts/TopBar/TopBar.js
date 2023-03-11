import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RozkladContext from '../../../context/RozkladContext';
import CurrentYearDD from '../DropDowns/CurrentYearDD';
import CurrentSemDD from '../DropDowns/CurrentSemDD';

const TopBar = () => {
  const { state } = useContext(RozkladContext);
  const { currentDep, currentAcademicYear, currentSemester } = state;

  if (!currentDep) return null;

  return (
    <Navbar bg="light" expand="lg" aria-label="breadcrumb">
      <Container>
        <div className="px-1">РОЗКЛАД</div>

        {/*<div>{(!currentAcademicYear && currentAcademicYear.name) ? currentAcademicYear.name : null}</div>*/}

        {/*<div>{(!currentSemester && currentSemester.name) ? currentSemester.name : null}</div>*/}
      </Container>
    </Navbar>
  );
};

export default TopBar;
