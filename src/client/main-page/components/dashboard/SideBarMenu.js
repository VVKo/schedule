import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Col,
  Form,
  Navbar,
} from 'react-bootstrap';

import Nav from 'react-bootstrap/Nav';

const SideBarMenu = props => {

  const history = useHistory();

  useEffect(() => {}, [props.showsidebar]);

  const side = show => {
    const obj = [
      ...new Set(
        props.state.state.data
          .map(r => r[1].split('+'))
          .join(',')
          .split(',')
          .map(r => r.split('гр')[0])
      ),
    ]
      .sort()
      .filter(r => r !== '');

    const rooms = new Set();

    props.state.state.data.slice(6).map(r =>
      r
        .slice(8)
        .filter(ro => ro.toString() !== '')
        .forEach(aud => rooms.add(aud))
    );

    const allrooms = [...rooms].sort().filter(r => r !== '');

    const teachers = [
      ...new Set(props.state.state.data.slice(5).map(r => r[4].trim())),
    ]
      .sort()
      .filter(r => r !== '');
    return (
      <>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Виберіть групу</Form.Label>
          <Form.Control
            as="select"
            defaultValue="ІНСТРУКЦІЯ"
            onChange={e => {
              console.log('ГРУПА', e.target.value);
              e.target.value !== 'ІНСТРУКЦІЯ'
                ? history.push(`/groups/${e.target.value}`)
                : history.push(`/`);
            }}
            onClick={e => {
              console.log('ГРУПА КЛІК', e.target.value);
              e.target.value !== 'ІНСТРУКЦІЯ'
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
              e.target.value !== 'ІНСТРУКЦІЯ'
                ? history.push(`/teachers/${e.target.value}`)
                : history.push(`/`);
            }}
            onClick={e => {
              e.target.value !== 'ІНСТРУКЦІЯ'
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

          <Form.Label>Задіяність аудиторій </Form.Label>
          <Form.Control
            as="select"
            defaultValue="ІНСТРУКЦІЯ"
            onChange={e => {
              e.target.value !== 'ІНСТРУКЦІЯ'
                ? history.push(
                    `/rooms/${e.target.value
                      .replace(' ', '-')
                      .replace('.', '')
                      .replace('(', '-')
                      .replace(')', '-')}`
                  )
                : history.push(`/`);
            }}
            onClick={e => {
              e.target.value !== 'ІНСТРУКЦІЯ'
                ? history.push(
                    `/rooms/${e.target.value
                      .replace(' ', '-')
                      .replace('.', '')
                      .replace('(', '-')
                      .replace(')', '-')}`
                  )
                : history.push(`/`);
            }}
          >
            <option>ІНСТРУКЦІЯ</option>
            {allrooms.map(o => {
              return (
                <>
                  <option>{o}</option>
                </>
              );
            })}
          </Form.Control>
        </Form.Group>
      </>
    );
  };

  return (
    <>
      <Navbar
        id={'responsive-navbar-nav'}
        className={'col-md-3 col-lg-2 d-md-block sidebar'}
        expand=""
        bg={'light'}
        bsPrefix={''}
      >
        <Nav className={'flex-column'}>{side(props)}</Nav>
      </Navbar>
    </>
  );
};

export default SideBarMenu;
