import React, { useState } from "react";
import { Button, Container, Jumbotron, Spinner } from "react-bootstrap";
import DemoMainField from "../demo/DemoMainField";
import server from "../../../utils/server";

const { serverFunctions } = server;

const LoginCrutch = props => {
  const [isLoading, setLoading] = useState(props.login.state.isLogined);

  const handleClick = () => {
    setLoading(true);
    serverFunctions
      .getUserForRozklad()
      .then(res => {
        console.log("getUserForRozklad", res);
        props.login.state.logIn({
          ...res
        });
        props.login.getShowSide("");
        setLoading(false);
      })
      .catch(alert);
  };

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <Container>
        {!isLoading ? (
          <Jumbotron>
            {props.login.state.state.accessToken !== "" ? (
              <DemoMainField />
            ) : null}
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
                "до розкладу"
              )}
            </Button>
          </Jumbotron>
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
