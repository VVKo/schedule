import React, { useContext } from 'react';
import { ImFloppyDisk } from 'react-icons/im';
import { FaShare } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  ShareButtonServer,
  StyledNavbar,
  UpdateButtonServer,
} from '../../Styled/StyledComponents';
import GuestPanel from '../Dashboard/GuestPanel';
import RozkladContext from '../../../context/RozkladContext';

const CHeader = ({ text }) => {
  const { data, saveToServer, change } = useContext(RozkladContext);
  return (
    <>
      <StyledNavbar>
        <a href="#">
          <h1 className="header"> {text} </h1>
          <UpdateButtonServer onClick={saveToServer} change={change}>
            <ImFloppyDisk />
          </UpdateButtonServer>
          <ShareButtonServer>
            <FaShare />
          </ShareButtonServer>
        </a>
        {data && <GuestPanel />}
        {/* <UpdateButtonServer onClick={saveToServer} change={change}> */}
        {/*  Зберегти дані на сервері */}
        {/* </UpdateButtonServer> */}

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
