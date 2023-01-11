import React, {useContext, useState} from 'react';
import { Alert } from 'react-bootstrap';
import RozkladContext from '../../../context/RozkladContext';
import { UploadCSVForm } from '../../Styled/UploadCSV/STYLED';

const UploadCSVLoadFond = ({ headers }) => {
  const { state, uploadToLoadFond, setShowModal } = useContext(RozkladContext);

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
        let validHeaders = true;
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
            validHeaders = false;
          }
        });

        const arr = [];
        if (validHeaders) {
          rows.slice(1).forEach(r => {
            if (r !== '') {
              const ar = r.split(';');
              ar.push('');
              arr.push(ar);
            }
          });

          // TODO Зробити нормальний валідатор
          uploadToLoadFond(currentSemester.name, currentAcademicYear.id, arr);
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

export default UploadCSVLoadFond;
