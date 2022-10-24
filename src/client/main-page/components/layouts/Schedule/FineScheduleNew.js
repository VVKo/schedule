import React, { useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { GiWindow } from 'react-icons/gi';
import { logEntryPolyfills } from '@babel/preset-env/lib/debug';
import { FiEdit3 } from 'react-icons/fi';
import RozkladContext from '../../../context/RozkladContext';
import {
  Day,
  Days,
  Para,
  ParaContent,
  WeekFineSchedule,
  WeekName,
} from './styles/FineScheduleSTYLED';

const FullDay = {
  Mon: { day: 'Понеділок', backgr: '#ffc' },
  Tue: { day: 'Вівторок', backgr: '#cfc' },
  Wed: { day: 'Середа', backgr: '#ccf' },
  Thu: { day: 'Четвер', backgr: '#faa' },
  Fri: { day: "П'ятниця", backgr: '#fff' },
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const FineScheduleNew = ({ weekNumber }) => {
  const { state } = useContext(RozkladContext);

  const { currentGroup, academicloadfond, currentSemester } = state;

  if (!academicloadfond) return null;

  if (!currentGroup || currentGroup === 'Виберіть групу') return null;

  const Content = ({ para, week, day }) => {
    const d = DAYS.indexOf(day);
    const w = week === '1т.' ? 0 : 1;
    const p = +para - 1;
    const col = 8 + 16 * d + 2 * p + w;
    const arr = academicloadfond[currentSemester.name].data
      .map((r, idx) => [idx + 4, ...r])
      .filter(r => r[2].includes(currentGroup))
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
      <ParaContent>
        {arr.length === 0 && (
          <div>
            <GiWindow color="purple" />
          </div>
        )}
        {arr.map((o, idx) => (
          <p key={idx}>
            <span>{o.disc}</span>
            <span>{o.тип}</span>
            <span>{o.група}</span>
            <span>{o.викладач}</span>
            <span>
              {o['місце проведення'] === 'ONLINE'
                ? o['місце проведення']
                : o['місце проведення'].split(' -- ')[0]}
            </span>
          </p>
        ))}
      </ParaContent>
    );
  };

  return (
    <WeekFineSchedule>
      <WeekName wn={weekNumber}>
        <div>
          <p className={'week-number'}>{weekNumber}-й тиждень</p>
        </div>
      </WeekName>
      <Days>
        {[0, 1, 2, 3, 4].map(dd => {
          return (
            <Day key={`${dd}dd`} bg={FullDay[DAYS[dd]].backgr}>
              <a href="#">
                <h2>{FullDay[DAYS[dd]].day} </h2>
                {['1', '2', '3', '4', '5', '6'].map(p => {
                  return (
                    <Para key={`${p}par`}>
                      <span> {`${p}п.`} </span>
                      <Content
                        para={p}
                        week={`${weekNumber === '1' ? '1т.' : '2т.'}`}
                        day={`${DAYS[dd]}`}
                      />
                    </Para>
                  );
                })}
              </a>
            </Day>
          );
        })}
      </Days>
    </WeekFineSchedule>
  );
};

export default FineScheduleNew;
