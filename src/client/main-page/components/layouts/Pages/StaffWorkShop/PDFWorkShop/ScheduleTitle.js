import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  titleContainer: {

    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  reportTitle: {
    fontSize: '36pt',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    margin: 0,
  },
});

const ScheduleTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.reportTitle}>Розклад</Text>
    </View>
  );
};

export default ScheduleTitle;
