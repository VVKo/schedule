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
import FormAddDiscipline from '../../Forms/FormAddDiscipline';

const StaffDisciplineFond = () => {
  const {
    state,
    setShowModal,
    setDataForModal,
    deleteFromDisciplineFond,
  } = useContext(RozkladContext);

  const {
    disciplinefond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
  } = state;

  useEffect(() => {}, [disciplinefond]);

  const handleAddDiscipline = () => {
    setShowModal(true);

    setDataForModal({
      title: `Додати дисципліну`,
      size: 'xl',
      body: {
        func: FormAddDiscipline,
        data: {},
      },
    });
  };

  const isDiscInAcademicLoad = disc => {
    return (
      academicloadfond[currentSemester.name].data.filter(r => r[0] === disc)
        .length === 0
    );
  };

  const MyTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Повна назва дисципліни</th>
            <th scope="col">Скорочена назва дисципілни</th>
            <th scope="col">Освітня програма</th>
            <th scope="col">Шифр</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {disciplinefond[currentSemester.name].data.map((r, idx) => {
            return (
              <tr key={`row${idx}`}>
                <th scope="row">{idx + 1}</th>
                {r.slice(0, 4).map((val, indx) => (
                  <td key={`val${idx}${indx}`}>{val}</td>
                ))}

                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      {!isDiscInAcademicLoad(r[0])
                        ? 'Наразі видалити не можливо'
                        : 'Видалити з фонду'}
                    </Tooltip>
                  }
                >
                  <td>
                    <Button
                      variant={
                        isDiscInAcademicLoad(r[0])
                          ? 'outline-danger'
                          : 'outline-dark'
                      }
                      disabled={!isDiscInAcademicLoad(r[0])}
                      data-row={idx + 4}
                      onClick={event => {
                        const row = +event.currentTarget.getAttribute(
                          'data-row'
                        );
                        deleteFromDisciplineFond(
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
        <h1 className="h2">Дисципліни</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          <ButtonGroup className="me-2">
            <Button
              variant="outline-secondary"
              className="btn-sm"
              onClick={handleAddDiscipline}
            >
              Додати дисципліну
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <MyTable />
    </>
  );
};

export default StaffDisciplineFond;
