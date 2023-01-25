import React, { useContext } from 'react';
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { Button, Nav, OverlayTrigger, Popover } from 'react-bootstrap';
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
const ScheduleWeekAud = ({ wn, aud }) => {
  const { state } = useContext(RozkladContext);

  const {
    academicloadfond,
    currentSemester,
  } = state;

  if (!academicloadfond) return null;

  const TriggerExample = ({ obj }) => {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">Інфо</Popover.Header>
        <Popover.Body>
          <div>{obj.disc}</div>
          <div>{obj.група}</div>
          <div>{obj.тип}</div>
          <div>{obj.викладач}</div>
        </Popover.Body>
      </Popover>
    );

    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1500 }}
        overlay={popover}
      >
        <Button variant="success">
          <FiEye />
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
      .filter(r => r[col + 1] === aud)
      .map(r => {
        return {
          disc: r[1],
          група: r[2],
          тип: r[3],
          викладач: r[5],
        };
      });

    return (
      <>
        {arr.map((o, idx) => (
          <TriggerExample key={idx} obj={o} />
        ))}
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

export default ScheduleWeekAud;
