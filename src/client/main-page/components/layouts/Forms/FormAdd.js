import React, { useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { MdOutlineAddTask } from 'react-icons/md';
import RozkladContext from '../../../context/RozkladContext';

const FormAdd = ({
  academicRow,
  academicCol,
  teacherRow,
  teacherCol,
  audRow,
  audCol,
}) => {
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

  const freeAuds = rowAudFond
    .filter(r => r[+audCol] === '')
    .map(r => [r[0], r[4], r[5]]);

  const disc = rowAcademicLoadFond.filter(r => r[0] === +academicRow)[0];

  const handleAdd = e => {
    const { rowload, rowteacher } = e.currentTarget.dataset;
    const a =
      e.currentTarget.parentElement.parentElement.children[0].children[0].value;
    const rowaud =
      a !== 'ONLINE' ? `${rowAudFond.filter(ra => ra[5] === a)[0][0]}` : null;

    // console.log({
    //   rowload,
    //   colload: academicCol,
    //   rowteacher,
    //   colteacher: teacherCol,
    //   rowaud,
    //   colaud: audCol,
    //   aud: a,
    // });

    setShowModal(false);
    addToSchedule(
      currentSemester.name,
      currentAcademicYear.id,
      JSON.stringify({
        rowload,
        colload: academicCol,
        rowteacher,
        colteacher: teacherCol,
        rowaud,
        colaud: audCol,
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
          <tr>
            <th scope="row">{disc[0]}</th>
            <td>{disc[1]}</td>
            <td>{disc[2]}</td>
            <td>{disc[3]}</td>
            <td>{disc[5]}</td>
            <td>{disc[7] - disc[8]}</td>
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
                          (a[1] === 'Лаб.' && disc[3] === 'Лаб.') ||
                          (disc[3] !== 'Лаб.' && a[1] === 'інші.')
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
                    data-rowload={academicRow}
                    data-rowteacher={teacherRow}
                    onClick={handleAdd}
                  >
                    <MdOutlineAddTask size={'24'} />
                  </Button>
                </Col>
              </Row>
            </td>
          </tr>
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

export default FormAdd;
