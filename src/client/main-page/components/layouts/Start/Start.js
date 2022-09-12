import React, { useContext } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Department from '../Pages/Department';
import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';
import {
  ButtonTo,
  DepartmentItem,
  DepartmentList,
} from '../../Styled/StyledComponents';

const Start = () => {
  const { dataLoaded, departmentList } = useContext(RozkladContext);

  const handleClick = e => {
    console.log(e.currentTarget.innerText);
  };

  if (!dataLoaded) return <Spinner />;

  console.log('departmentList', departmentList);
  return (
    <>
      <Switch>
        {departmentList.map((dep, idx) => (
          <Route key={idx} path={`/${idx}`} component={Department} />
        ))}
      </Switch>
      <DepartmentList>
        <h1>Виберіть структурний підрозділ</h1>
        {departmentList.map((dep, idx) => (
          <DepartmentItem key={idx} onClick={handleClick}>
            <div>
              <Link to={`/department/${idx}`}>
                <p>{dep['Підрозділ']}</p>
              </Link>
            </div>
          </DepartmentItem>
        ))}
      </DepartmentList>
    </>
  );
};

export default Start;
