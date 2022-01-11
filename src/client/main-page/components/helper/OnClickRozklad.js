import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import server from '../../../utils/server';

const { serverFunctions } = server;

const OnClickRozklad = props => {
  const client =
    props.client.length === 3 ? `${props.client} група` : props.client;

  const [showMenu, setShowMenu] = useState(props.data.show);

  useEffect(() => {
    setShowMenu(props.data.show);
  }, [props]);

  const clickDELETE = e => {
    const data = {
      row: e.target.attributes.row.nodeValue,
      col: e.target.attributes.col.nodeValue,
      aud: '',
      client,
      table: { ...props.workTable },
    };
    serverFunctions
      .updateRozklad(data)
      .then(res => {
        console.log('аудиторію видалено', res);

        props.updateData(data);
        props.close();
      })
      .catch(alert);
  };

  const clickUPDATE = e => {
    const key = `${e.target.attributes.row.nodeValue}:${e.target.attributes.col.nodeValue}`;

    const manual = document.getElementById(`aud${key}`).value;
    const drop = document.getElementById(`maybeaud${key}`).value;

    console.log(manual, drop);

    const aud = manual !== '' ? manual.toString().trim() : drop;
    const data = {
      row: e.target.attributes.row.nodeValue,
      col: e.target.attributes.col.nodeValue,
      aud,
      /* e.target.parentElement.parentElement.parentElement.childNodes[4]
          .innerText, */
      client,
      table: { ...props.workTable },
    };

    serverFunctions
      .updateRozklad(data)
      .then(res => {
        props.updateData(data);

        console.log('updateRozklad', res);
        props.close();
      })
      .catch(alert);
  };

  const clickADD = e => {
    const key = `${e.target.attributes.row.nodeValue}:${e.target.attributes.col.nodeValue}`;

    const manual = document.getElementById(`aud${key}`).value;
    const drop = document.getElementById(`maybeaud${key}`).value;

    const aud = manual !== '' ? manual : drop;
    const data = {
      row: e.target.attributes.row.nodeValue,
      col: e.target.attributes.col.nodeValue,
      aud,
      /* e.target.parentElement.parentElement.parentElement.childNodes[4]
          .innerText, */
      client,
      table: { ...props.workTable },
    };

    console.log('clickADD', data);

    serverFunctions
      .updateRozklad(data)
      .then(res => {
        props.updateData(data);

        console.log('clickADDupdateRozklad', res);
        props.close();
      })
      .catch(alert);
  };

  const listToDropDownUPDATE = (key, list, aud) => {
    return (
      <>
        <Form key={key}>
          <Form.Group>
            <Form.Label>Введення вручну</Form.Label>
            <Form.Control type="text" placeholder={aud} id={`aud${key}`} />
          </Form.Group>

          <>
            <Form.Group>
              <Form.Label>Доступні аудиторії</Form.Label>
              <Form.Control as="select" id={`maybeaud${key}`}>
                {list.map(aud => {
                  return (
                    <>
                      <option>{aud}</option>
                    </>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </>
        </Form>
      </>
    );
  };

  const listToDropDown = (key, list) => {
    return (
      <>
        <Form key={key}>
          <Form.Group>
            <Form.Label>Введення вручну</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть аудиторію"
              id={`aud${key}`}
            />
          </Form.Group>
          {list.length > 1 ? (
            <>
              <Form.Group>
                <Form.Label>Доступні аудиторії</Form.Label>
                <Form.Control as="select" id={`maybeaud${key}`}>
                  {list.map(aud => {
                    return (
                      <>
                        <option>{aud}</option>
                      </>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </>
          ) : null}
        </Form>
      </>
    );
  };

  const WorkTable = (arr, week = 'first', maybe = false) => {
    const data = arr.map(val => {
      const o = { ...val };
      o.id = `${o.row}:${o.col}`;

      o.aud = val.aud
        ? val.aud.split(',').length === 1
          ? maybe
            ? listToDropDown(o.id, [val.aud])
            : listToDropDownUPDATE(o.id, val.maybeaud.split(','), val.aud)
          : listToDropDown(o.id, val.aud.split(','))
        : null;

      o.action =
        o.name !== 'Вікно' ? (
          <>
            <ButtonGroup aria-label="Basic example">
              <Button
                variant={week === 'first' ? 'primary' : 'secondary'}
                row={o.row}
                col={o.col}
                onClick={maybe ? clickADD : clickUPDATE}
              >
                {maybe ? 'Додати' : 'Оновити'}
              </Button>
              {!maybe ? (
                <Button
                  variant={'danger'}
                  row={o.row}
                  col={o.col}
                  onClick={clickDELETE}
                >
                  Видалити
                </Button>
              ) : null}
            </ButtonGroup>
          </>
        ) : null;
      return o;
    });

    const columns = [
      {
        dataField: 'id',
        text: '#',
        hidden: true,
        editable: false,
      },
      {
        dataField: 'group',
        text: 'Група',
        headerAlign: 'center',
        editable: false,
        headerStyle: {
          backgroundColor: week === 'first' ? '#007bff' : '#6c757d',
        },
      },
      {
        dataField: 'name',
        text: 'Дисципліна',
        headerAlign: 'center',
        editable: false,
        headerStyle: {
          backgroundColor: week === 'first' ? '#007bff' : '#6c757d',
        },
      },
      {
        dataField: 'type',
        text: 'тип',
        headerAlign: 'center',
        editable: false,
        headerStyle: {
          backgroundColor: week === 'first' ? '#007bff' : '#6c757d',
        },
      },
      {
        dataField: 'prepod',
        text: 'Викладач',
        headerAlign: 'center',
        editable: false,
        headerStyle: {
          backgroundColor: week === 'first' ? '#007bff' : '#6c757d',
        },
      },
      {
        dataField: 'aud',
        text: 'Аудиторія',
        headerAlign: 'center',
        editable: false,
        headerStyle: {
          backgroundColor: week === 'first' ? '#007bff' : '#6c757d',
        },
      },
      {
        dataField: 'action',
        text: 'Дія',
        headerAlign: 'center',
        editable: false,
        headerStyle: {
          backgroundColor: week === 'first' ? '#007bff' : '#6c757d',
        },
      },
    ];

    return (
      <>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          cellEdit={cellEditFactory({ mode: 'click' })}
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
          {WorkTable(props.data.data.firstweek, 'first')}
          <p>Другий тиждень: </p>
          {WorkTable(props.data.data.secondweek, 'second')}

          <p>Можливі варіанти (перший тиждень): </p>
          {WorkTable(props.data.data.firstweek_maybe, 'first', true)}
          <p>Можливі варіанти (другий тиждень): </p>
          {WorkTable(props.data.data.secondweek_maybe, 'second', true)}
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
