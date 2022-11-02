import React from 'react';
import FineScheduleNew from '../../Schedule/FineScheduleNew';

const StaffPreviewGroup = () => {
  return (
    <>
      <FineScheduleNew weekNumber="1" />

      <hr />
      <FineScheduleNew weekNumber="2" />
    </>
  );
};

export default StaffPreviewGroup;
