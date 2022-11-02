import React, { useContext, useEffect } from 'react';
import {
  Accordion,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Container,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import RozkladContext from '../../../../context/RozkladContext';
import FormAddSingleGroup from '../../Forms/FormAddSingleGroup';
import FormAddSubGroups from '../../Forms/FormAddSubGroups';
import FormAddStreamGroups from '../../Forms/FormAddStreamGroups';

const StaffGroupFond = () => {
  const {
    state,
    addToGroupFond,
    deleteFromGroupFond,
    setShowModal,
    setDataForModal,
  } = useContext(RozkladContext);
  const {
    groupfond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
  } = state;

  if (!groupfond || !groupfond[currentSemester.name]) return null;

  useEffect(() => {}, [groupfond]);

  const groups = [
    ...new Set([
      ...groupfond[currentSemester.name].data
        .map(r => r[0])
        .join('+')
        .split('+')
        .map(r => r.split('гр')[0]),
    ]),
  ].sort();

  const isGroupInAcademicLoad = gr => {
    return (
      academicloadfond[currentSemester.name].data.filter(r => r[1] === gr)
        .length === 0
    );
  };

  const handleAddGroup = () => {
    setShowModal(true);

    setDataForModal({
      title: `Додати групу`,
      size: 'xl',
      body: {
        func: FormAddSingleGroup,
        data: {},
      },
    });
  };

  const handleAddStreamGroups = () => {
    setShowModal(true);

    setDataForModal({
      title: 'Додати "потокову" групу',
      size: 'xl',
      body: {
        func: FormAddStreamGroups,
        data: {},
      },
    });
  };

  const handleAddSubGroups = e => {
    const { curgroup } = e.currentTarget.dataset;

    setShowModal(true);

    setDataForModal({
      title: `Додати підгрупи`,
      size: 'xl',
      body: {
        func: FormAddSubGroups,
        data: { curgroup },
      },
    });
  };

  const MyTable = ({ gr }) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Група</th>
            <th scope="col">Підгрупа</th>
            <th scope="col">К-ть студентів</th>
            <th scope="col">Робоча назва</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {groupfond[currentSemester.name].data
            .map((r, index) => [index, ...r])
            .filter(r => !r[1].toString().includes('+'))
            .filter(r => r[1].toString() === gr)
            .map((r, idx) => {
              return (
                <tr key={`row${idx}`}>
                  <th scope="row">{idx + 1}</th>
                  {r.slice(1, 5).map((val, indx) => (
                    <td key={`val${idx}${indx}`}>{val}</td>
                  ))}

                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        {!isGroupInAcademicLoad(r[4].split(' -- ')[0])
                          ? 'Наразі видалити не можливо'
                          : 'Видалити з фонду'}
                      </Tooltip>
                    }
                  >
                    <td>
                      <Button
                        variant={
                          isGroupInAcademicLoad(r[4].split(' -- ')[0])
                            ? 'outline-danger'
                            : 'outline-dark'
                        }
                        disabled={!isGroupInAcademicLoad(r[4].split(' -- ')[0])}
                        data-row={r[0] + 4}
                        onClick={event => {
                          const row = +event.currentTarget.getAttribute(
                            'data-row'
                          );
                          deleteFromGroupFond(
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

  const StreamGroups = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Група</th>
            <th scope="col">Підгрупа</th>
            <th scope="col">К-ть студентів</th>
            <th scope="col">Робоча назва</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {groupfond[currentSemester.name].data
            .map((r, index) => [index, ...r])
            .filter(r => r[1].toString().includes('+'))
            .map((r, idx) => {
              return (
                <tr key={`row${idx}`}>
                  <th scope="row">{idx + 1}</th>
                  {r.slice(1, 5).map((val, indx) => (
                    <td key={`val${idx}${indx}`}>{val}</td>
                  ))}

                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        {!isGroupInAcademicLoad(r[4].split(' -- ')[0])
                          ? 'Наразі видалити не можливо'
                          : 'Видалити з фонду'}
                      </Tooltip>
                    }
                  >
                    <td>
                      <Button
                        variant={
                          isGroupInAcademicLoad(r[4].split(' -- ')[0])
                            ? 'outline-danger'
                            : 'outline-dark'
                        }
                        disabled={!isGroupInAcademicLoad(r[4].split(' -- ')[0])}
                        data-row={r[0] + 4}
                        onClick={event => {
                          const row = +event.currentTarget.getAttribute(
                            'data-row'
                          );
                          deleteFromGroupFond(
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

  const FineGroupList = () => {
    return (
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Container>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3 className="h3"> "Потокові" групи</h3>
                <ButtonToolbar
                  aria-label="Toolbar with button groups"
                  className="mb-2 mb-md-0"
                >
                  <Button
                    as={'div'}
                    variant="outline-secondary"
                    className="btn-sm"
                    onClick={handleAddStreamGroups}
                  >
                    Додати "потокову" групу
                  </Button>
                </ButtonToolbar>
              </div>
            </Container>
          </Accordion.Header>
          <Accordion.Body>
            <StreamGroups />
          </Accordion.Body>
        </Accordion.Item>
        {groups.map((gro, idx) => {
          return (
            <Accordion.Item key={`${idx + 1}ac`} eventKey={`${idx + 1}`}>
              <Accordion.Header>
                <Container>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h3 className="h3"> {gro}</h3>
                    <ButtonToolbar
                      aria-label="Toolbar with button groups"
                      className="mb-2 mb-md-0"
                    >
                      <Button
                        as={'div'}
                        variant="outline-secondary"
                        className="btn-sm"
                        data-curgroup={`${gro}`}
                        onClick={handleAddSubGroups}
                      >
                        Додати підгрупи
                      </Button>
                    </ButtonToolbar>
                  </div>
                </Container>
              </Accordion.Header>
              <Accordion.Body>
                <MyTable gr={gro} />
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
        <h1 className="h2">Груповий фонд</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          <ButtonGroup className="me-2">
            <Button
              variant="outline-secondary"
              className="btn-sm"
              onClick={handleAddGroup}
            >
              Додати групу
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <FineGroupList />
    </>
  );
};

export default StaffGroupFond;
