import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Form,
  Modal
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import server from "../../../utils/server";

const { serverFunctions } = server;

const OnClickRozklad = props => {
  console.log("OnClickRozklad", props);

  const client =
    props.client.length === 3 ? `${props.client} група` : props.client;
  const [showMenu, setShowMenu] = useState(props.data.show);

  useEffect(() => {
    console.log("OnClickRozklad was changed");
    setShowMenu(props.data.show);
  }, [props]);

  const clickDELETE = e => {
    const data = {
      row: e.target.attributes.row.nodeValue,
      col: e.target.attributes.col.nodeValue,
      aud: "",
      client
    };
    serverFunctions
      .updateRozklad(data)
      .then(res => {
        console.log("аудиторію видалено", res);

        props.updateData(data);
      })
      .catch(alert);
  };

  const clickADD = e => {
    const data = {
      row: e.target.attributes.row.nodeValue,
      col: e.target.attributes.col.nodeValue,
      aud:
        e.target.parentElement.parentElement.parentElement.childNodes[4]
          .innerText,
      client
    };

    console.log("clickADD", data);

    serverFunctions
      .updateRozklad(data)
      .then(res => {
        props.updateData(data);

        console.log("updateRozklad", res);
      })
      .catch(alert);
  };
  const listToDropDown = list => {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {list.map(l => {
              return (
                <>
                  <Dropdown.Item>{l}</Dropdown.Item>
                </>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };
  const WorkTable = (arr, week = "first", maybe = false) => {
    const data = arr.map(val => {
      const o = { ...val };
      o.id = `${o.row}:${o.col}`;
      o.action =
        o.name !== "Вікно" ? (
          <>
            <ButtonGroup aria-label="Basic example">
              <Button
                variant="secondary"
                row={o.row}
                col={o.col}
                onClick={maybe ? clickADD : clickDELETE}
              >
                {maybe ? "Додати" : "Видалити"}
              </Button>
            </ButtonGroup>
          </>
        ) : null;
      return o;
    });

    const columns = [
      {
        dataField: "id",
        text: "#",
        hidden: true,
        editable: false
      },
      {
        dataField: "group",
        text: "Група",
        headerAlign: "center",
        editable: false,
        headerStyle: {
          backgroundColor: week === "first" ? "#007bff" : "#6c757d"
        }
      },
      {
        dataField: "name",
        text: "Дисципліна",
        headerAlign: "center",
        editable: false,
        headerStyle: {
          backgroundColor: week === "first" ? "#007bff" : "#6c757d"
        }
      },
      {
        dataField: "type",
        text: "тип",
        headerAlign: "center",
        editable: false,
        headerStyle: {
          backgroundColor: week === "first" ? "#007bff" : "#6c757d"
        }
      },
      {
        dataField: "prepod",
        text: "Викладач",
        headerAlign: "center",
        editable: false,
        headerStyle: {
          backgroundColor: week === "first" ? "#007bff" : "#6c757d"
        }
      },
      {
        dataField: "aud",
        text: "Аудиторія",
        headerAlign: "center",
        headerStyle: {
          backgroundColor: week === "first" ? "#007bff" : "#6c757d"
        }
      },
      {
        dataField: "action",
        text: "Дія",
        headerAlign: "center",
        editable: false,
        headerStyle: {
          backgroundColor: week === "first" ? "#007bff" : "#6c757d"
        }
      }
    ];

    return (
      <>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          cellEdit={cellEditFactory({ mode: "click" })}
        />
      </>
    );
  };

  return (
    <>
      <Modal
        show={showMenu}
        size="xl"
        onHide={props.close}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.data.data.day}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Пара №{props.data.data.para}</h2>
          <p>Перший тиждень: </p>
          {WorkTable(props.data.data.firstweek, "first")}
          <p>Другий тиждень: </p>
          {WorkTable(props.data.data.secondweek, "second")}

          <p>Можливі варіанти (перший тиждень): </p>
          {WorkTable(props.data.data.firstweek_maybe, "first", true)}
          <p>Можливі варіанти (другий тиждень): </p>
          {WorkTable(props.data.data.secondweek_maybe, "second", true)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button variant="primary" onClick={props.close}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OnClickRozklad;
