import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end',
      borderWidth: 1,
      borderColor: '#bff0fd',
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize: 12,
  },
  label: {
    width: 200,
    borderWidth: 2,
    borderColor: '#bf0000',
  },
});
const ScheduleHeader = () => {
  const now = new Date();
  return (
    <>
      <View style={styles.invoiceNoContainer}>
        <Text style={styles.label}>Затверджено: </Text>
        <Text>Бла-бла-бла</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>Дата: </Text>
        <Text>{now.toLocaleString()}</Text>
      </View>
    </>
  );
};

export default ScheduleHeader;
