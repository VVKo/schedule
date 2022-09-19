import React, { useContext, useRef, useState } from 'react';
import RozkladContext from '../../../context/RozkladContext';
import { StyledBox, StyledButton } from '../../Styled/StyledComponents';
import Info from '../Pages/Info';

const GroupInfo = ({ gr, day, para, w }) => {
  const {
    data,
    workData,
    publicPanel,
    user,
    addAudToLocalData,
    teachersWeek,
    groupsWeek,
  } = useContext(RozkladContext);

  let currentState = [];

  groupsWeek[publicPanel.semester.name][gr][day][para][w]
    .map(
      o =>
        data[publicPanel.semester.name].data.filter(d => d.id == o.id)[0][
          'групаНавантаження'
        ]
    )
    .forEach(g => (currentState = [...currentState, ...g.split('+')]));
  // const currentStateList = currentState.filter(g => g.includes(gr));
  const busyGr = currentState.filter(g => g.includes(gr));
  // currentStateList.length === 0 ? [] : [`${gr}гр`, ...currentStateList];

  console.log('============АУДИТОРІЇ======', data[publicPanel.semester.name]['Аудиторії']);
  const [maybeAuds, setMaybeAuds] = useState([
    { audDetal: 'ONLINE' },
    ...data[publicPanel.semester.name]['Аудиторії'].filter(
      aud => aud.week[day][para][w].length === 0
    ),
    { audDetal: 'Вільні аудиторії' },
  ]);

  const [maybePrepods, setMaybePrepods] = useState([
    { викладач: 'Можливі викладачі' },
    ...Object.keys(teachersWeek[publicPanel.semester.name])
      .filter(
        prepod =>
          teachersWeek[publicPanel.semester.name][prepod][day][para][w].length === 0
      )
      .map(p => {
        return { викладач: `${p}` };
      }),
  ]);

  const getGrFromGrNavant = line => {
    return line.split('+').filter(g => g.includes(gr))[0];
  };

  const [freeDisc, setFreeDisc] = useState(() => {
    return busyGr.length > 0 && busyGr.indexOf(`${gr}гр`) === -1
      ? workData['Розклад групи']
          .filter(obj => obj['група'] === gr)[0]
          ['дисципліни'].filter(
            dis =>
              +dis['К-ть год/тижд'] - +dis['виставлено'] > 0 &&
              teachersWeek[publicPanel.semester.name][dis['викладач']][day][para][w]
                .length === 0 &&
              dis['групаНавантаження'] !== `${gr}гр` &&
              busyGr.indexOf(getGrFromGrNavant(dis['групаНавантаження'])) === -1
          )
      : busyGr.indexOf(`${gr}гр`) === -1
      ? workData['Розклад групи']
          .filter(obj => obj['група'] === gr)[0]
          ['дисципліни'].filter(
            dis =>
              +dis['К-ть год/тижд'] - +dis['виставлено'] > 0 &&
              teachersWeek[publicPanel.semester.name][dis['викладач']][day][para][w]
                .length === 0 &&
              busyGr.indexOf(getGrFromGrNavant(dis['групаНавантаження'])) === -1
          )
      : [];
  });

  const audRef = useRef();
  const prepodRef = useRef();

  // const info = workData['Групи'].filter(obj => obj['група'] === gr)[0][
  //   'дисципліни'
  // ];

  const handlerSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const fdata = {};
    for (const [name, value] of data) {
      fdata[name] = value;
    }

    if (fdata.maybe === 'Можливі дисципліни') return;

    const toserver = {
      id: fdata.maybe,
      aud: fdata.maybeaud,
      group: gr,
      day,
      para,
      w,
    };
    console.log(fdata, toserver);
    addAudToLocalData(toserver);
  };

  const hanlerChangeDisc = e => {
    const val = e.target.value;

    console.log('hanlerChangeDisc', val);

    if (val === 'Можливі дисципліни') {
      setMaybeAuds([
        { audDetal: 'ONLINE' },
        ...data[publicPanel.semester.name]['Аудиторії'].filter(
          aud => aud.week[day][para][w].length === 0
        ),
        { audDetal: 'Вільні аудиторії' },
      ]);
      audRef.current.disabled = true;
      return;
    }

    const audType =
      data[publicPanel.semester.name].data.filter(d => d.id == val)[0]['тип'] ===
      'Лаб.'
        ? 'Лаб.'
        : 'інші.';
    setMaybeAuds([
      { audDetal: 'ONLINE' },
      ...data[publicPanel.semester.name]['Аудиторії'].filter(
        aud => aud.week[day][para][w].length === 0 && aud['тип'] === audType
      ),
      { audDetal: 'Вільні аудиторії' },
    ]);

    audRef.current.disabled = false;

    setMaybePrepods([
      ...Object.keys(teachersWeek[publicPanel.semester.name])
        .filter(
          prepod =>
            teachersWeek[publicPanel.semester.name][prepod][day][para][w].length ===
            0
        )
        .map(p => {
          return { викладач: `${p}` };
        }),
      { викладач: 'немає викладачів' },
    ]);
  };

  return (
    <div>
      <Info info={{ gr, day, para, w }} />
      <form onSubmit={handlerSubmit}>
        <label htmlFor={'maybe'}> Можливі дисципліни</label>
        <StyledBox
          defaultValue={'Можливі дисципліни'}
          name="maybe"
          onChange={hanlerChangeDisc}
        >
          <option value="Можливі дисципліни">Можливі дисципліни</option>
          {freeDisc.map((obj, idx) => (
            <option key={idx} value={obj.id}>
              {`${obj['Назва дисципліни']}/${obj['групаНавантаження']}/${obj['тип']}/${obj['викладач']}`}
            </option>
          ))}
        </StyledBox>
        <label htmlFor={'maybeaud'}> Можливі аудиторії</label>
        <StyledBox
          defaultValue={'Вільні аудиторії'}
          name="maybeaud"
          ref={audRef}
          disabled={true}
        >
          {/* <option value="Вільні аудиторії">Вільні аудиторії</option> */}
          {maybeAuds.map((obj, idx) => (
            <option key={idx} value={`${obj.audDetal}`}>
              {`${obj.audDetal}`}
            </option>
          ))}
        </StyledBox>
        <label htmlFor={'maybeprepod'}> Можливі викладачі</label>
        <StyledBox
          defaultValue={maybePrepods[0]['викладач']}
          name="maybeprepod"
          ref={prepodRef}
          disabled={true}
          style={{display:"none"}}
        >
          {/* <option value="Можливі викладачі">Можливі викладачі</option> */}
          {maybePrepods.map((obj, idx) => (
            <option key={idx} value={`${obj.викладач}`}>
              {`${obj.викладач}`}
            </option>
          ))}
        </StyledBox>
        <label htmlFor="add">Додати</label>
        <StyledButton type="submit" id={'add'}>
          {' '}
          Додати{' '}
        </StyledButton>
      </form>
      {/* <div>Можливі дисципліни: {JSON.stringify(info)}</div> */}
      {/* <div>Можливі Аудиторії: {JSON.stringify(auds)}</div> */}
      {/* <div>{JSON.stringify(freePrepods)}</div> */}
    </div>
  );
};

export default GroupInfo;
