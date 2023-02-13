import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import RozkladContext from '../../../../../context/RozkladContext';

const DropdownForGroups = () => {
  const { state, setCurrentGroup, setCurrentTeacher } = useContext(RozkladContext);

  const { academicloadfond, currentSemester } = state;

  if (!academicloadfond || !currentSemester)
    return <option value="Виберіть групу">Виберіть групу</option>;

  const groups = academicloadfond[currentSemester.name]
    ? [
        ...new Set([
          ...academicloadfond[currentSemester.name].data
            .map(r => r[1])
            .join('+')
            .split('+')
            .map(r => r.split('гр')[0]),
        ]),
      ].sort()
    : [];

  const handleClick = (e) => {
    const group = e.currentTarget.innerHTML;
    setCurrentTeacher('Виберіть викладача')
    setCurrentGroup(group);
  };
  return (
    <>
      {groups.map((gr, idx) => (
        <Dropdown.Item key={idx} as="button" onClick={handleClick}>
          {gr}
        </Dropdown.Item>
      ))}
    </>
  );
};

export default DropdownForGroups;
