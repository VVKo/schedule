import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import GroupRozklad from '../rozklad/GroupRozklad';
import Home from '../demo/Home';
import Rooms from '../rozklad/Rooms';

const RoutMaker = props => {
  console.log('RoutMaker render', props);
  const [DATA, setDATA] = useState(props.state.data);

  useEffect(() => {
    console.log('DATA was Changed');
    setDATA(props.state.data);
  }, [props]);

  // const classrooms = {
  //   'Лаб.': DATA.map(r => r[88])
  //     .filter(r => r !== '')
  //     .slice(2),
  //   інші: DATA.map(r => r[89])
  //     .filter(r => r !== '')
  //     .slice(2),
  // };

  const classrooms = props.state.rooms;

  const rooms = new Set();

  DATA.slice(6).map(r =>
    r
      .slice(8)
      .filter(ro => ro.toString() !== '')
      .forEach(aud => rooms.add(aud))
  );

  const allrooms = [...rooms].sort().filter(r => r !== '');

  const allStudents = props.state.students;
  const workTable = props.state.table;

  const teachers = [...new Set(DATA.slice(5).map(r => r[4].trim()))]
    .sort()
    .filter(r => r !== '');

  const groups = [
    ...new Set(
      DATA.map(r => r[1].split('+'))
        .join(',')
        .split(',')
        .map(r => r.split('гр')[0])
    ),
  ]
    .sort()
    .filter(r => r !== '');

  return (
    <Switch>
      {groups.map((value, idx) => {
        const path = `/groups/${value}`;
        return (
          <Route
            render={RouteProps => {
              return (
                <GroupRozklad
                  updateData={props.updateData}
                  gr={value}
                  role={props.state.role}
                  {...RouteProps}
                  fulldata={DATA.map((val, inx) => [inx, ...val])}
                  students={allStudents}
                  workTable={workTable}
                  classrooms={classrooms}
                  groups={groups}
                />
              );
            }}
            path={path}
            key={idx + 1}
          />
        );
      })}
      {teachers.map((value, idx) => {
        const path = `/teachers/${value}`;
        return (
          <Route
            render={RouteProps => {
              return (
                <GroupRozklad
                  updateData={props.updateData}
                  gr={value}
                  role={props.state.role}
                  {...RouteProps}
                  fulldata={DATA.map((val, inx) => [inx, ...val])}
                  workTable={workTable}
                  classrooms={classrooms}
                  groups={groups}
                />
              );
            }}
            path={path}
            key={idx + 1}
          />
        );
      })}

      {allrooms.map((value, idx) => {
        const path = `/rooms/${value
          .replace(' ', '-')
          .replace('.', '')
          .replace('(', '-')
          .replace(')', '-')}`;
        return (
          <Route
            render={RouteProps => {
              return (
                <Rooms
                  room={value}
                  role={props.state.role}
                  {...RouteProps}
                  fulldata={DATA.map((val, inx) => [inx, ...val])}
                />
              );
            }}
            path={path}
            key={idx + 1}
          />
        );
      })}

      <Route
        render={RouteProps => {
          return <Home {...RouteProps} />;
        }}
        path={'/'}
      />
    </Switch>
  );
};

export default RoutMaker;
