import React, { useContext } from 'react';
import {
  Accordion,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FaFileExport, FaQuestion, FaTrash } from 'react-icons/fa';
import RozkladContext from '../../../../context/RozkladContext';
import FormAddAcademicLoad from '../../Forms/FormAddAcademicLoad';
import HowToAddAuds from '../../Instructions/HowToAddAuds';
import UploadCSV from '../../Forms/UploadCSV';
import HowToAddLoads from '../../Instructions/HowToAddLoads';
import UploadCSVLoadFond from "../../Forms/UploadCSVLoadFond";

const StaffLoadFond = () => {
  const {
    state,
    deleteFromAcademicLoadFond,
    setShowModal,
    setDataForModal,
  } = useContext(RozkladContext);

  const {
    teacherfond,
    groupfond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
    disciplinefond,
  } = state;

  const fonds = {
    0: disciplinefond[currentSemester.name].data.map(o => o[0]),
    1: groupfond[currentSemester.name].data.map(o => o[3].split(' -- ')[0]),
    4: teacherfond[currentSemester.name].data.map(o => o[0]),
  };

  const groups = [
    ...new Set([
      ...academicloadfond[currentSemester.name].data
        .map(r => r[1])
        .join('+')
        .split('+')
        .map(r => r.split('гр')[0]),
    ]),
  ].sort();
  const handleAddLoad = () => {
    setShowModal(true);

    setDataForModal({
      title: `Додати дані до розкладу`,
      size: 'xl',
      body: {
        func: FormAddAcademicLoad,
        data: {},
      },
    });
  };

  const highlight = (idx, indx, val) => {
    switch (indx) {
      case 0:
        return (
          <td
            key={`val${idx}${indx}`}
            className={fonds[0].indexOf(val) === -1 ? 'bg-warning' : ''}
          >
            {val}
          </td>
        );
      case 4:
        return (
          <td
            key={`val${idx}${indx}`}
            className={fonds[4].indexOf(val) === -1 ? 'bg-warning' : ''}
          >
            {val}
          </td>
        );
      case 1:
        return (
          <td
            key={`val${idx}${indx}`}
            className={fonds[1].indexOf(val) === -1 ? 'bg-warning' : ''}
          >
            {val}
          </td>
        );
      default:
        return <td key={`val${idx}${indx}`}>{val}</td>;
    }
  };

  const handleInstruction = () => {
    setShowModal(true);

    setDataForModal({
      title: `Інстукція`,
      size: 'xl',
      body: {
        func: HowToAddLoads,
        data: {
          headers: [
            'Назва дисципліни',
            'група',
            'тип',
            'год',
            'викладач РОЗКЛАД',
            'К-ть тижнів',
            'К-ть год/тижд',
          ],
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
        func: UploadCSVLoadFond,
        data: {
          headers: [
            'Назва дисципліни',
            'група',
            'тип',
            'год',
            'викладач РОЗКЛАД',
            'К-ть тижнів',
            'К-ть год/тижд',
          ],
        },
      },
    });
  };

  const AcademivLoadByGroup = ({ gr }) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Дисципліна</th>
            <th scope="col">Група</th>
            <th scope="col">Тип заняття</th>
            <th scope="col">К-ть годин</th>
            <th scope="col">Викладач</th>
            <th scope="col">К-ть тижнів</th>
            <th scope="col">год/тиждень</th>
            <th scope="col">Виставлено</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {academicloadfond[currentSemester.name].data
            .map((r, index) => [index, ...r])
            .filter(r => !r[2].includes('+') && r[2].includes(`${gr}гр`))
            .map((r, idx) => {
              return (
                <tr key={`row${idx}`}>
                  <th scope="row">{idx + 1}</th>
                  {r.slice(1, 9).map((val, indx) => highlight(idx, indx, val))}

                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        {!(r[8] === 0 || r[8] === '')
                          ? 'Наразі видалити не можливо'
                          : 'Видалити з фонду'}
                      </Tooltip>
                    }
                  >
                    <td>
                      <Button
                        variant={
                          !(r[8] === 0 || r[8] === '')
                            ? 'outline-dark'
                            : 'outline-danger'
                        }
                        disabled={!(r[8] === 0 || r[8] === '')}
                        data-row={r[0] + 4}
                        onClick={event => {
                          const row = +event.currentTarget.getAttribute(
                            'data-row'
                          );
                          deleteFromAcademicLoadFond(
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

  const AcademicLoadStreamGroups = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Дисципліна</th>
            <th scope="col">Група</th>
            <th scope="col">Тип заняття</th>
            <th scope="col">К-ть годин</th>
            <th scope="col">Викладач</th>
            <th scope="col">К-ть тижнів</th>
            <th scope="col">год/тиждень</th>
            <th scope="col">Виставлено</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {academicloadfond[currentSemester.name].data
            .map((r, index) => [index, ...r])
            .filter(r => r[2].includes('+'))
            .map((r, idx) => {
              return (
                <tr key={`row${idx}`}>
                  <th scope="row">{idx + 1}</th>
                  {r.slice(1, 9).map((val, indx) => highlight(idx, indx, val))}

                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        {!(r[8] === 0 || r[8] === '')
                          ? 'Наразі видалити не можливо'
                          : 'Видалити з фонду'}
                      </Tooltip>
                    }
                  >
                    <td>
                      <Button
                        variant={
                          !(r[8] === 0 || r[8] === '')
                            ? 'outline-dark'
                            : 'outline-danger'
                        }
                        disabled={!(r[8] === 0 || r[8] === '')}
                        data-row={r[0] + 4}
                        onClick={event => {
                          const row = +event.currentTarget.getAttribute(
                            'data-row'
                          );
                          deleteFromAcademicLoadFond(
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

  const FineAcademicLoad = () => {
    return (
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Container>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3 className="h3"> "Потокові" групи</h3>
              </div>
            </Container>
          </Accordion.Header>
          <Accordion.Body>
            <AcademicLoadStreamGroups />
          </Accordion.Body>
        </Accordion.Item>
        {groups.map((gro, idx) => {
          return (
            <Accordion.Item key={`${idx + 1}ac`} eventKey={`${idx + 1}`}>
              <Accordion.Header>
                <Container>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h3 className="h3"> {gro}</h3>
                  </div>
                </Container>
              </Accordion.Header>
              <Accordion.Body>
                <AcademivLoadByGroup gr={gro} />
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Дані до розкладу</h1>
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
              onClick={handleAddLoad}
            >
              Додати дані
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <FineAcademicLoad />
    </>
  );
};

export default StaffLoadFond;
