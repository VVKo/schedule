import React, { useContext, useEffect } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
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
          <Carousel variant="dark">
            {departments.map((dep, idx) => (
              <Carousel.Item key={idx}>
                <Link to={`department/${idx}`}>
                  <img
                    src={`${
                      dep.IMG.includes('https')
                        ? dep.IMG
                        : 'holder.js/800x400?bg=373940'
                    }`}
                    // width="800"
                    // height="400"
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingBottom: '10px',
                      height: '400px'
                    }}
                    alt={dep['Підрозділ']}
                  />
                  <Carousel.Caption>
                    <h3>{dep['Підрозділ']}</h3>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
          {/*<DepartmentList>*/}
          {/*  <h1>Виберіть структурний підрозділ</h1>*/}
          {/*  {departments.map((dep, idx) => (*/}
          {/*    <DepartmentItem key={idx}>*/}
          {/*      <div>*/}
          {/*        <Link to={`department/${idx}`}>*/}
          {/*          <p>*/}
          {/*            {dep['Підрозділ']}*/}
          {/*            <img src={dep.IMG} alt={'no image'} />*/}
          {/*          </p>*/}
          {/*        </Link>*/}
          {/*      </div>*/}
          {/*    </DepartmentItem>*/}
          {/*  ))}*/}
          {/*</DepartmentList>*/}
        </Route>
      </Switch>
    </>
  );
};

export default Start;
