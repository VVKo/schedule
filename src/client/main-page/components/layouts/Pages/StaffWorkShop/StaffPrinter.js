import React, { useContext, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button, ButtonGroup, ButtonToolbar, Col, Row } from 'react-bootstrap';
import { Form, Formik, useField } from 'formik';
import ForPrint from './PDFWorkShop/ForPrint';
import RozkladContext from '../../../../context/RozkladContext';


const MyCheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-check">
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? 'form-check-input is-invalid'
            : 'form-check-input'
        }
      />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
      <label htmlFor={props.id || props.name} className="form-check-label">
        {label}
      </label>
    </div>
  );
};
const StaffPrinter = () => {
  const { state } = useContext(RozkladContext);
  const [showGeneratorButton, setShowGeneratorButton] = useState(true);
  const [print, setPrint] = useState(false);
  const [grChoice, setGrChoice] = useState([]);
  const [dayChoice, setDayChoice] = useState([]);

  const { academicloadfond, currentSemester, disciplinefond } = state;
  if (!academicloadfond) return null;
  const groups = [
    ...new Set([
      ...academicloadfond[currentSemester.name].data
        .map(r => r[1])
        .join('+')
        .split('+')
        .map(r => r.split('гр')[0]),
    ]),
  ].sort();
  const forPRINT = {};
  disciplinefond[currentSemester.name].data.forEach(r => {
    forPRINT[r[0]] = r[1] === '' ? r[0] : r[1];
  });

  const MyForm = () => {
    return (
      <Formik
        initialValues={{
          groups: [],
          days: [],
        }}
        validate={values => {
          const errors = {};

          return errors;
        }}
        onSubmit={values => {
          setGrChoice(values.groups);
          setDayChoice(values.days);
          setShowGeneratorButton(false);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div role="group" aria-labelledby="checkbox-group">
              <Row>
                <Col>
                  <div id="checkbox-group">1 курс</div>
                  {['ПМ', 'КІ', 'КН', 'П', 'О', 'Ф', 'Ю'].map(sp => {
                    return (
                      <Row key={sp} className="border">
                        {groups
                          .filter(
                            gr => gr[0] === '1' && gr.split('-')[1] === sp
                          )
                          .map(v => (
                            <Col key={`${v}`}>
                              <MyCheckBox
                                label={`${v}`}
                                name="groups"
                                value={`${v}`}
                                type="checkbox"
                              />
                            </Col>
                          ))}
                      </Row>
                    );
                  })}

                  <div id="checkbox-group">2 курс</div>
                  {['ПМ', 'КІ', 'КН', 'П', 'О', 'Ф', 'Ю'].map(sp => {
                    return (
                      <Row key={sp} className="border">
                        {groups
                          .filter(
                            gr => gr[0] === '2' && gr.split('-')[1] === sp
                          )
                          .map(v => (
                            <Col key={`${v}`}>
                              <MyCheckBox
                                label={`${v}`}
                                name="groups"
                                value={`${v}`}
                                type="checkbox"
                              />
                            </Col>
                          ))}
                      </Row>
                    );
                  })}
                  <div id="checkbox-group">3 курс</div>
                  {['ПМ', 'КІ', 'КН', 'П', 'О', 'Ф', 'Ю'].map(sp => {
                    return (
                      <Row key={sp} className="border">
                        {groups
                          .filter(
                            gr => gr[0] === '3' && gr.split('-')[1] === sp
                          )
                          .map(v => (
                            <Col key={`${v}`}>
                              <MyCheckBox
                                label={`${v}`}
                                name="groups"
                                value={`${v}`}
                                type="checkbox"
                              />
                            </Col>
                          ))}
                      </Row>
                    );
                  })}
                  <div id="checkbox-group">4 курс</div>
                  {['ПМ', 'КІ', 'КН', 'П', 'О', 'Ф', 'Ю'].map(sp => {
                    return (
                      <Row key={sp} className="border">
                        {groups
                          .filter(
                            gr => gr[0] === '4' && gr.split('-')[1] === sp
                          )
                          .map(v => (
                            <Col key={`${v}`}>
                              <MyCheckBox
                                label={`${v}`}
                                name="groups"
                                value={`${v}`}
                                type="checkbox"
                              />
                            </Col>
                          ))}
                      </Row>
                    );
                  })}
                </Col>
                <Col>
                  <div id="checkbox-group">Дні</div>
                  <Row>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(v => (
                      <Col key={`${v}`}>
                        <MyCheckBox
                          label={`${v}`}
                          name="days"
                          value={`${v}`}
                          type="checkbox"
                        />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please wait...' : 'Вибрати'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Прінтер</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          {print && (
            <ButtonGroup className="me-2">
              <Button
                variant="outline-secondary"
                className="btn-sm"
                onClick={() => {
                  setShowGeneratorButton(true);
                }}
              >
                <PDFDownloadLink
                  document={
                    <ForPrint
                      fond={academicloadfond[currentSemester.name].data}
                      forPRINT={forPRINT}
                      groups={grChoice}
                      days={dayChoice}
                    />
                  }
                  fileName={`${grChoice.join('_')}_${dayChoice.join('_')}.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading
                      ? `Генерується документ ${grChoice.join(
                          '_'
                        )}_${dayChoice.join('_')}.pdf`
                      : 'Завантажити!'
                  }
                </PDFDownloadLink>
              </Button>
            </ButtonGroup>
          )}
          <ButtonGroup className="me-2">
            <Button
              variant="outline-secondary"
              className="btn-sm"
              onClick={() => setPrint(true)}
              disabled={showGeneratorButton}
            >
              Генерувати документ
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
      <MyForm />
    </>
  );
};

export default StaffPrinter;
