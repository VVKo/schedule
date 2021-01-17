import React, { useEffect, useState } from "react";
import DemoMainField from "../demo/DemoMainField";
import LoginCrutch from "../auth/LoginCrutch";
import RoutMaker from "../router/RoutMaker";

const WorkPlace = props => {
  console.log("WorkPlace", props);

  const [showside, setShow] = useState(props.state.sideBarState);
  useEffect(() => {
    console.log("props side bar");
    props.state.sidebarHandler(showside);
  }, [showside]);

  const changeSide = side => {
    setShow(side);
  };

  return (
    <>
      {!props.state.state.isLogined ? (
        <LoginCrutch login={props}></LoginCrutch>
      ) : props.state.state.role !== "guest" ? (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <RoutMaker
            state={props.state.state}
            sidebar={changeSide}
            updateData={props.updateData}
            showside={showside}
          />
        </main>
      ) : (
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <DemoMainField />
        </main>
      )}
    </>
  );
};

export default WorkPlace;
