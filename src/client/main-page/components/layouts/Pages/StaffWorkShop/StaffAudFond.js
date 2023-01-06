import React, { useContext, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  OverlayTrigger,
  Table,
  Tooltip,
} from 'react-bootstrap';
import { FaFileExport, FaQuestion, FaTrash } from 'react-icons/fa';
import RozkladContext from '../../../../context/RozkladContext';
import FormAddAud from '../../Forms/FormAddAud';
import HowToAddAuds from '../../Instructions/HowToAddAuds';
import UploadCSV from '../../Forms/UploadCSV';

const StaffAudFond = () => {
  const {
    state,
    deleteFromAudFond,
    setShowModal,
    setDataForModal,
  } = useContext(RozkladContext);

  const {
    audfond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
  } = state;

  useEffect(() => {}, [audfond]);

  const handleAddAud = () => {
    setShowModal(true);

    setDataForModal({
      title: `Додати аудиторію`,
      size: 'xl',
      body: {
        func: FormAddAud,
        data: {},
      },
    });
  };

  const handleInstruction = () => {
    setShowModal(true);

    setDataForModal({
      title: `Інстукція`,
      size: 'xl',
      body: {
        func: HowToAddAuds,
        data: {
          headers: ['Корпус', 'Аудиторія', 'Кількість п/м', 'Тип аудиторії'],
        },
      },
    });
  };

  const handleUploadFile = () => {
    setShowModal(true);

    setDataForModal({
      title: `Завантажити`,
      size: 'xl',
      body: {
        func: UploadCSV,
        data: {
          headers: ['Корпус', 'Аудиторія', 'Кількість п/м', 'Тип аудиторії'],
        },
      },
    });
  };

  const isAudInAcademicLoad = aud => {
    return (
      academicloadfond[currentSemester.name].data.filter(
        r => r.indexOf(aud) !== -1
      ).length === 0
    );
  };

  const MyTable = () => {
    return (
      <Table striped bordered hover className="align-middle">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Корпус</th>
            <th scope="col">Аудиторія</th>
            <th scope="col">Кількість п/м</th>
            <th scope="col">Тип аудиторії</th>
            <th scope="col">Шифр</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {audfond[currentSemester.name].data.map((r, idx) => {
            return (
              <tr key={`row${idx}`}>
                <th scope="row">{idx + 1}</th>
                {r.slice(0, 5).map((val, indx) => (
                  <td key={`val${idx}${indx}`}>{val}</td>
                ))}

                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      {!isAudInAcademicLoad(r[4])
                        ? 'Наразі видалити не можливо'
                        : 'Видалити з фонду'}
                    </Tooltip>
                  }
                >
                  <td>
                    <Button
                      variant={
                        isAudInAcademicLoad(r[4])
                          ? 'outline-danger'
                          : 'outline-dark'
                      }
                      disabled={!isAudInAcademicLoad(r[4])}
                      data-row={idx + 4}
                      onClick={event => {
                        const row = +event.currentTarget.getAttribute(
                          'data-row'
                        );
                        deleteFromAudFond(
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
      </Table>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Аудиторний фонд</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          <ButtonGroup className="me-2">
            <Button
              variant="outline-secondary"
              className="btn-sm"
              onClick={handleInstruction}
            >
              <FaQuestion /> Інструкція
            </Button>
            <Button
              variant="outline-secondary"
              className="btn-sm"
              onClick={handleUploadFile}
            >
              <FaFileExport /> Export
            </Button>
          </ButtonGroup>
          <ButtonGroup className="me-2">
            <Button
              variant="outline-secondary"
              className="btn-sm"
              onClick={handleAddAud}
            >
              Додати аудиторію
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <MyTable />
    </>
  );
};

export default StaffAudFond;
