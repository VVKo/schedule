import React, {useContext} from 'react';
import RozkladContext from '../../../../../context/RozkladContext';

const OptionsForTeachers = () => {
  const { state } = useContext(RozkladContext);

  const { academicloadfond, currentSemester } = state;

  if (!academicloadfond || !currentSemester)
    return <option value="Виберіть викладача">Виберіть викладача</option>;

  const teachers = academicloadfond[currentSemester.name]
    ? [
        ...new Set([
          ...academicloadfond[currentSemester.name].data.map(r => r[4]),
        ]),
      ].sort()
    : [];

  return (
    <>
      <option value="Виберіть викладача">Виберіть викладача</option>
      {teachers.map((teacher, idx) => (
        <option key={idx} value={`${teacher}`}>
          {teacher}
        </option>
      ))}
    </>
  );
};

export default OptionsForTeachers;
