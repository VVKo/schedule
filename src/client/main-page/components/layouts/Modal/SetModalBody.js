import React, { useContext } from 'react';
import RozkladContext from '../../../context/RozkladContext';

const SetModalBody = () => {
  const { dataForModal } = useContext(RozkladContext);
  return (
    dataForModal.body.func !== '' &&
    dataForModal.body.func({
      ...dataForModal.body.data,
    })
  );
};

export default SetModalBody;
