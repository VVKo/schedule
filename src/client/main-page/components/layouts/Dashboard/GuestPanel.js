import React, { useContext, useEffect, useRef, useState } from 'react';
import { Panel, StyledBox } from '../../Styled/StyledComponents';
import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';
import OptionsForGroups from '../Pages/StaffWorkShop/utils/OptionsForGroups';

const GuestPanel = () => {
  const {
    publicPanel,
    setPublicPanel,
    currentGroups,
    currentTeachers,
    state,
    setCurrentAcademicYear,
    setCurrentSemester,
      setCurrentGroup,
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
    audfond,
    teacherfond,
    groupfond,
    disciplinefond,
    academicloadfond,
  } = state;

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

  const fondInit = (val, fond, getFond) => {
    if (!fond) {
      getFond(val, currentAcademicYear.id);
    } else if (!(val in fond)) {
      getFond(val, currentAcademicYear.id);
    }
  };

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

  // const groups = [
  //       ...new Set([
  //         ...academicloadfond[currentSemester.name].data
  //           .map(r => r[1])
  //           .join('+')
  //           .split('+')
  //           .map(r => r.split('гр')[0]),
  //       ]),
  //     ].sort();

  return (
    <Panel onSubmit={handleSubmit}>
      <StyledBox
        defaultValue={'Виберіть навчльний рік'}
        // publicPanel.academicYear.name
        name="academicYear"
        ref={academicYearRef}
        disabled={false}
        onChange={e => {
          const val = e.target.value;

          setCurrentAcademicYear({
            name: val,
            id: currentDep[val] ? currentDep[val] : '',
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
        defaultValue={publicPanel.semester.name}
        name="semester"
        ref={semesterRef}
        disabled={true}
        onChange={e => {
          const val = e.target.value;
          setCurrentSemester({
            name: val,
          });
          setPublicPanel(prevState => {
            return {
              ...prevState,
              semester: { ...prevState.semester, name: val },
            };
          });

          if (val !== 'Виберіть семестр') {
            academicYearRef.current.disabled = true;
            groupeRef.current.disabled = false;
            teacherRef.current.disabled = false;
            fondInit(val, audfond, getAudFond);
            fondInit(val, teacherfond, getTeacherFond);
            fondInit(val, groupfond, getGroupFond);
            fondInit(val, disciplinefond, getDisciplineFond);
            fondInit(val, academicloadfond, getAcademicLoadFond);
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
            setCurrentGroup(val)
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
        <OptionsForGroups />
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
