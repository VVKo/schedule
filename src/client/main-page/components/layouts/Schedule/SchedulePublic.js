import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import {
  Document,
  Font,
  Page,
  PDFDownloadLink,
  StyleSheet,
} from '@react-pdf/renderer';
import { ImFilePdf } from 'react-icons/im';
import RozkladContext from '../../../context/RozkladContext';
import ScheduleSingleGroup from '../Pages/StaffWorkShop/PDFWorkShop/ScheduleSingleGroup';
import SheduleWeekPublicGroup from './SheduleWeekPublicGoup';
import { StaffMainSTYLED } from '../../Styled/StaffWorkShop/STYLED';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/modern/theme-material/resources/fonts/roboto/Roboto-Regular.ttf',
    },
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/modern/theme-material/resources/fonts/roboto/Roboto-Bold.ttf',
      fontWeight: 'bold',
    },
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/modern/theme-material/resources/fonts/roboto/Roboto-Italic.ttf',
      fontStyle: 'italic',
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: '10pt',
    paddingTop: '10mm',
    paddingLeft: '10mm',
    paddingRight: '10mm',
    flexDirection: 'column',
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
const SchedulePublic = () => {
  const { state } = useContext(RozkladContext);

  const {
    currentSemester,
    user,
    currentGroup,
    currentTeacher,
    academicloadfond,
    disciplinefond,
  } = state;


  if (
    user.role === 'staff' ||
    !academicloadfond ||
    !disciplinefond ||
    (typeof currentSemester === 'undefined' &&
      typeof currentTeacher === 'undefined')
  )
    return null;

  if (
    currentGroup === 'Виберіть групу' &&
    currentTeacher === 'Виберіть викладача'
  )
    return null;


  console.log('currentTeacher', currentTeacher, 'currentGroup', currentGroup);

  const forPRINT = {};
  disciplinefond[currentSemester.name].data.forEach(r => {
    forPRINT[r[0]] = r[1] === '' ? r[0] : r[1];
  });

  return (
    <>
      <div>
        <Container>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3 className="h3">{currentGroup === 'Виберіть групу' ? currentTeacher : currentGroup}</h3>
            <PDFDownloadLink
              document={
                <Document>
                  <Page
                    size={'A2'}
                    orientation={'landscape'}
                    style={styles.page}
                  >
                    <ScheduleSingleGroup
                      fond={academicloadfond[currentSemester.name].data}
                      forPRINT={forPRINT}
                      state={state}
                    />
                  </Page>
                </Document>
              }
              fileName={`${currentGroup === 'Виберіть групу' ? currentTeacher : currentGroup}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  `Генерується документ ${currentGroup === 'Виберіть групу' ? currentTeacher : currentGroup}.pdf`
                ) : (
                  <ImFilePdf size={32} />
                )
              }
            </PDFDownloadLink>
          </div>
        </Container>
      </div>
      <div>
        <Container>
          <SheduleWeekPublicGroup wn={'НТ'} />
        </Container>
      </div>
      <div>
        <Container>
          <SheduleWeekPublicGroup wn={'ПТ'} />
        </Container>
      </div>
    </>
  );
};

export default SchedulePublic;
