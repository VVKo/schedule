import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledNavbar } from '../../Styled/StyledComponents';
import GuestPanel from '../Dashboard/GuestPanel';
import RozkladContext from '../../../context/RozkladContext';

const CHeader = ({ text }) => {
  const { getUser } = useContext(RozkladContext);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <StyledNavbar>
        <a href="#">
          <h1 className="header"> {text} </h1>
        </a>
        <GuestPanel />
      </StyledNavbar>
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
