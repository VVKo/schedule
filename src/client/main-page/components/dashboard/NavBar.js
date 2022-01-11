import React, { useState } from 'react';
import { Button, Navbar } from 'react-bootstrap';

const NavBar = props => {
  console.log('Logout', props);

  const [isLoading, setLoading] = useState(props.state.isLogined);

  const handleClick = () => {
    props.logOut({
      isLogined: false,
      accessToken: '',
      email: '',
      name: '',
      role: 'guest',
      data: [],
      list: [],
    });
  };

  return (
    <Navbar
      expand="sm"
      bg="dark"
      variant={'dark'}
      sticky={'top'}
      className={'p-0 shadow'}
    >
      <Navbar.Brand
        href="http://college-chnu.cv.ua/"
        className="col-md-3 col-lg-2 mr-0 px-3"
      >
        РОЗКЛАД
      </Navbar.Brand>
      <Navbar.Toggle data-target={'#sidebarMenu'} />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className={'px-3'}>
          Signed in as: {props.state.role}
          <a href="#login" className={'px-3'}>
            {props.state.isLogined ? props.state.email : 'Гість'}
          </a>
        </Navbar.Text>
        {props.state.isLogined ? (
          <Navbar.Text className={'px-3'}>
            <Button
              variant="primary"
              disabled={!isLoading}
              onClick={isLoading ? handleClick : null}
            >
              Вийти
            </Button>
          </Navbar.Text>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
