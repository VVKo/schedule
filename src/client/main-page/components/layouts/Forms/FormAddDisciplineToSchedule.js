import React, { useContext } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { MdOutlineAddTask } from 'react-icons/md';
import RozkladContext from '../../../context/RozkladContext';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const getCol = (shift, day, week, para) => {
  // col = 9 day=Mon, week = 1, para=1

  const d = DAYS.indexOf(day);
  const w = week === '1т.' ? 0 : 1;
  const p = para - 1;
  return shift + 16 * d + 2 * p + w;
};
const FormAddDisciplineToSchedule = ({ para, week, day, group }) => {
  const { state, addToSchedule, setShowModal } = useContext(RozkladContext);

  const {
    audfond,
    academicloadfond,
    teacherfond,
    currentSemester,
    currentAcademicYear,
  } = state;

  const rowAcademicLoadFond = academicloadfond[
    currentSemester.name
  ].data.map((r, idx) => [idx + 4, ...r]);
  const rowAudFond = audfond[currentSemester.name].data.map((r, idx) => [
    idx + 4,
    ...r,
  ]);
  const rowTeacherFond = teacherfond[
    currentSemester.name
  ].data.map((r, idx) => [idx + 4, ...r]);

  const loadCol = getCol(9, day, week, para);
  const audCol = getCol(6, day, week, para);
  const teacherCol = getCol(4, day, week, para);
  const freeTeachers = rowTeacherFond
    .filter(r => r[teacherCol] === '')
    .map(r => [r[0], r[1]]);
  const freeAuds = rowAudFond
    .filter(r => r[audCol] === '')
    .map(r => [r[0], r[4], r[5]]);
  const freeDisc = rowAcademicLoadFond
    .filter(r => r[2].includes(`${group}гр`))
    .filter(
      r =>
        r[loadCol] === '' &&
        +r[7] - +r[8] > 0 &&
        freeTeachers.findIndex(tr => tr[1] === r[5]) > -1
    )
    .map(r => [r[0], r[1], r[2], r[3], r[5], +r[7] - +r[8]]);

  const handleAdd = e => {
    const { rowload, rowteacher } = e.currentTarget.dataset;
    const a =
      e.currentTarget.parentElement.parentElement.children[0].children[0].value;
    const rowaud =
      a !== 'ONLINE' ? `${rowAudFond.filter(ra => ra[5] === a)[0][0]}` : null;

    setShowModal(false);
    addToSchedule(
      currentSemester.name,
      currentAcademicYear.id,
      JSON.stringify({
        rowload,
        colload: `${loadCol}`,
        rowteacher,
        colteacher: `${teacherCol}`,
        rowaud,
        colaud: `${audCol}`,
        aud: a,
      })
    );
  };

  const MyTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Назва дисципліни</th>
            <th scope="col">Група</th>
            <th scope="col">Тип</th>
            <th scope="col">Викладач</th>
            <th scope="col">К-ть невиставлених годин</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {freeDisc.map((r, idx) => {
            return (
              <tr key={`row${idx}`}>
                <th scope="row">{idx + 1}</th>
                {r.slice(1).map((val, indx) => (
                  <td key={`val${idx}${indx}`}>{val}</td>
                ))}
                <td>
                  <Row>
                    <Col>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="ONLINE">ONLINE</option>
                        {freeAuds
                          .filter(
                            a =>
                              (a[1] === 'Лаб.' && r[3] === 'Лаб.') ||
                              (r[3] !== 'Лаб.' && a[1] === 'інші.')
                          )
                          .map((a, indx) => {
                            return (
                              <option key={indx} value={`${a[2]}`}>
                                {a[2]}
                              </option>
                            );
                          })}
                      </select>
                    </Col>
                    <Col>
                      <Button
                        variant="outline-success"
                        onClick={handleAdd}
                        data-rowload={r[0]}
                        data-rowteacher={
                          rowTeacherFond.filter(rt => rt[1] === r[4])[0][0]
                        }
                      >
                        <MdOutlineAddTask size={'24'} />
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <MyTable />
    </>
  );
};

export default FormAddDisciplineToSchedule;
