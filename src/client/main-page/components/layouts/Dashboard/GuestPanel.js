import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Container,
  Panel,
  StyledBox,
  StyledButton,
  StyledCheckBoxDropdown,
  StyledCheckBoxDropdownList,
} from '../../Styled/StyledComponents';
import RozkladContext from '../../../context/RozkladContext';

const GuestPanel = () => {
  const {
    publicPanel,
    showButton,
    workData,
    setPublicPanel,
    currentGroups,
    setCurrentGroups,
    currentTeachers,
    setCurrentTeachers,
  } = useContext(RozkladContext);

  // const groups =
  //   workData && workData['Групи']
  //     ? workData['Групи'].map(obj => obj['група'])
  //     : [];

  // const prepods =
  //   workData && workData['Викладачі']
  //     ? workData['Викладачі'].map(obj => obj['викладач'])
  //     : [];

  console.log('currentGroups', currentGroups, publicPanel);

  const groupeRef = useRef();
  const teacherRef = useRef();
  const semesterRef = useRef();

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
        defaultValue={publicPanel.semester}
        name="semester"
        ref={semesterRef}
        disabled={false}
        onChange={e => {
          const val = e.target.value;

          setPublicPanel(prevState => {
            return {
              ...prevState,
              semester: val,
            };
          });

          if (val !== 'Виберіть семестр') {
            groupeRef.current.disabled = false;
            teacherRef.current.disabled = false;
          } else {
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

      {/* <StyledBox */}
      {/*  className={'active'} */}
      {/*  defaultValue={['all',3]} */}
      {/*  name="test" */}
      {/*  onChange={e => { */}
      {/*    console.log('TEST', e.target); */}
      {/*  }} */}
      {/*  multiple */}
      {/* > */}
      {/*  <option value="all">All</option> */}
      {/*  <option value="1">1</option> */}
      {/*  <option value="2">2</option> */}
      {/*  <option value="3">3</option> */}
      {/* </StyledBox> */}

      {/* <StyledButton type="submit"> Show </StyledButton> */}
    </Panel>
  );
};

export default GuestPanel;
