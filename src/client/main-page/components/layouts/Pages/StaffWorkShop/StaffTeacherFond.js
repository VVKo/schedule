import React, { useContext, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import RozkladContext from '../../../../context/RozkladContext';
import FormAddTeacher from '../../Forms/FormAddTeacher';

const StaffTeacherFond = () => {
  const {
    state,
    deleteFromTeacherFond,
    setShowModal,
    setDataForModal,
  } = useContext(RozkladContext);
  const {
    teacherfond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
  } = state;

  if (!teacherfond || !teacherfond[currentSemester.name]) return null;


  useEffect(() => {}, [teacherfond]);

  const handleAddTeacher = () => {
    setShowModal(true);

    setDataForModal({
      title: `Додати групу`,
      size: 'xl',
      body: {
        func: FormAddTeacher,
        data: {},
      },
    });
  };

  const isTeacherInAcademicLoad = teacher => {
    return (
      academicloadfond[currentSemester.name].data.filter(r => r[4] === teacher)
        .length === 0
    );
  };

  const MyTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Викладач</th>
            <th scope="col">Корпоративна пошта</th>
            <th scope="col">Посада</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {teacherfond[currentSemester.name].data.map((r, idx) => {
            return (
              <tr key={`row${idx}`}>
                <th scope="row">{idx + 1}</th>
                {r.slice(0, 3).map((val, indx) => (
                  <td key={`val${idx}${indx}`}>{val}</td>
                ))}

                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      {!isTeacherInAcademicLoad(r[0])
                        ? 'Наразі видалити не можливо'
                        : 'Видалити з фонду'}
                    </Tooltip>
                  }
                >
                  <td>
                    <Button
                      variant={
                        isTeacherInAcademicLoad(r[0])
                          ? 'outline-danger'
                          : 'outline-dark'
                      }
                      disabled={!isTeacherInAcademicLoad(r[0])}
                      data-row={idx + 4}
                      onClick={event => {
                        const row = +event.currentTarget.getAttribute(
                          'data-row'
                        );
                        deleteFromTeacherFond(
                          currentSemester.name,
                          currentAcademicYear.id,
                          row
                        );
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </OverlayTrigger>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Викладацький фонд</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          <ButtonGroup className="me-2">
            <Button
              variant="outline-secondary"
              className="btn-sm"
              onClick={handleAddTeacher}
            >
              Додати викладача
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <MyTable />
    </>
  );
};

export default StaffTeacherFond;
