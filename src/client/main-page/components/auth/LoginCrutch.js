import React, { useState } from 'react';
import {
  Button,
  Container,
  DropdownButton,
  Dropdown,
  Form,
  Spinner,
} from 'react-bootstrap';
import DemoMainField from '../demo/DemoMainField';
import server from '../../../utils/server';

const { serverFunctions } = server;

const LoginCrutch = props => {
  const [isLoading, setLoading] = useState(props.login.state.isLogined);

  const listOfStructs = props.login.state.state.list;

  const handleClick = () => {
    const pidrozdil = document.getElementById('pidrozdil').value;

    setLoading(true);
    serverFunctions
      .getDataForPidrozdil(pidrozdil)
      .then(res => {
        props.login.state.logIn({
          ...res,
        });
        props.login.getShowSide('');
        setLoading(false);
      })
      .catch(alert);
  };

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <Container>
        {!isLoading ? (
          <Container>
            {props.login.state.state.accessToken !== '' ? (
              <DemoMainField />
            ) : null}

            <Form.Group>
              <Form.Label>Оберіть структурний підрозділ ...</Form.Label>
              <Form.Control as="select" size="lg" id="pidrozdil">
                {listOfStructs.map(pidr => {
                  return (
                    <>
                      <option as="select" id={`${pidr[1]}`}>
                        {pidr[0]}
                      </option>
                    </>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Button
              variant="primary"
              disabled={isLoading}
              onClick={!isLoading ? handleClick : null}
            >
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                'до розкладу'
              )}
            </Button>
          </Container>
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </Container>
    </main>
  );
};

export default LoginCrutch;
