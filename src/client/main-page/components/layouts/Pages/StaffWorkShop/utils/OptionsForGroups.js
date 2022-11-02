import React, { useContext } from 'react';
import RozkladContext from '../../../../../context/RozkladContext';

const OptionsForGroups = () => {
  const { state } = useContext(RozkladContext);

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
  return (
    <>
      <option value="Виберіть групу">Виберіть групу</option>
      {groups.map((gr, idx) => (
        <option key={idx} value={`${gr}`}>
          {gr}
        </option>
      ))}
    </>
  );
};

export default OptionsForGroups;
