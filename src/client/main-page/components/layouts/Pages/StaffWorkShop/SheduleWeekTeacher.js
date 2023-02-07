import React, { useContext } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { FiEdit3, FiEye, FiTrash2 } from 'react-icons/fi';
import { Week } from '../../../Styled/StaffWorkShop/STYLED';
import RozkladContext from '../../../../context/RozkladContext';
import FormAddDisciplineToScheduleTeacher from '../../Forms/FormAddDisciplineToScheduleTeacher';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const FullDay = {
  Mon: { day: 'Понеділок', backgr: '#ffc', cn: 'monday' },
  Tue: { day: 'Вівторок', backgr: '#cfc', cn: 'tuesday' },
  Wed: { day: 'Середа', backgr: '#ccf', cn: 'wednesday' },
  Thu: { day: 'Четвер', backgr: '#faa', cn: 'thursday' },
  Fri: { day: "П'ятниця", backgr: '#fff', cn: 'friday' },
};

const checkArrInArr = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) > -1) return false;
  }

  return true;
};
const SheduleWeekTeacher = ({ wn, teacher }) => {
  const {
    state,
    setShowModal,
    setDataForModal,
    deleteFromSchedule,
  } = useContext(RozkladContext);

  const {
    academicloadfond,
    currentSemester,
    currentAcademicYear,
    teacherfond,
    audfond,
  } = state;

  if (!academicloadfond) return null;

  const handleClick = e => {
    const { para, week, day } = e.currentTarget.dataset;
    setShowModal(true);

    setDataForModal({
      title: `Доступні дисципліни`,
      size: 'xl',
      body: {
        func: FormAddDisciplineToScheduleTeacher,
        data: { ...{ para, week, day, teacher } },
      },
    });
  };

  const TriggerExample = ({ obj }) => {
    const handleRemoveFromSchedule = e => {
      const {
        academicRow,
        academicCol,
        teacherRow,
        teacherCol,
        audRow,
        audCol,
      } = e.currentTarget.dataset;

      deleteFromSchedule(
        currentSemester.name,
        currentAcademicYear.id,
        JSON.stringify({
          academicRow,
          academicCol,
          teacherRow,
          teacherCol,
          audRow,
          audCol,
        })
      );
    };
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">
          {/* <Nav className="justify-content-end"> */}
          {/*  <FiTrash2 */}
          {/*    size={24} */}
          {/*    data-academic-row={obj.academicRow} */}
          {/*    data-academic-col={obj.academicCol} */}
          {/*    data-teacher-row={obj.teacherRow} */}
          {/*    data-teacher-col={obj.teacherCol} */}
          {/*    data-aud-row={obj.audRow} */}
          {/*    data-aud-col={obj.audCol} */}
          {/*    onClick={handleRemoveFromSchedule} */}
          {/*  /> */}
          {/* </Nav> */}
        </Popover.Header>
        <Popover.Body>
          <div>{obj.disc}</div>
          <div>{obj.група}</div>
          <div>{obj.тип}</div>
          <div>{obj.викладач}</div>
          <div>{obj['місце проведення']}</div>
        </Popover.Body>
      </Popover>
    );

    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1500 }}
        overlay={popover}
      >
        <Button
          variant={`${
            obj['місце проведення'] === 'ONLINE' ? 'info' : 'success'
          }`}
        >
          <FiEye />
        </Button>
      </OverlayTrigger>
    );
  };

  const TriggerExampleMaybe = ({ obj }) => {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3"></Popover.Header>
        <Popover.Body>
          <div>{obj.disc}</div>
          <div>{obj.група}</div>
          <div>{obj.тип}</div>
          <div>{obj.викладач}</div>
          <div>{obj['місце проведення']}</div>
        </Popover.Body>
      </Popover>
    );

    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1500 }}
        overlay={popover}
      >
        <Button variant="warning">
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
    const teachers = teacherfond[currentSemester.name].data.map((r, idx) => [
      idx + 4,
      ...r,
    ]);
    const auds = audfond[currentSemester.name].data.map((r, idx) => [
      idx + 4,
      ...r,
    ]);
    const arr = academicloadfond[currentSemester.name].data
      .map((r, idx) => [idx + 4, ...r])
      .filter(r => r[5] === teacher)
      .filter(r => r[col + 1] !== '')
      .map(r => {
        return {
          disc: r[1],
          група: r[2],
          тип: r[3],
          викладач: r[5],
          'місце проведення': r[col + 1],
          academicRow: r[0],
          academicCol: col + 1,
          teacherRow: teachers.filter(ro => r[5] === ro[1])[0][0],
          teacherCol: col - 4,
          audRow:
            r[col + 1] !== 'ONLINE'
              ? auds.filter(ro => r[col + 1] === ro[5])[0][0]
              : null,
          audCol: col - 2,
        };
      });

    const listOfBusySubGroups = [
      ...new Set([
        ...academicloadfond[currentSemester.name].data
          .filter(r => r[col] !== '')
          .map(r => r[1])
          .join('+')
          .split('+'),
      ]),
    ].sort();

    const maybeArr = academicloadfond[currentSemester.name].data
      .map((r, idx) => [idx + 4, ...r])
      .filter(r => r[5] === teacher)
      .filter(r => {
        return (
          r[col + 1] === '' &&
          +r[7] - +r[8] > 0 &&
          checkArrInArr(r[2].split('+'), listOfBusySubGroups)
        );
      })
      .map(r => {
        return {
          disc: r[1],
          група: r[2],
          тип: r[3],
          викладач: r[5],
          'місце проведення': r[col + 1],
          academicRow: r[0],
          academicCol: col + 1,
          teacherRow: teachers.filter(ro => r[5] === ro[1])[0][0],
          teacherCol: col - 4,
          audRow: null,
          audCol: col - 2,
        };
      });

    return (
      <>
        <FiEdit3
          size={32}
          onClick={handleClick}
          data-para={para}
          data-week={`${wn === 'НТ' ? '1т.' : '2т.'}`}
          data-day={day}
        ></FiEdit3>
        {arr.map((o, idx) => (
          <TriggerExample key={idx} obj={o} />
        ))}

        {arr.length === 0 &&
          maybeArr.map((o, idx) => <TriggerExampleMaybe key={idx} obj={o} />)}
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
          >
            X
          </div>
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

export default SheduleWeekTeacher;
