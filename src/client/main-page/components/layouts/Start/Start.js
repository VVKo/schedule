import React, { useContext, useEffect } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import Department from '../Pages/Department';
import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';
import { DepartmentItem, DepartmentList } from '../../Styled/StyledComponents';

const Start = () => {


  const { state, getDepartments } = useContext(RozkladContext);
  const { departments } = state;
  useEffect(() => {
    getDepartments();
  }, []);

  if (!departments || departments.length === 0) return <Spinner />;

  return (
    <>


      <Switch>
        <Route path={`/department/:id`}>
          <Department />
        </Route>
        <Route path={`/`}>
          <DepartmentList>
            <h1>Виберіть структурний підрозділ</h1>
            {departments.map((dep, idx) => (
              <DepartmentItem key={idx}>
                <div>
                  <Link to={`department/${idx}`}>
                    <p>{dep['Підрозділ']}</p>
                  </Link>
                </div>
              </DepartmentItem>
            ))}
          </DepartmentList>
        </Route>
      </Switch>
    </>
  );
};

export default Start;
