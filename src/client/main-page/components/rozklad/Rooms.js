import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import CardOfLesson from './CardOfLesson';

const Rooms = props => {
  const fullDATA = props.fulldata;

  const getPara = idx => {
    return fullDATA
      .filter(r => r[idx] === props.room)
      .map(r => {
        const rez = {};
        rez.row = r[0] + 1;
        rez.col = idx;
        rez.group = r[2];
        rez.name = r[1];
        rez.type = r[3];
        rez.prepod = r[5];
        rez.aud = r[idx];
        return rez;
      });
  };

  const para = numb => {
    return {
      id: numb,
      Mon: (
        <CardOfLesson
          firstweek={getPara(9 + 2 * (numb - 1))}
          secondweek={getPara(9 + 2 * (numb - 1) + 1)}
        />
      ), // day(9 + 2 * (numb - 1)),
      Tue: (
        <CardOfLesson
          firstweek={getPara(25 + 2 * (numb - 1))}
          secondweek={getPara(25 + 2 * (numb - 1) + 1)}
        />
      ), // day(25 + 2 * (numb - 1)),
      Wed: (
        <CardOfLesson
          firstweek={getPara(41 + 2 * (numb - 1))}
          secondweek={getPara(41 + 2 * (numb - 1) + 1)}
        />
      ), // day(41 + 2 * (numb - 1)),
      Thu: (
        <CardOfLesson
          firstweek={getPara(57 + 2 * (numb - 1))}
          secondweek={getPara(57 + 2 * (numb - 1) + 1)}
        />
      ), // day(57 + 2 * (numb - 1)),
      Fri: (
        <CardOfLesson
          firstweek={getPara(73 + 2 * (numb - 1))}
          secondweek={getPara(73 + 2 * (numb - 1) + 1)}
        />
      ), // day(73 + 2 * (numb - 1)),
    };
  };

  const [products, setProducts] = useState([
    para(1),
    para(2),
    para(3),
    para(4),
    para(5),
    para(6),
    para(7),
    para(8),
  ]);

  const CaptionElement = () => (
    <h3
      style={{
        borderRadius: '0.25em',
        textAlign: 'center',
        color: 'purple',
        border: '1px solid purple',
        padding: '0.5em',
      }}
    >
      {props.room}
    </h3>
  );

  const columns = [
    {
      dataField: 'id',
      text: '#',
      headerStyle: (colum, colIndex) => {
        return { width: '40px', textAlign: 'center' };
      },
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        width: '40px',
      },
    },
    {
      dataField: 'Mon',
      text: 'Понеділок',
      headerAlign: 'center',
      align: 'center',
    },
    {
      dataField: 'Tue',
      text: 'Вівторок',
      headerAlign: 'center',
      align: 'center',
    },
    {
      dataField: 'Wed',
      text: 'Середа',
      headerAlign: 'center',
      align: 'center',
    },
    {
      dataField: 'Thu',
      text: 'Четвер',
      headerAlign: 'center',
      align: 'center',
    },
    {
      dataField: 'Fri',
      text: "П'ятниця",
      headerAlign: 'center',
      align: 'center',
    },
  ];

  return (
    <>
      <CaptionElement />
      <BootstrapTable
        wrapperClasses="responsive"
        keyField="id"
        data={products}
        columns={columns}
        striped
      />
    </>
  );
};

export default Rooms;
