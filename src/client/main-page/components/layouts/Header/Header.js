import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledNavbar } from '../../Styled/StyledComponents';
import GuestPanel from '../Dashboard/GuestPanel';
import RozkladContext from '../../../context/RozkladContext';
import {Navbar} from "react-bootstrap";

const CHeader = ({ text }) => {
  const { getUser } = useContext(RozkladContext);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Navbar bg={'light'} expand={false} className="mb-3">
        {/* <StyledNavbar> */}
        {/*<a href="#">*/}
        {/*  <h1 className="header"> {text} </h1>*/}
        {/*</a>*/}
        <GuestPanel />
        {/* </StyledNavbar> */}
      </Navbar>
    </>
  );
};

CHeader.defaultProps = {
  text: 'РОЗКЛАД',
};

CHeader.propTypes = {
  text: PropTypes.string,
};

export default CHeader;
