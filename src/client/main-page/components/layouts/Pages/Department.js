import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';
import FineSchedule from '../Schedule/FineSchedule';
import FormAddAud from '../Forms/FormAddAud';
import FormAddTeacher from '../Forms/FormAddTeacher';
import FormAddGroup from '../Forms/FormAddGroup';
import FormAddDiscipline from "../Forms/FormAddDiscipline";
import FormAddAcademicLoad from "../Forms/FormAddAcademicLoad";

const FineHeader = () => {
  const { state } = useContext(RozkladContext);
  const { currentDep, currentAcademicYear, currentSemester } = state;
  if (!currentDep) return <Spinner />;
  return (
    currentDep && (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">{currentDep.Підрозділ}</li>
          <li className="breadcrumb-item">
            {currentAcademicYear
              ? currentAcademicYear.name
              : 'Виберіть навчальний рік'}
          </li>
          <li className="breadcrumb-item">
            {currentSemester ? currentSemester.name : 'Виберіть семестр'}
          </li>
        </ol>
      </nav>
    )
  );
};

const Department = () => {
  const params = useParams();
  const {
    state,
    dataLoaded,
    user,
    publicPanel,
    getUserData,
    setJsonID,
    setShowModal,
    setDataForModal,
    setCurrentDep,
  } = useContext(RozkladContext);

  const { departments } = state;

  const pidrozdil = departments[params.id];

  useEffect(() => {
    setCurrentDep(+params.id);
    getUserData({
      user,
      users: pidrozdil.users,
      jsonID: pidrozdil.JSON,
      xlsID: pidrozdil['ІД'],
    });
    setJsonID(pidrozdil.JSON);
  }, []);

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

  if (!dataLoaded) return <Spinner />;
  return (
    <>
      <FineHeader />
      {user.role === 'staff' &&
        publicPanel.semester.name !== 'Виберіть семестр' && (
          <>
            <nav className="navbar navbar-expand-lg bg-light">
              <div className="container-fluid">
                <a className="navbar-brand">НАЛАШТУВАННЯ: </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" onClick={handleAddAcademicLoad} href="#">
                        Навантаження
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" onClick={handleAddDisciplie} href="#">
                        Дисципліни
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" onClick={handleAddGroup} href="#">
                        Груповий фонд
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        onClick={handleAddTeacher}
                        href="#"
                      >
                        Викладацький фонд
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" onClick={handleAddAud} href="#">
                        Аудиторний фонд
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </>
        )}

      <FineSchedule weekNumber="1" />
      <hr />
      <FineSchedule weekNumber="2" />
    </>
  );
};

export default Department;
