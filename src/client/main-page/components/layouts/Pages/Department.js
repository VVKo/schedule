import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';
import FineSchedule from '../Schedule/FineSchedule';
import FormAddAud from '../Forms/FormAddAud';

const FineHeader = () => {
  const { state } = useContext(RozkladContext);
  const { currentDep, currentAcademicYear } = state;
  if (!currentDep) return <Spinner />;
  return (
    currentDep && (
      <div className="alert alert-light" role="alert">
        {currentDep.Підрозділ}{' '}
        {currentAcademicYear
          ? currentAcademicYear.name
          : 'Виберіть навчальний рік'}
      </div>
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
      title: `Аудиторний фонд ${publicPanel.semester}`,
      size: 'xl',
      body: { func: FormAddAud, data: { semester: publicPanel.semester } },
    });
  };

  if (!dataLoaded) return <Spinner />;
  return (
    <>
      <FineHeader />
      {user.role === 'staff' && publicPanel.semester !== 'Виберіть семестр' && (
        <>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand">Адмін</a>
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
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Features
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Pricing
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleAddAud} href="#">
                      Аудиторний фонд {publicPanel.semester}
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
