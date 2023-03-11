import React, {useContext, useEffect, useState} from 'react';
import { MenuItem, SubMenu } from 'react-pro-sidebar';
import RozkladContext from '../../../context/RozkladContext';

const cury = new Date().getFullYear()
const curm = new Date().getMonth()

const curacyear = `${curm > 7 ? cury : cury - 1}-${curm > 7 ? cury + 1 : cury}`
const SideBarSttingsYear = () => {
  const {
    state,
    setCurrentAcademicYear,
    createNewAcademicYear,
    setCurrentSemester,
  } = useContext(RozkladContext);
  const [title, setTitle] = useState(curacyear);
  const { currentDep } = state;

  useEffect(()=>{
    setTitle(curacyear);
    setCurrentAcademicYear({
      name: curacyear,
      id: currentDep[curacyear] ? currentDep[curacyear] : '',
    });
  },[])

  const handleClick = e => {
    const val = e.target.textContent;
    setTitle(val);
    setCurrentAcademicYear({
      name: val,
      id: currentDep[val] ? currentDep[val] : '',
    });
    setCurrentSemester(null);
    if (currentDep[val] === '') {
      createNewAcademicYear({
        dep: currentDep.Підрозділ,
        academicYear: val,
      });
    }
  };
  return (
    <SubMenu label={`Н.р.: ${title}`}>
      {Object.keys(currentDep)
        .slice(4)
        .map((acyear, idx) => (
          <MenuItem key={idx}>
            <div onClick={handleClick}>{acyear}</div>
          </MenuItem>
        ))}
    </SubMenu>
  );
};

export default SideBarSttingsYear;
