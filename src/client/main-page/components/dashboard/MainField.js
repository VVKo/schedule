import React from "react";
import SideBarMenu from "./SideBarMenu";
import WorkPlace from "./WorkPlace";

export default function MainField(props) {
  console.log("mainField", props);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {props.state.isLogined && props.state.role !== "guest" ? (
            <SideBarMenu state={props} showsidebar={props.sideBarState} />
          ) : null}

          <WorkPlace
            state={props}
            updateData={props.updateData}
            getShowSide={props.sidebarHandler}
          />
        </div>
      </div>
    </>
  );
}
