import React, { useContext, useRef } from 'react';
import { Panel, StyledBox } from '../../Styled/StyledComponents';
import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';
import OptionsForGroups from '../Pages/StaffWorkShop/utils/OptionsForGroups';
import OptionsForTeachers from '../Pages/StaffWorkShop/utils/OptionsForTeachers';

const GuestPanel = () => {
  const groupeRef = useRef();
  const teacherRef = useRef();
  const semesterRef = useRef();
  const academicYearRef = useRef();

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
    <Panel>
      <StyledBox
        defaultValue={'Виберіть навчальний рік'}
        name="academicYear"
        ref={academicYearRef}
        disabled={false}
        onChange={e => {
          const val = e.target.value;

          setCurrentAcademicYear({
            name: val,
            id: currentDep[val] ? currentDep[val] : '',
          });

          if (val !== 'Виберіть навчальний рік' && currentDep[val] === '') {
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
        defaultValue={'Виберіть семестр'}
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
        defaultValue={currentGroup}
        name="group"
        ref={groupeRef}
        disabled={true}
        onChange={e => {
          const val = e.target.value;
          setCurrentGroup(val);

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
        defaultValue={currentTeacher}
        name="teacher"
        ref={teacherRef}
        disabled={true}
        onChange={e => {
          const val = e.target.value;
          setCurrentTeacher(val);

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
        <OptionsForTeachers />
      </StyledBox>
    </Panel>
  );
};

export default GuestPanel;
