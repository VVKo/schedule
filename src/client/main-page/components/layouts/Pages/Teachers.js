import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RozkladContext from '../../../context/RozkladContext';

const Teachers = () => {
  const { state, setCurrentGroup, setCurrentTeacher } = useContext(
    RozkladContext
  );

  const {
    currentSemester,
    user,
    currentGroup,
    currentTeacher,
    academicloadfond,
    disciplinefond,
  } = state;

  const teachers = [
    ...new Set([...academicloadfond[currentSemester.name].data.map(r => r[4])]),
  ].sort();

  if (!currentSemester || !academicloadfond) return null;
  return (
    <>
      {teachers.map((teacher, idx) => (
        <Link key={idx} to={'/publicschedule'}>
          <Button
            variant={'outline-dark'}
            title={teacher}
            onClick={() => {
              setCurrentGroup(undefined);
              setCurrentTeacher(teacher);
            }}
          >
            {teacher}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default Teachers;
