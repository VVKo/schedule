import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { UploadCSVForm } from '../../Styled/UploadCSV/STYLED';
import RozkladContext from '../../../context/RozkladContext';

const UploadCSV = ({ headers }) => {
  const {
    state,
    deleteFromAudFond,
    uploadToAudFond,
    setShowModal,
  } = useContext(RozkladContext);

  const {
    audfond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
  } = state;
  const [alert, setAlert] = useState({
    variant: 'primary',
    body: (
      <>
        No Plugins <b>Just Javascript</b>
      </>
    ),
  });

  const handleExportAud = event => {
    // const folderId = props.targetFolder.id;
    // event.preventDefault();

    const file = event.target.files[0];

    const extension = file.name.slice(
      (Math.max(0, file.name.lastIndexOf('.')) || Infinity) + 1
    );

    if (extension.toLowerCase() !== 'csv') {
      setAlert({
        variant: 'danger',
        body: (
          <>
            <b>Не той файл!!</b>
          </>
        ),
      });
      const dt = new DataTransfer();
      const input = document.getElementById('file-upload');

      input.files = dt.files;
    } else {
      setAlert({ variant: 'primary', body: <>Ok</> });
      const fr = new FileReader();
      fr.readAsText(file);
      fr.onload = function(e) {
        let validator = true;
        const content = fr.result;
        const rows = content.split('\n');
        const hdrs = rows[0];
        hdrs.split(';').forEach((h, idx) => {
          if (h.trim() !== headers[idx]) {
            setAlert(prevState => {
              const tmp = { ...prevState };
              tmp.variant = 'warning';
              tmp.body = <> Файл не вірного формату!</>;
              return tmp;
            });
            validator = false;
          }
        });

        const arr = [];
        if (validator) {
          rows.slice(1).forEach(r => {
            if (r !== '') {
              const ar = r.split(';');
              ar[3] = ar[3] === '' ? 'інші.' : 'Лаб.';
              ar.push(`${ar[0]} ${ar[1]} ауд. -- (${ar[2]} п.м.)`);

              arr.push(ar);
            }
          });

          console.log('content', arr);
          uploadToAudFond(currentSemester.name, currentAcademicYear.id, arr);
          setShowModal(false);
        }
      };
    }
  };

  return (
    <>
      <Alert variant={alert.variant}>{alert.body}</Alert>

      <UploadCSVForm id="file-upload-form">
        <input
          id="file-upload"
          type="file"
          name="fileUpload"
          accept=".csv"
          onChange={handleExportAud}
        />

        <label htmlFor="file-upload" id="file-drag">
          <div id="start">
            <i className="fa fa-download" aria-hidden="true"></i>
            <span id="file-upload-btn" className="btn btn-primary">
              Виберіть файл
            </span>
          </div>
        </label>
      </UploadCSVForm>
    </>
  );
};

export default UploadCSV;
