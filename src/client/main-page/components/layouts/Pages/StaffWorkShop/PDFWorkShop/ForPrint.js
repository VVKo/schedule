import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import ScheduleTitle from './ScheduleTitle';
import ScheduleHeader from './ScheduleHeader';
import ScheduleWeekPdf from './ScheduleWeekPDF';
import ScheduleClassicPdf from './ScheduleClassicPDF';

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
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/modern/theme-material/resources/fonts/roboto/Roboto-Italic.ttf',
      fontStyle: 'italic',
    }
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
const ForPrint = ({ fond, forPRINT, groups, days }) => {
  // const groups = [
  //   ...new Set([
  //     ...fond
  //       .map(r => r[1])
  //       .join('+')
  //       .split('+')
  //       .map(r => r.split('гр')[0]),
  //   ]),
  // ].sort();

  const chunkArr = groups.reduce(
    (r, e, i) => (r[Math.trunc(i / 5)].push(e), r),
    [...Array(Math.trunc(groups.length / 5) + 1)].map(_ => [])
  );

  console.log('groups', chunkArr);

  return (
    <Document>
      {chunkArr.map(grps => {
        return days.map(day => {
          return (
            <Page
              key={`${grps[0]}${day}`}
              size={'A2'}
              orientation={'landscape'}
              style={styles.page}
            >
              {/* <ScheduleTitle /> */}
              {/* <ScheduleHeader /> */}
              {/* <ScheduleWeekPdf fond={fond} /> */}
              <ScheduleClassicPdf
                fond={fond}
                groups={grps}
                day={day}
                forPRINT={forPRINT}
              />
            </Page>
          );
        });
      })}
    </Document>
  );
};

export default ForPrint;
