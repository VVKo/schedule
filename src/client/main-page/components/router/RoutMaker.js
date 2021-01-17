import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

import GroupRozklad from "../rozklad/GroupRozklad";
import Home from "../demo/Home";

const RoutMaker = props => {
  console.log("RoutMaker", props);
  const [DATA, setDATA] = useState(props.state.data);

  const allStudents = props.state.students;

  useEffect(() => {
    console.log("DATA was Changed");
  }, [DATA]);

  const changeData = obj => {
    console.log("changeData was called");
    setDATA(prevState => {
      const tmp = prevState;
      tmp[Number(obj.row) - 1][Number(obj.col) - 1] = obj.aud;
      return tmp;
    });
  };

  const teachers = [...new Set(DATA.map(r => r[4]))]
    .sort()
    .filter(r => r !== "");

  const groups = [
    ...new Set(
      DATA.map(r => r[1].split("+"))
        .join(",")
        .split(",")
        .map(r => r.slice(0, 3))
    )
  ]
    .sort()
    .filter(r => r !== "");

  return (
    <Switch>
      {groups.map((value, idx) => {
        const path = `/groups/${value}`;
        return (
          <Route
            render={RouteProps => {
              return (
                <GroupRozklad
                  changeDATA={changeData}
                  updateData={props.updateData}
                  gr={value}
                  role={props.state.role}
                  {...RouteProps}
                  fulldata={DATA.map((val, inx) => [inx, ...val])}
                  students={allStudents}
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
                  changeDATA={changeData}
                  updateData={props.updateData}
                  gr={value}
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
        path={"/"}
      />
    </Switch>
  );
};

export default RoutMaker;
