import React, { useContext } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ForPrint from './PDFWorkShop/ForPrint';
import RozkladContext from '../../../../context/RozkladContext';
// Create styles

const StaffPrinter = () => {
  const { state } = useContext(RozkladContext);

  const { academicloadfond, currentSemester } = state;
  if (!academicloadfond) return null;
  return (
    <PDFDownloadLink
      document={<ForPrint fond={academicloadfond[currentSemester.name].data} />}
      fileName="somename.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Генерується документ ...' : 'Завантажити!'
      }
    </PDFDownloadLink>
  );
};

export default StaffPrinter;
