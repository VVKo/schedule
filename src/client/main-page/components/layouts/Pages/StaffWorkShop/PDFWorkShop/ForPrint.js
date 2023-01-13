import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import ScheduleTitle from './ScheduleTitle';
import ScheduleHeader from './ScheduleHeader';
import ScheduleWeekPdf from './ScheduleWeekPDF';
import ScheduleClassicPdf from "./ScheduleClassicPDF";

const FullDay = {
  Mon: { day: 'Понеділок', backgr: '#ffc' },
  Tue: { day: 'Вівторок', backgr: '#cfc' },
  Wed: { day: 'Середа', backgr: '#ccf' },
  Thu: { day: 'Четвер', backgr: '#faa' },
  Fri: { day: "П'ятниця", backgr: '#fff' },
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
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
const ForPrint = ({ fond }) => {
  return (
    <Document>
      {DAYS.map(day => {
        return (
          <Page
            key={day}
            size={'A2'}
            orientation={'landscape'}
            style={styles.page}
          >
            {/* <ScheduleTitle /> */}
            {/* <ScheduleHeader /> */}
            {/*<ScheduleWeekPdf fond={fond} />*/}
            <ScheduleClassicPdf fond={fond} groups={['11-ПМ','11-КІ','12-КІ','11-КН','12-КН']} day={day}/>
          </Page>
        );
      })}
    </Document>
  );
};

export default ForPrint;
