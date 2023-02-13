import React, { useContext, useRef, useState } from 'react';
import {
  Container,
  DropdownButton,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Panel, StyledBox, SwitchButton } from '../../Styled/StyledComponents';
import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';
import OptionsForGroups from '../Pages/StaffWorkShop/utils/OptionsForGroups';
import OptionsForTeachers from '../Pages/StaffWorkShop/utils/OptionsForTeachers';
import DropdownForGroups from "../Pages/StaffWorkShop/utils/DropdownForGroups";

const GuestPanel = () => {
  const semesterRef = useRef();
  const academicYearRef = useRef();
  const swRef = useRef();
  const [swBtn, setSwBtn] = useState(false);

  const {
    state,
    setCurrentAcademicYear,
    setCurrentSemester,
    setCurrentGroup,
    setCurrentTeacher,
    createNewAcademicYear,
    getAudFond,
    getGroupFond,
    getTeacherFond,
    getDisciplineFond,
    getAcademicLoadFond,
  } = useContext(RozkladContext);

  const {
    currentDep,
    currentAcademicYear,
    currentSemester,
    currentTeacher,
    currentGroup,
    audfond,
    teacherfond,
    groupfond,
    disciplinefond,
    academicloadfond,
  } = state;

  if (!currentDep && !currentAcademicYear) return <Spinner />;

  const fondInit = (val, fond, getFond) => {
    if (!fond) {
      getFond(val, currentAcademicYear.id);
    } else if (!(val in fond)) {
      getFond(val, currentAcademicYear.id);
    }
  };

  return (
    // <Navbar bg={'light'} expand={false} className="mb-3">
    <Container fluid>
      <Navbar.Brand>
        <h1 className="header"> РОЗКЛАД </h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand`}
        aria-labelledby={`offcanvasNavbarLabel-expand`}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
            Налаштування
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            {/* <Nav.Link href="#action1">Home</Nav.Link> */}
            {/* <Nav.Link href="#action2">Link</Nav.Link> */}
            {/* <NavDropdown */}
            {/*  title="Dropdown" */}
            {/*  id={`offcanvasNavbarDropdown-expand`} */}
            {/* > */}
            {/*  <NavDropdown.Item href="#action3">Action</NavDropdown.Item> */}
            {/*  <NavDropdown.Item href="#action4"> */}
            {/*    Another action */}
            {/*  </NavDropdown.Item> */}
            {/*  <NavDropdown.Divider /> */}
            {/*  <NavDropdown.Item href="#action5"> */}
            {/*    Something else here */}
            {/*  </NavDropdown.Item> */}
            {/* </NavDropdown> */}
            <StyledBox
              defaultValue={
                currentAcademicYear
                  ? currentAcademicYear.name
                  : 'Виберіть навчальний рік'
              }
              name="academicYear"
              ref={academicYearRef}
              disabled={false}
              onChange={e => {
                const val = e.target.value;

                setCurrentAcademicYear({
                  name: val,
                  id: currentDep[val] ? currentDep[val] : '',
                });

                if (
                  val !== 'Виберіть навчальний рік' &&
                  currentDep[val] === ''
                ) {
                  createNewAcademicYear({
                    dep: currentDep.Підрозділ,
                    academicYear: val,
                  });
                }

                if (val !== 'Виберіть навчальний рік') {
                  semesterRef.current.disabled = false;
                } else {
                  semesterRef.current.disabled = true;
                  swRef.current.disabled = true;
                }
              }}
            >
              <option value="Виберіть навчальний рік">
                Виберіть навчальний рік
              </option>
              {Object.keys(currentDep)
                .slice(4)
                .map((acyear, idx) => (
                  <option key={idx} value={`${acyear}`}>
                    {acyear}
                  </option>
                ))}
            </StyledBox>

            <StyledBox
              defaultValue={`${
                currentSemester ? currentSemester.name : 'Виберіть семестр'
              }`}
              name="semester"
              ref={semesterRef}
              disabled={true}
              onChange={e => {
                const val = e.target.value;
                setCurrentSemester({
                  name: val,
                });

                if (val !== 'Виберіть семестр') {
                  academicYearRef.current.disabled = true;
                  swRef.current.disabled = false;
                  fondInit(val, audfond, getAudFond);
                  fondInit(val, teacherfond, getTeacherFond);
                  fondInit(val, groupfond, getGroupFond);
                  fondInit(val, disciplinefond, getDisciplineFond);
                  fondInit(val, academicloadfond, getAcademicLoadFond);
                } else {
                  academicYearRef.current.disabled = false;
                  swRef.current.disabled = true;
                }
              }}
            >
              <option value="Виберіть семестр">Виберіть семестр</option>
              <option value="1 семестр">1 семестр</option>
              <option value="2 семестр">2 семестр</option>
            </StyledBox>
            <SwitchButton>
              <div className="toggle-button-cover">
                <div className="button-cover">
                  <div className="button r" id="button-1">
                    <input
                      type="checkbox"
                      className="checkbox"
                      disabled={!(currentAcademicYear && currentSemester)}
                      ref={swRef}
                      checked={swBtn}
                      onChange={() => {
                        setSwBtn(!swBtn);
                      }}
                    />
                    <div className="knobs"></div>
                    <div className="layer"></div>
                  </div>
                </div>
              </div>
            </SwitchButton>
            {!swBtn ? (
              <>
                {/*<StyledBox*/}
                {/*  defaultValue={currentGroup}*/}
                {/*  name="group"*/}
                {/*  onChange={e => {*/}
                {/*    setCurrentTeacher('Виберіть викладача');*/}
                {/*    const val = e.target.value;*/}
                {/*    setCurrentGroup(val);*/}

                {/*    if (val !== 'Виберіть групу') {*/}
                {/*      semesterRef.current.disabled = true;*/}
                {/*    } else {*/}
                {/*      semesterRef.current.disabled = false;*/}
                {/*    }*/}
                {/*  }}*/}
                {/*>*/}
                {/*  <OptionsForGroups />*/}
                {/*</StyledBox>*/}

                <div className="d-grid gap-2">
                  <Dropdown className="d-block">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {currentGroup}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ maxHeight: '250px', overflowY: 'scroll' }}>
                      <DropdownForGroups />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </>
            ) : (
              <StyledBox
                defaultValue={currentTeacher}
                name="teacher"
                onChange={e => {
                  setCurrentGroup('Виберіть групу');
                  const val = e.target.value;
                  setCurrentTeacher(val);

                  if (val !== 'Виберіть викладача') {
                    semesterRef.current.disabled = true;
                  } else {
                    semesterRef.current.disabled = false;
                  }
                }}
              >
                <OptionsForTeachers />
              </StyledBox>
            )}
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
    // </Navbar>
  );
};

export default GuestPanel;
