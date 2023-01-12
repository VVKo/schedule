import React, { useContext } from 'react';
import RozkladContext from '../../../context/RozkladContext';

const SetModalBody = () => {
  const { state } = useContext(RozkladContext);
  const { dataForModal } = state;
  return (
    dataForModal.body.func !== '' &&
    dataForModal.body.func({
      ...dataForModal.body.data,
    })
  );
};

export default SetModalBody;
