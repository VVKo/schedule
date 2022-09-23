import React, { useContext, useState } from 'react';
import {FiCalendar, FiMinusCircle, FiPlusCircle} from 'react-icons/fi';
import { Collapse } from 'react-bootstrap';
import RozkladContext from '../../../../context/RozkladContext';
import FormAddTeacher from '../../Forms/FormAddTeacher';
import FormAddGroup from '../../Forms/FormAddGroup';
import FormAddDiscipline from '../../Forms/FormAddDiscipline';
import FormAddAcademicLoad from '../../Forms/FormAddAcademicLoad';
import FormAddAud from '../../Forms/FormAddAud';
import {
  StaffHeader,
  StaffSidebar,
} from '../../../Styled/StaffWorkShop/STYLED';

const StaffWorkShop = () => {
  const [setting, setSetting] = useState(false);
  const { user, publicPanel, setShowModal, setDataForModal } = useContext(
    RozkladContext
  );

  if (user.role !== 'staff' || publicPanel.semester.name === 'Виберіть семестр')
    return null;

  const handleAddAud = () => {
    setShowModal(true);

    setDataForModal({
      title: `Аудиторний фонд ${publicPanel.semester.name}`,
      size: 'xl',
      body: { func: FormAddAud, data: {} },
    });
  };

  const handleAddTeacher = () => {
    setShowModal(true);

    setDataForModal({
      title: `Викладацький фонд ${publicPanel.semester.name}`,
      size: 'xl',
      body: { func: FormAddTeacher, data: {} },
    });
  };

  const handleAddGroup = () => {
    setShowModal(true);
    setDataForModal({
      title: `Груповий фонд ${publicPanel.semester.name}`,
      size: 'xl',
      body: { func: FormAddGroup, data: {} },
    });
  };

  const handleAddDisciplie = () => {
    setShowModal(true);
    setDataForModal({
      title: `Дисципліни ${publicPanel.semester.name}`,
      size: 'xl',
      body: { func: FormAddDiscipline, data: {} },
    });
  };

  const handleAddAcademicLoad = () => {
    setShowModal(true);
    setDataForModal({
      title: `Навантаження ${publicPanel.semester.name}`,
      size: 'xl',
      body: { func: FormAddAcademicLoad, data: {} },
    });
  };

  return (
    <>
      <StaffHeader className="navbar sticky-top flex-md-nowrap p-0 shadow bg-light">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-dark">
          Розклад
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-dark"></span>
        </button>
      </StaffHeader>
      <div className="container-fluid">
        <div className="row">
          <StaffSidebar
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3 sidebar-sticky">
              <h6
                className="sidebar-heading d-flex justify-content-between align-items-center px-3 my-1 text-muted text-uppercase"
                onClick={() => setSetting(!setting)}
              >
                <span>НАЛАШТУВАННЯ: </span>
                {setting ? (
                  <FiMinusCircle size={'24px'} />
                ) : (
                  <FiPlusCircle size={'24px'} />
                )}
              </h6>
              <Collapse in={setting}>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleAddAcademicLoad}>
                      Навантаження
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleAddDisciplie}>
                      Дисципліни
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleAddGroup}>
                      Груповий фонд
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleAddTeacher}>
                      Викладацький фонд
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleAddAud}>
                      Аудиторний фонд
                    </a>
                  </li>
                </ul>
              </Collapse>
            </div>
          </StaffSidebar>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Export
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary dropdown-toggle"
                >
                  <FiCalendar />
                  This week
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default StaffWorkShop;
