import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Navbar
} from "react-bootstrap";

import Nav from "react-bootstrap/Nav";

const SideBarMenu = props => {
  console.log("SideBar", props);
  const [value, setValue] = useState("");
  const history = useHistory();

  useEffect(() => {
    console.log("shows was changed", props.showsidebar);
  }, [props.showsidebar]);

  const side = show => {
    const obj = [
      ...new Set(
        props.state.state.data
          .map(r => r[1].split("+"))
          .join(",")
          .split(",")
          .map(r => r.slice(0, 3))
      )
    ]
      .sort()
      .filter(r => r !== "");
    const teachers = [...new Set(props.state.state.data.map(r => r[4]))]
      .sort()
      .filter(r => r !== "");
    return (
      <>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Виберіть групу</Form.Label>
          <Form.Control
            as="select"
            defaultValue="ІНСТРУКЦІЯ"
            onChange={e => {
              console.log("ГРУПА", e.target.value);
              e.target.value !== "ІНСТРУКЦІЯ"
                ? history.push(`/groups/${e.target.value}`)
                : history.push(`/`);
            }}
            onClick={e => {
              console.log("ГРУПА КЛІК", e.target.value);
              e.target.value !== "ІНСТРУКЦІЯ"
                ? history.push(`/groups/${e.target.value}`)
                : history.push(`/`);
            }}
          >
            <option>ІНСТРУКЦІЯ</option>
            {obj.map(o => {
              return (
                <>
                  <option>{o}</option>
                </>
              );
            })}
          </Form.Control>
          <Form.Label>Виберіть викладача</Form.Label>
          <Form.Control
            as="select"
            defaultValue="ІНСТРУКЦІЯ"
            onChange={e => {
              e.target.value !== "ІНСТРУКЦІЯ"
                ? history.push(`/teachers/${e.target.value}`)
                : history.push(`/`);
            }}
            onClick={e => {
              e.target.value !== "ІНСТРУКЦІЯ"
                ? history.push(`/teachers/${e.target.value}`)
                : history.push(`/`);
            }}
          >
            <option>ІНСТРУКЦІЯ</option>
            {teachers.map(o => {
              return (
                <>
                  <option>{o}</option>
                </>
              );
            })}
          </Form.Control>
        </Form.Group>

        {/* obj.map((o, idx) => {
          const path = `/groups/${o}`;
          return (
            <Nav.Item key={idx + 1}>
              <NavLink to={path} className={'nav-link'} role={'button'}>
                {o}
              </NavLink>
            </Nav.Item>
          );
        }) */}
      </>
    );
  };

  return (
    <>
      <Navbar
        id={"responsive-navbar-nav"}
        className={"col-md-3 col-lg-2 d-md-block sidebar"}
        expand=""
        bg={"light"}
        bsPrefix={""}
      >
        <Nav className={"flex-column"}>{side(props)}</Nav>
      </Navbar>
    </>
  );
};

export default SideBarMenu;
