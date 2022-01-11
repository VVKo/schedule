import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';


import OnClickRozklad from '../helper/OnClickRozklad';

import PrettyCardOfLesson from './PrettyCardOfLesson';

const GroupRozklad = props => {
  const CLASSROOMS = { ...props.classrooms };

  const fullDATA = props.fulldata;

  const groupData = fullDATA.filter(r =>
    r[props.groups.indexOf(props.gr) !== -1 ? 2 : 5].includes(props.gr)
  );

  const [showOnClickRozklad, setShowOnClickRozklad] = useState({
    show: false,
    data: {
      day: '',
      para: 0,
      firstweek: [{ name: 'foo' }],
      secondweek: [{ name: 'boo' }],
      firstweek_maybe: [{ name: 'not complete' }],
      secondweek_maybe: [{ name: 'not complete' }],
    },
  });

  const handleClose = () => {
    setShowOnClickRozklad(prevState => {
      const rez = { ...prevState };
      rez.show = false;
      return rez;
    });
  };

  const isPrepodFree = (prepod, colNumber) => {
    return (
      fullDATA.filter(
        r => r[5].includes(prepod) && r[colNumber].toString() !== ''
      ).length === 0
    );
  };

  const isGroupFree = (group, colNumber) => {
    return (
      Math.max(
        group.split('+').map(g => {
          return fullDATA.filter(
            r => r[2].includes(g.slice(0, 3)) && r[colNumber].toString() !== ''
          ).length;
        })
      ) === 0
    );
  };

  const getFreeAud = (classroomtype, colNumber) => {
    const start =
      classroomtype === 'Лаб.' ? CLASSROOMS[classroomtype] : CLASSROOMS.інші;

    const busyAud = [
      ...new Set(
        fullDATA
          .filter(r => r[colNumber].toString() !== '')
          .map(ro => ro[colNumber])
      ),
    ];

    const diff = start.filter(x => !busyAud.includes(x));

    return diff.join(',');
  };

  const getPara = idx => {
    return groupData
      .filter(r => r[idx] !== '')
      .map(r => {
        const rez = {};
        rez.row = r[0] + 1;
        rez.col = idx;
        rez.group = r[2].split('+').filter(gr => gr.includes(props.gr));
        rez.name = r[1];
        rez.type = r[3];
        rez.prepod = r[5];
        rez.aud = r[idx];
        rez.maybeaud = getFreeAud(r[3], idx);
        return rez;
      });
  };

  const colNumber = (num, dday, week) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const weeks = ['firstweek', 'secondweek'];

    return 9 + 16 * days.indexOf(dday) + 2 * (num - 1) + weeks.indexOf(week);
  };

  const para = numb => {
    return {
      id: numb,
      Mon: (
        <PrettyCardOfLesson
          firstweek={getPara(9 + 2 * (numb - 1))}
          secondweek={getPara(9 + 2 * (numb - 1) + 1)}
        />
      ), // day(9 + 2 * (numb - 1)),
      Tue: (
        <PrettyCardOfLesson
          firstweek={getPara(25 + 2 * (numb - 1))}
          secondweek={getPara(25 + 2 * (numb - 1) + 1)}
        />
      ), // day(25 + 2 * (numb - 1)),
      Wed: (
        <PrettyCardOfLesson
          firstweek={getPara(41 + 2 * (numb - 1))}
          secondweek={getPara(41 + 2 * (numb - 1) + 1)}
        />
      ), // day(41 + 2 * (numb - 1)),
      Thu: (
        <PrettyCardOfLesson
          firstweek={getPara(57 + 2 * (numb - 1))}
          secondweek={getPara(57 + 2 * (numb - 1) + 1)}
        />
      ), // day(57 + 2 * (numb - 1)),
      Fri: (
        <PrettyCardOfLesson
          firstweek={getPara(73 + 2 * (numb - 1))}
          secondweek={getPara(73 + 2 * (numb - 1) + 1)}
        />
      ), // day(73 + 2 * (numb - 1)),
    };
  };

  const onClickTable = (e, column, columnIndex, row, rowIndex) => {
    setShowOnClickRozklad(prevState => {
      const rez = { ...prevState };
      rez.show = true;
      rez.data = { ...prevState.data };
      rez.data.day = column.text;
      rez.data.firstweek =
        row[column.dataField].props.firstweek.length === 0
          ? [{ name: 'Вікно' }]
          : row[column.dataField].props.firstweek;
      rez.data.secondweek =
        row[column.dataField].props.secondweek.length === 0
          ? [{ name: 'Вікно' }]
          : row[column.dataField].props.secondweek;
      rez.data.para = row.id;
      const num = row.id;
      const dayy = column.dataField;

      rez.data.firstweek_maybe = groupData
        .filter(
          r =>
            r[7] !== r[8] &&
            isPrepodFree(r[5], colNumber(num, dayy, 'firstweek'))
        )
        .filter(ro =>
          props.gr.length < 6
            ? true
            : isGroupFree(ro[2], colNumber(num, dayy, 'firstweek'))
        )
        .map(r => {
          const rez = {};
          rez.row = r[0] + 1;
          rez.col = colNumber(num, dayy, 'firstweek');
          rez.group =
            props.gr.length < 6
              ? r[2].split('+').filter(gr => gr.includes(props.gr))
              : r[2];
          rez.name = r[1];
          rez.type = r[3];
          rez.prepod = r[5];
          rez.aud = getFreeAud(r[3], colNumber(num, dayy, 'firstweek'));
          return rez;
        });

      rez.data.secondweek_maybe = groupData
        .filter(
          r =>
            r[7] !== r[8] &&
            isPrepodFree(r[5], colNumber(num, dayy, 'secondweek'))
        )
        .filter(ro =>
          props.gr.length < 6
            ? true
            : isGroupFree(ro[2], colNumber(num, dayy, 'secondweek'))
        )
        .map(r => {
          const rez = {};
          rez.row = r[0] + 1;
          rez.col = colNumber(num, dayy, 'secondweek');
          rez.group =
            props.gr.length < 6
              ? r[2].split('+').filter(gr => gr.includes(props.gr))
              : r[2];
          rez.name = r[1];
          rez.type = r[3];
          rez.prepod = r[5];
          rez.aud = getFreeAud(r[3], colNumber(num, dayy, 'secondweek'));
          return rez;
        });

      return rez;
    });
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
  useEffect(() => {
    setShowOnClickRozklad(showOnClickRozklad);
    setProducts(prevState => {
      return prevState;
    });
  }, [showOnClickRozklad]);
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
      events: {
        onClick: onClickTable,
      },
    },
    {
      dataField: 'Tue',
      text: 'Вівторок',
      headerAlign: 'center',
      align: 'center',
      events: {
        onClick: onClickTable,
      },
    },
    {
      dataField: 'Wed',
      text: 'Середа',
      headerAlign: 'center',
      align: 'center',
      events: {
        onClick: onClickTable,
      },
    },
    {
      dataField: 'Thu',
      text: 'Четвер',
      headerAlign: 'center',
      align: 'center',
      events: {
        onClick: onClickTable,
      },
    },
    {
      dataField: 'Fri',
      text: "П'ятниця",
      headerAlign: 'center',
      align: 'center',
      events: {
        onClick: onClickTable,
      },
    },
  ];

  const CaptionElement = data => (
    <h3
      style={{
        borderRadius: '0.25em',
        textAlign: 'center',
        color: 'purple',
        border: '1px solid purple',
        padding: '0.5em',
      }}
    >
      {data.text}
    </h3>
  );

  useEffect(() => {
    setShowOnClickRozklad(prevState => {
      const tmp = { ...prevState };
      tmp.show = false;
      return prevState;
    });

    setProducts([
      para(1),
      para(2),
      para(3),
      para(4),
      para(5),
      para(6),
      para(7),
      para(8),
    ]);

    console.log('props.fulldata was changed ');
  }, [props.fulldata]);

  useEffect(() => {
    console.log('fififififif');
    setProducts(prevState => {
      return prevState;
    });
  }, [products]);

  // const generatePDF = () => {
  //   const doc = new jsPDF('p', 'pt');
  //
  //   doc.text(20, 20, 'This is the first title.');
  //
  //   doc.setFont('helvetica');
  //   doc.setFontType('normal');
  //   doc.text(20, 60, 'This is the second title.');
  //
  //   doc.setFont('helvetica');
  //   doc.setFontType('normal');
  //   doc.text(20, 100, 'This is the thrid title.');
  //
  //   doc.save('demo.pdf');
  // };

  return (
    <>
      <CaptionElement text={props.gr} />
      {/* <Form.Group as={Row} controlId="formGridState"> */}
      {/*  <Form.Label>Виберіть пару</Form.Label> */}
      {/*  <Form.Control */}
      {/*    id={'para-select'} */}
      {/*    as="select" */}
      {/*    defaultValue="ALL" */}
      {/*    onChange={e => { */}
      {/*      e.target.value === 'ALL' */}
      {/*        ? setProducts([ */}
      {/*            para(1), */}
      {/*            para(2), */}
      {/*            para(3), */}
      {/*            para(4), */}
      {/*            para(5), */}
      {/*            para(6), */}
      {/*            para(7), */}
      {/*            para(8), */}
      {/*          ]) */}
      {/*        : setProducts([para(Number(e.target.value.slice(0, 1)))]); */}
      {/*    }} */}
      {/*  > */}
      {/*    <option>ALL</option> */}
      {/*    {['1п.', '2п.', '3п.', '4п.', '5п.', '6п.', '7п.', '8п.'].map(o => { */}
      {/*      return ( */}
      {/*        <> */}
      {/*          <option>{o}</option> */}
      {/*        </> */}
      {/*      ); */}
      {/*    })} */}
      {/*  </Form.Control> */}
      {/*  <Form.Label>Виберіть день</Form.Label> */}
      {/*  <Form.Control */}
      {/*    id={'day-select'} */}
      {/*    as="select" */}
      {/*    defaultValue="WEEK" */}
      {/*    onChange={e => handleChangeDay(e)} */}
      {/*  > */}
      {/*    <option>WEEK</option> */}
      {/*    {['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця"].map(o => { */}
      {/*      return ( */}
      {/*        <> */}
      {/*          <option>{o}</option> */}
      {/*        </> */}
      {/*      ); */}
      {/*    })} */}
      {/*  </Form.Control> */}
      {/* </Form.Group> */}
      <BootstrapTable
        wrapperClasses="responsive"
        keyField="id"
        data={products}
        columns={columns}
        striped
      />

      {props.role === 'Супер адмін' ? (
        <>
          <OnClickRozklad
            data={showOnClickRozklad}
            updateData={props.updateData}
            close={handleClose}
            client={props.gr}
            workTable={props.workTable}
          />

          {/*<div>*/}
          {/*  <button onClick={generatePDF} type="primary">*/}
          {/*    Download PDF*/}
          {/*  </button>*/}
          {/*</div>*/}
        </>
      ) : null}
    </>
  );
};

export default GroupRozklad;
