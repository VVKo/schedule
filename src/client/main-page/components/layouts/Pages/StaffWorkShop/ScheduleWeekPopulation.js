import React, { useContext } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { FiEye } from 'react-icons/fi';
import RozkladContext from '../../../../context/RozkladContext';
import { Week } from '../../../Styled/StaffWorkShop/STYLED';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const FullDay = {
  Mon: { day: 'Понеділок', backgr: '#ffc', cn: 'monday' },
  Tue: { day: 'Вівторок', backgr: '#cfc', cn: 'tuesday' },
  Wed: { day: 'Середа', backgr: '#ccf', cn: 'wednesday' },
  Thu: { day: 'Четвер', backgr: '#faa', cn: 'thursday' },
  Fri: { day: "П'ятниця", backgr: '#fff', cn: 'friday' },
};
const ScheduleWeekPopulation = ({ wn, korpus }) => {
  const { state } = useContext(RozkladContext);
  const { academicloadfond, currentSemester, groupfond } = state;

  if (!academicloadfond) return null;

  const population = groupfond[currentSemester.name].data.map(r =>
    r[3].split(' -- ')
  );

  const TriggerExample = ({ arr }) => {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Інфо</Popover.Header>
        <Popover.Body>
          {arr.map((obj, idx) => {
            return (
              <React.Fragment key={idx}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {/* <div>{obj.disc}</div> */}
                  <div>{obj.група}</div>
                  {/* <div>{obj.тип}</div> */}
                  <div>{obj.викладач}</div>
                  <div style={{ fontWeight: 'bold' }}>{obj['к-ть']}</div>
                </div>
              </React.Fragment>
            );
          })}
        </Popover.Body>
      </Popover>
    );

    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 1500 }}
        overlay={popover}
      >
        <Button variant="success">
          <FiEye />
          {arr
            .map(r => +r['к-ть'])
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            )}
        </Button>
      </OverlayTrigger>
    );
  };
  const Para = ({ para, week, day }) => {
    const d = DAYS.indexOf(day);
    const w = week === '1т.' ? 0 : 1;
    const p = +para - 1;
    const col = 8 + 16 * d + 2 * p + w;

    const arr = academicloadfond[currentSemester.name].data
      .map((r, idx) => [idx + 4, ...r])
      .filter(r => r[col + 1].includes(korpus))
      .map(r => {
        return {
          disc: r[1],
          група: r[2],
          тип: r[3],
          викладач: r[5],
          'к-ть': population.filter(rr => rr[0] === r[2])[0][1],
        };
      });

    return (
      <>
        {/* {arr.map((o, idx) => ( */}
        {/*  <TriggerExample key={idx} obj={o} /> */}
        {/* ))} */}

        <TriggerExample arr={arr} />
      </>
    );
  };

  return (
    <>
      <Week>
        <div className={'weeknumber'}>{wn === 'НТ' ? '1т.' : '2т.'}</div>
        <div className={'paralist'}>
          <div
            className={`text-light ${
              wn === 'НТ' ? 'bg-primary ' : 'bg-secondary '
            }`}
          ></div>
          <div>1п</div>
          <div>2п</div>
          <div>3п</div>
          <div>4п</div>
          <div>5п</div>
          <div>6п</div>
        </div>
        {[0, 1, 2, 3, 4].map(daynumber => {
          return (
            <div
              key={`${daynumber}day`}
              className={FullDay[DAYS[daynumber]].cn}
            >
              <div
                className={`dayname text-light ${
                  wn === 'НТ' ? 'bg-primary ' : 'bg-secondary '
                }`}
              >
                {FullDay[DAYS[daynumber]].day}
              </div>
              {['1', '2', '3', '4', '5', '6'].map(p => {
                return (
                  <div key={`${p}para`}>
                    <Para
                      para={p}
                      week={`${wn === 'НТ' ? '1т.' : '2т.'}`}
                      day={`${DAYS[daynumber]}`}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </Week>
    </>
  );
};

export default ScheduleWeekPopulation;
