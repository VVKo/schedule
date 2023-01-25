import React, { useContext } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { MdOutlineAddTask } from 'react-icons/md';
import RozkladContext from '../../../context/RozkladContext';

const FormEditPara = ({
  academicRow,
  academicCol,
  teacherRow,
  teacherCol,
  audRow,
  audCol,
}) => {
  const { state, setShowModal, editAud } = useContext(RozkladContext);
  const {
    academicloadfond,
    currentSemester,
    teacherfond,
    audfond,
    currentAcademicYear,
  } = state;
  const rowAcademicLoadFond = academicloadfond[
    currentSemester.name
  ].data.map((r, idx) => [idx + 4, ...r]);

  const rowAudFond = audfond[currentSemester.name].data.map((r, idx) => [
    idx + 4,
    ...r,
  ]);

  const freeAuds = [
    'ONLINE',
    ...audfond[currentSemester.name].data
      .filter(r => r[audCol - 1] === '')
      .map(rr => rr[4]),
  ];

  const handleEditAud = e => {
    const newAud = document.getElementById('newAud').value;
    const targetAudRow =
      newAud === 'ONLINE'
        ? null
        : rowAudFond.filter(r => r[5] === newAud)[0][0];
    setShowModal(false);
    editAud(
      JSON.stringify({
        sem: currentSemester.name,
        folderID: currentAcademicYear.id,
        academicRow,
        academicCol,
        teacherRow,
        teacherCol,
        audRow,
        audCol,
        targetAudRow,
        newAud,
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
            <th scope="col">Стара аудиторія</th>
            <th scope="col">Нова аудиторія</th>
            <th scope="col">Змінити</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              {academicloadfond[currentSemester.name].data[academicRow - 4][0]}
            </td>
            <td>
              {academicloadfond[currentSemester.name].data[academicRow - 4][1]}
            </td>
            <td>
              {academicloadfond[currentSemester.name].data[academicRow - 4][2]}
            </td>
            <td>
              {academicloadfond[currentSemester.name].data[academicRow - 4][4]}
            </td>
            <td>
              {
                academicloadfond[currentSemester.name].data[academicRow - 4][
                  academicCol - 1
                ]
              }
            </td>
            <td>
              <select
                className="form-select"
                aria-label="Default select example"
                id="newAud"
              >
                {freeAuds.map((a, indx) => {
                  return (
                    <option key={indx} value={`${a}`}>
                      {a}
                    </option>
                  );
                })}
              </select>
            </td>
            <td>
              <Button variant="outline-success" onClick={handleEditAud}>
                <MdOutlineAddTask size={'24'} />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <>
      <MyTable />
      {/* <h1>Edit</h1> */}
      {/* {JSON.stringify(rowAcademicLoadFond[academicRow - 4].slice(0, 8))} */}
      {/* <div> */}
      {/*  {academicloadfond[currentSemester.name].data[academicRow - 4].slice( */}
      {/*    0, */}
      {/*    8 */}
      {/*  )} */}
      {/* </div> */}
      {/* <div> */}
      {/*  { */}
      {/*    academicloadfond[currentSemester.name].data[academicRow - 4][ */}
      {/*      academicCol - 1 */}
      {/*    ] */}
      {/*  } */}
      {/* </div> */}
      {/* <div> */}
      {/*  {teacherfond[currentSemester.name].data[teacherRow - 4].slice(0, 4)} */}
      {/* </div> */}
      {/* <div> */}
      {/*  {teacherfond[currentSemester.name].data[teacherRow - 4][teacherCol - 1]} */}
      {/* </div> */}
      {/* <div>{audfond[currentSemester.name].data[audRow - 4].slice(0, 5)}</div> */}
      {/* <div>{audfond[currentSemester.name].data[audRow - 4][audCol - 1]}</div> */}
      {/* <div>{JSON.stringify(freeAuds)}</div> */}
    </>
  );
};

export default FormEditPara;
