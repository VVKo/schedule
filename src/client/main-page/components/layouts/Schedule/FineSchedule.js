import React, { useContext } from 'react';

import { FaEdit } from 'react-icons/fa';
import { GiWindow } from 'react-icons/gi';
import {
  Day,
  Days,
  Para,
  ParaContent,
  WeekFineSchedule,
  WeekName,
} from './styles/FineScheduleSTYLED';
import RozkladContext from '../../../context/RozkladContext';
import GroupInfo from '../Dashboard/GroupInfo';

const FullDay = {
  ПН: { day: 'Понеділок', backgr: '#ffc' },
  ВТ: { day: 'Вівторок', backgr: '#cfc' },
  СР: { day: 'Середа', backgr: '#ccf' },
  ЧТ: { day: 'Четвер', backgr: '#faa' },
  ПТ: { day: "П'ятниця", backgr: '#fff' },
};

const FineSchedule = ({ weekNumber }) => {
  const {
    workData,
    setShowModal,
    setDataForModal,
    scheduleKey,
    data,
    publicPanel,
    user,
  } = useContext(RozkladContext);

  if (!workData) return null;
  if (!scheduleKey || scheduleKey === 'Виберіть групу або викладача')
    return null;

  const subKey = scheduleKey === 'Розклад групи' ? 'група' : 'викладач';

  const handleClick = (e, obj) => {
    setShowModal(true);

    setDataForModal({
      title: `${obj.gr} група`,
      size: 'xl',
      body: { func: GroupInfo, data: { ...obj } },
    });
  };

  return (
    <WeekFineSchedule>
      <WeekName wn={weekNumber}>
        <div>
          <p className={'week-number'}>{weekNumber}-й тиждень</p>
        </div>
      </WeekName>
      {workData[scheduleKey].map((gr, gridx) => {
        return (
          <Days key={gridx}>
            {Object.keys(gr.week).map((day, idx) => {
              return (
                <Day key={idx} bg={FullDay[day].backgr}>
                  <a href="#">
                    <h2>{FullDay[day].day} </h2>

                    {Object.keys(gr.week[day]).map((para, paraIdx) => (
                      <Para key={paraIdx}>
                        {user.role === 'staff' &&
                          scheduleKey === 'Розклад групи' && (
                            <button
                              onClick={e =>
                                handleClick(e, {
                                  gr: gr['група'],
                                  day,
                                  para,
                                  w: `${weekNumber}-й тиж.`,
                                })
                              }
                            >
                              <FaEdit />
                            </button>
                          )}

                        <span> {para} </span>
                        <ParaContent>
                          {gr.week[day][para][`${weekNumber}-й тиж.`].length ===
                          0 ? (
                            <div>
                              {' '}
                              <GiWindow color="purple" />{' '}
                            </div>
                          ) : (
                            gr.week[day][para][`${weekNumber}-й тиж.`].map(
                              (o, ii) => {
                                const val = {
                                  ...data[
                                    publicPanel.semester.name
                                  ].data.filter(sub => sub.id == o.id)[0],
                                };
                                const { aud } = {
                                  ...val.week[day][para][
                                    `${weekNumber}-й тиж.`
                                  ][0],
                                };
                                const currentgr =
                                  subKey === 'група'
                                    ? val['групаНавантаження']
                                        .split('+')
                                        .filter(grrrr =>
                                          grrrr.includes(gr['група'])
                                        )[0]
                                    : val['групаНавантаження'];

                                const prpod =
                                  subKey === 'група'
                                    ? `${val['викладач']}, `
                                    : '';
                                return (
                                  <p key={ii}>
                                    {/* {val['Назва дисципліни']}, {val['тип']},{' '} */}
                                    {/* {currentgr}, {prpod}Ауд.:{' '} */}
                                    {/* {aud === 'ONLINE' */}
                                    {/*  ? aud */}
                                    {/*  : aud.split(' -- ')[0]} */}
                                    <span>{val['Назва дисципліни']}</span>
                                    <span>{val['тип']}</span>
                                    <span>{currentgr}</span>
                                    <span>{prpod}</span>
                                    <span>
                                      {aud === 'ONLINE'
                                        ? aud
                                        : aud.split(' -- ')[0]}
                                    </span>
                                  </p>
                                );
                              }
                            )
                          )}
                        </ParaContent>
                      </Para>
                    ))}
                    {/* <p> */}
                    {/*  1п.{' '} */}
                    {/*  <button onClick={handleClick}> */}
                    {/*    <FaEdit /> */}
                    {/*  </button>{' '} */}
                    {/* </p> */}
                    {/* <p>2п. </p> */}
                    {/* <p>3п. </p> */}
                    {/* <p>4п. </p> */}
                    {/* <p>5п. </p> */}
                    {/* <p>5п. </p> */}
                  </a>
                </Day>
              );
            })}
          </Days>
        );
      })}

      {/* <Day> */}
      {/*  <a href="#"> */}
      {/*    <h2>Понеділок</h2> */}
      {/*    <button className="edit" onClick={handleClick}> */}
      {/*      <FaEdit color="purple" /> */}
      {/*    </button> */}
      {/*    <p>1п. </p> */}
      {/*    <p>2п. </p> */}
      {/*    <p>3п. </p> */}
      {/*    <p>4п. </p> */}
      {/*    <p>5п. </p> */}
      {/*  </a> */}
      {/* </Day> */}
      {/* <Day> */}
      {/*  <a href="#" contentEditable> */}
      {/*    <h2>Вівторок</h2> */}
      {/*    <button className="edit"> */}
      {/*      <FaEdit color="purple" /> */}
      {/*    </button> */}
      {/*    <p>Text Content #2</p> */}
      {/*  </a> */}
      {/* </Day> */}
      {/* <Day> */}
      {/*  <a href="#" contentEditable> */}
      {/*    <h2>Середа</h2> */}
      {/*    <button className="edit"> */}
      {/*      <FaEdit color="purple" /> */}
      {/*    </button> */}
      {/*    <p>Text Content #3</p> */}
      {/*  </a> */}
      {/* </Day> */}
      {/* <Day> */}
      {/*  <a href="#" contentEditable> */}
      {/*    <h2>Четвер</h2> */}
      {/*    <button className="edit"> */}
      {/*      <FaEdit color="purple" /> */}
      {/*    </button> */}
      {/*    <p>Text Content #4</p> */}
      {/*  </a> */}
      {/* </Day> */}
      {/* <Day> */}
      {/*  <a href="#" contentEditable> */}
      {/*    <h2>П&apos;ятниця</h2> */}
      {/*    <button className="edit"> */}
      {/*      <FaEdit color="purple" /> */}
      {/*    </button> */}
      {/*    <p>Text Content #5</p> */}
      {/*  </a> */}
      {/* </Day> */}
    </WeekFineSchedule>
  );
};

export default FineSchedule;
