import React, { useContext } from 'react';
import {
  Day,
  Groups,
  Week,
  Para,
  GroupCaption,
  DayCaption,
  DayContent,
} from './styles/STYLEDSchedule';
import RozkladContext from '../../../context/RozkladContext';
import GroupInfo from '../Dashboard/GroupInfo';
import { ScheduleContainer } from '../../Styled/StyledComponents';
import { FaBeer } from 'react-icons/fa';

const Schedule = () => {
  const { workData, setShowModal, setDataForModal, scheduleKey } = useContext(
    RozkladContext
  );
  console.log('workdata in schedule', workData);
  if (!workData) return <>Виберіть семестр</>;
  if (!scheduleKey) return <>Виберіть групу або викладача</>;

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
    <ScheduleContainer>
      <Groups oneGroup={workData[scheduleKey].length === 1}>
        {workData[scheduleKey].map((gr, gridx) => (
          <Week key={gridx}>
            <GroupCaption className={'groupCaption'}>
              <span>{gr[subKey]}<FaBeer/></span>
            </GroupCaption>
            <div>
              {Object.keys(gr.week).map((day, idx) => (
                <Day key={idx} bgColor={'#EDA9A9'}>
                  <DayCaption
                    className={`dayCaption `} // ${gridx !== 0 ? 'no-showDay' : ''}
                  >
                    <span>{day}</span>
                  </DayCaption>
                  <DayContent>
                    {Object.keys(gr.week[day]).map(para => (
                      <Para key={para}>
                        <div className={'paraNumber'}>{para}</div>
                        <div>
                          <div
                            onClick={e =>
                              handleClick(e, {
                                gr: gr['група'],
                                day,
                                para,
                                w: '1-й тиж.',
                              })
                            }
                          >
                            {gr.week[day][para]['1-й тиж.'].length === 0
                              ? ''
                              : gr.week[day][para]['1-й тиж.'].length}
                          </div>
                          <div
                            onClick={e =>
                              handleClick(e, {
                                gr: gr['група'],
                                day,
                                para,
                                w: '2-й тиж.',
                              })
                            }
                          >
                            {gr.week[day][para]['2-й тиж.'].length === 0
                              ? ''
                              : gr.week[day][para]['2-й тиж.'].length}
                          </div>
                        </div>
                      </Para>
                    ))}
                  </DayContent>
                </Day>
              ))}
            </div>
          </Week>
        ))}
      </Groups>
    </ScheduleContainer>
  );
};

export default Schedule;
