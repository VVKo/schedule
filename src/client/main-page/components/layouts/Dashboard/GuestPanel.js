import React, { useContext, useEffect, useRef, useState } from 'react';
import { Panel, StyledBox } from '../../Styled/StyledComponents';
import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';

const GuestPanel = () => {
  const {
    publicPanel,
    setPublicPanel,
    currentGroups,
    currentTeachers,
    state,
    setCurrentAcademicYear,
    createNewAcademicYear,
  } = useContext(RozkladContext);

  const { currentDep, currentAcademicYear } = state;

  if (!currentDep && !currentAcademicYear) return <Spinner />;

  console.log(
    'currentGroups',
    currentGroups,
    'publicPanel',
    publicPanel,
    'currentDep',
    currentDep,
    'currentAcademicYear',
    currentAcademicYear
  );

  const groupeRef = useRef();
  const teacherRef = useRef();
  const semesterRef = useRef();
  const academicYearRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const fdata = {};
    for (const [name, value] of data) {
      fdata[name] = value;
    }
    // showButton(fdata);
    console.log('handleSubmit', fdata);
  };
  return (
    <Panel onSubmit={handleSubmit}>
      <StyledBox
        defaultValue={publicPanel.academicYear.name}
        name="academicYear"
        ref={academicYearRef}
        disabled={false}
        onChange={e => {
          const val = e.target.value;

          setCurrentAcademicYear({
            name: val,
            id: currentDep[val] ? currentDep[val] : '',
          });

          setPublicPanel(prevState => {
            return {
              ...prevState,
              academicYear: {
                ...prevState.academicYear,
                name: val,
                id: currentDep[val] ? currentDep[val] : '',
              },
            };
          });

          if (val !== 'Виберіть навчльний рік' && currentDep[val] === '') {
            createNewAcademicYear({
              dep: currentDep.Підрозділ,
              academicYear: val,
            });
          }

          if (val !== 'Виберіть навчальний рік') {
            semesterRef.current.disabled = false;
            groupeRef.current.disabled = true;
            teacherRef.current.disabled = true;
          } else {
            semesterRef.current.disabled = true;
            groupeRef.current.disabled = true;
            teacherRef.current.disabled = true;
          }
        }}
      >
        <option value="Виберіть навчальний рік">Виберіть навчальний рік</option>
        {Object.keys(currentDep)
          .slice(4)
          .map((acyear, idx) => (
            <option key={idx} value={`${acyear}`}>
              {acyear}
            </option>
          ))}
      </StyledBox>

      <StyledBox
        defaultValue={publicPanel.semester}
        name="semester"
        ref={semesterRef}
        disabled={true}
        onChange={e => {
          const val = e.target.value;

          setPublicPanel(prevState => {
            return {
              ...prevState,
              semester: val,
            };
          });

          if (val !== 'Виберіть семестр') {
            academicYearRef.current.disabled = true;
            groupeRef.current.disabled = false;
            teacherRef.current.disabled = false;
          } else {
            academicYearRef.current.disabled = false;
            groupeRef.current.disabled = true;
            teacherRef.current.disabled = true;
          }
        }}
      >
        <option value="Виберіть семестр">Виберіть семестр</option>
        <option value="1 семестр">1 семестр</option>
        <option value="2 семестр">2 семестр</option>
      </StyledBox>

      <StyledBox
        defaultValue={publicPanel.groups[0]}
        name="group"
        ref={groupeRef}
        disabled={true}
        onChange={e => {
          const val = e.target.value;
          setPublicPanel(prevState => {
            return { ...prevState, group: val, groups: [val] };
          });

          if (val !== 'Виберіть групу') {
            teacherRef.current.disabled = true;
            semesterRef.current.disabled = true;
          } else {
            groupeRef.current.disabled = false;
            teacherRef.current.disabled = false;
            semesterRef.current.disabled = false;
          }
        }}
      >
        <option value="Виберіть групу">Виберіть групу</option>
        {currentGroups.map((gr, idx) => (
          <option key={idx} value={`${gr}`}>
            {gr}
          </option>
        ))}
      </StyledBox>

      <StyledBox
        defaultValue={publicPanel.teacher}
        name="teacher"
        ref={teacherRef}
        disabled={true}
        onChange={e => {
          const val = e.target.value;
          setPublicPanel(prevState => {
            return { ...prevState, teacher: val };
          });

          if (val !== 'Виберіть викладача') {
            groupeRef.current.disabled = true;
            semesterRef.current.disabled = true;
          } else {
            groupeRef.current.disabled = false;
            teacherRef.current.disabled = false;
            semesterRef.current.disabled = false;
          }
        }}
      >
        <option value="Виберіть викладача">Виберіть викладача</option>
        {currentTeachers.map((gr, idx) => (
          <option key={idx} value={`${gr}`}>
            {gr}
          </option>
        ))}
      </StyledBox>
    </Panel>
  );
};

export default GuestPanel;
