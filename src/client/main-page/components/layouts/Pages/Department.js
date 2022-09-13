import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RozkladContext from '../../../context/RozkladContext';
import Spinner from '../../Spinner/Spinner';
import FineSchedule from '../Schedule/FineSchedule';
import FormAddAud from '../Forms/FormAddAud';

const Department = () => {
  const params = useParams();
  const {
    dataLoaded,
    departmentList,
    user,
    getUserData,
    setJsonID,
    setShowModal,
    setDataForModal,
  } = useContext(RozkladContext);

  const pidrozdil = departmentList[params.id];

  useEffect(() => {
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
      title: 'Додати аудиторію',
      size: 'xl',
      body: { func: FormAddAud, data: {} },
    });
  };

  if (!dataLoaded) return <Spinner />;
  return (
    <>
      {user.role === 'staff' && (
        <>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Navbar
              </a>
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
                      Додати аудиторію
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
