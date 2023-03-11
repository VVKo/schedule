import React, { useContext, useEffect, useState } from 'react';
import { DropdownButton, Dropdown, NavDropdown } from 'react-bootstrap';
import RozkladContext from '../../../context/RozkladContext';

const CurrentYearDD = () => {
  const {
    state,
    setCurrentAcademicYear,
    createNewAcademicYear,
    setCurrentSemester,
  } = useContext(RozkladContext);

  const { currentDep, currentAcademicYear } = state;

  const [title, setTitle] = useState(
    !currentAcademicYear ? 'Виберіть навчальний рік' : currentAcademicYear.name
  );

  if (!currentDep) return null;

  useEffect(() => {
    !currentAcademicYear
      ? setTitle('Виберіть навчальний рік')
      : setTitle(currentAcademicYear.name);
  }, [currentAcademicYear]);
  const handleClick = e => {
    const val = e.target.textContent;
    setTitle(val);
    setCurrentAcademicYear({
      name: val,
      id: currentDep[val] ? currentDep[val] : '',
    });
    setCurrentSemester(null);
    if (val !== 'Виберіть навчальний рік' && currentDep[val] === '') {
      createNewAcademicYear({
        dep: currentDep.Підрозділ,
        academicYear: val,
      });
    }
  };

  return (
    <NavDropdown id="dropdown-basic-button" title={title}>
      {Object.keys(currentDep)
        .slice(4)
        .map((acyear, idx) => (
          <NavDropdown.Item key={idx}>
            <div onClick={handleClick}>{acyear}</div>
          </NavDropdown.Item>
        ))}
    </NavDropdown>
  );
};

export default CurrentYearDD;
