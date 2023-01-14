import React, { useContext } from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

import RozkladContext from '../../../../../context/RozkladContext';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const FullDay = {
  Mon: { day: 'Понеділок', backgr: '#ffc', cn: 'monday' },
  Tue: { day: 'Вівторок', backgr: '#cfc', cn: 'tuesday' },
  Wed: { day: 'Середа', backgr: '#ccf', cn: 'wednesday' },
  Thu: { day: 'Четвер', backgr: '#faa', cn: 'thursday' },
  Fri: { day: "П'ятниця", backgr: '#fff', cn: 'friday' },
};
const styles = StyleSheet.create({
  week: {
    display: 'flex',
    flexDirection: 'row',
    // gridGap: '1px 1px',
    // gridTemplateRows: '40px repeat(6, 1fr)',
    // gridTemplateColumns: '50px 75px repeat(5, 1fr)',
    borderWidth: '1px',
  },
  weeknumber: {
    // gridRowStart: '1',
    // gridRowEnd: '10',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'antiquewhite',
    borderWidth: '1px',
    borderColor: '#aaa',
    borderRadius: '3px',
    fontSize: 14,
  },
  paralist: {
    // gridRowStart: 1,
    // gridRowEnd: 10,
    // gridColumnStart: 2,
    // gridColumnEnd: 3,
    display: 'flex',
    flexDirection: 'column',
    // gridGap: '1px 1px',
    // gridTemplateRows: '40px repeat(6, 1fr)',
  },
  paraitem: {
    display: 'flex',
    borderColor: '#000',
    borderWidth: '1px',
    borderRadius: '3px',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '2cm',
  },
  dayName: {
    fontWeight: 'bold',
    fontSize: '16pt',
  },
  first: {
    borderColor: '#000',
    borderWidth: '1px',
    borderRadius: '3px',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '2cm',
    width: '2cm',
  },
  dayWidth: {
    borderColor: '#000',
    borderWidth: '1px',
    borderRadius: '3px',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: '10cm',
    minHeight: '2cm',
  },
});
const ScheduleClassicPdf = ({ fond, groups, day }) => {
  const RowDay = () => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={styles.first}>
          <Text>Група</Text>
        </View>
        {groups.map(gr => {
          return (
            <View key={gr} style={styles.dayWidth}>
              <Text>{gr}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  const Content = ({ para, week, group }) => {
    const d = DAYS.indexOf(day);
    const w = week === '1т.' ? 0 : 1;
    const p = +para - 1;
    const col = 8 + 16 * d + 2 * p + w;
    const arr = fond
      .map((r, idx) => [idx + 4, ...r])
      .filter(r => r[2].includes(`${group}гр`))
      .filter(r => r[col + 1] !== '')
      .map(r => {
        return {
          disc: r[1],
          група: r[2],
          тип: r[3],
          викладач: r[5],
          'місце проведення': r[col + 1],
        };
      });
    return (
      <View style={{ display: 'flex', flexDirection: 'row', fontSize: '10pt' }}>
        {/* {arr.length === 0 && <Text>Вікно</Text>} */}
        {arr.map((o, idx) => (
          <View
            key={idx}
            style={{
              borderWidth: 1,
              padding: 0,
              width: `${10 / arr.length}cm`,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{o.disc}</Text>
            <Text>{o.тип}</Text>
            <Text>{o.група}</Text>
            <Text>{o.викладач}</Text>
            <Text>
              {o['місце проведення'] === 'ONLINE'
                ? o['місце проведення']
                : o['місце проведення'].split(' -- ')[0]}
            </Text>
          </View>
        ))}
      </View>
    );
  };
  const RowPara = ({ para, week }) => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={styles.first}>
          <Text>{para} п.</Text>
        </View>
        {groups.map(group => {
          return (
            <View key={group} style={styles.dayWidth}>
              <Content para={para} week={week} group={group} />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'rotate(-90deg)',
        }}
      >
        <Text style={{fontWeight: "bold", fontSize: '20pt'}}>{FullDay[day].day}</Text>
      </View>

      <View style={{ flexDirection: 'column' }}>
        {['1т.', '2т.'].map(week => {
          return (
            <View key={week} style={styles.week}>
              <View style={styles.weeknumber}>
                <Text>{week}</Text>
              </View>
              <View style={{ flexDirection: 'column' }}>
                {week === '1т.' && <RowDay />}
                {[1, 2, 3, 4, 5, 6].map(para => {
                  return <RowPara key={para} para={para} week={week} />;
                })}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ScheduleClassicPdf;
