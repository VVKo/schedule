import React from 'react';
import {Font, StyleSheet, Text, View} from '@react-pdf/renderer';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const FullDay = {
  Mon: { day: 'Понеділок', backgr: '#ffc', cn: 'monday' },
  Tue: { day: 'Вівторок', backgr: '#cfc', cn: 'tuesday' },
  Wed: { day: 'Середа', backgr: '#ccf', cn: 'wednesday' },
  Thu: { day: 'Четвер', backgr: '#faa', cn: 'thursday' },
  Fri: { day: "П'ятниця", backgr: '#fff', cn: 'friday' },
};

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
const ScheduleSingle = ({ fond, forPRINT, teacher }) => {
  const RowDay = () => {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={styles.first}>
          <Text>Група</Text>
        </View>
        <View style={styles.dayWidth}>
          <Text>Понеділок</Text>
        </View>
        <View style={styles.dayWidth}>
          <Text>Вівторок</Text>
        </View>
        <View style={styles.dayWidth}>
          <Text>Середа</Text>
        </View>
        <View style={styles.dayWidth}>
          <Text>Четвер</Text>
        </View>
        <View style={styles.dayWidth}>
          <Text>П`ятниця</Text>
        </View>
      </View>
    );
  };

  const Content = ({ para, week, day }) => {
    const d = DAYS.indexOf(day);
    const w = week === '1т.' ? 0 : 1;
    const p = +para - 1;
    const col = 8 + 16 * d + 2 * p + w;
    const arr = fond
      .map((r, idx) => [idx + 4, ...r])
      .filter(r => r[5] === teacher)
      .filter(r => r[col + 1] !== '')
      .map(r => {
        return {
          disc: forPRINT[r[1]],
          група: r[2],
          тип: r[3],
          'місце проведення': r[col + 1],
        };
      });
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          fontSize: '10pt',
          alignContent: 'stretch',
        }}
      >
        {/* {arr.length === 0 && <Text>Вікно</Text>} */}
        {arr.map((o, idx) => (
          <View
            key={idx}
            style={{
              padding: 0,
              width: `${10 / arr.length}cm`,
              alignItems: 'center',
              borderLeftWidth: 1,
              borderRightWidth: 1,
              // alignContent: 'stretch',
              alignSelf: 'stretch',
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{o.disc}</Text>
            <Text>{o.тип}</Text>
            <Text>{o.група}</Text>
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
        {DAYS.map(day => {
          return (
            <View key={day} style={styles.dayWidth}>
              <Content para={para} week={week} day={day} />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <>
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
    </>
  );
};

export default ScheduleSingle;
