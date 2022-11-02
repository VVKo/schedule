import React, { useContext, useEffect } from 'react';
import { Field, Form, Formik, useField } from 'formik';
import { Col, Row } from 'react-bootstrap';
import RozkladContext from '../../../context/RozkladContext';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? 'form-control is-invalid'
            : 'form-control'
        }
      />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
};

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

const FormAddStreamGroups = () => {
  const { state, addToGroupFond, deleteFromGroupFond } = useContext(
    RozkladContext
  );
  const {
    groupfond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
  } = state;
  useEffect(() => {}, [groupfond]);

  const MyForm = () => {
    return (
      <Formik
        initialValues={{
          checked: [],
        }}
        validate={values => {
          // alert(values);
          const errors = {};
          // if (
          //   groupfond[currentSemester.name].data
          //     .map(r => r[0])
          //     .indexOf(values.Група.trim()) !== -1
          // ) {
          //   errors.Група = 'Така група вже є у фонді!';
          // }

          return errors;
        }}
        onSubmit={values => {
          const arr = [];
          const maybe = values.checked.map(v => {
            const tmp = {};
            if (v.toString().includes('гр')) {
              tmp.gr = v;
              const [g, sg] = v.split('гр');
              tmp.population = groupfond[currentSemester.name].data.filter(
                r => r[0].toString() === g && r[1].toString() === sg
              )[0][2];
            } else {
              tmp.gr = `${v}гр`;
              tmp.population = groupfond[currentSemester.name].data.filter(
                r => r[0].toString() === v && r[1] === ''
              )[0][2];
            }
            return tmp;
          });
          arr.push([
            maybe.map(o => o.gr).join('+'),
            '',
            maybe
              .map(o => o.population)
              .reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
              ),
            `${maybe.map(o => o.gr).join('+')} -- ${maybe
              .map(o => o.population)
              .reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
              )}`,
          ]);

          // console.log(arr);
          if (values.checked.length !== 1) {
            addToGroupFond(
              currentSemester.name,
              currentAcademicYear.id,
              JSON.stringify(arr)
            );
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <div role="group" aria-labelledby="checkbox-group">
              <Row>
                <Col>
                  <div id="checkbox-group">Групи</div>
                  {groupfond[currentSemester.name].data
                    .filter(r => !r[0].toString().includes('+') && r[1] === '')
                    .map(r => r[0])
                    .map(v => (
                      <MyCheckBox
                        key={`${v}`}
                        label={`${v}`}
                        name="checked"
                        value={`${v}`}
                        type="checkbox"
                      />
                    ))}
                </Col>
                <Col>
                  <div id="checkbox-group">Підгрупи</div>
                  {groupfond[currentSemester.name].data
                    .filter(r => !r[0].toString().includes('+') && r[1] !== '')
                    .map(r => r[3].split(' -- ')[0])
                    .map(v => (
                      <MyCheckBox
                        key={`${v}`}
                        label={`${v}`}
                        name="checked"
                        value={`${v}`}
                        type="checkbox"
                      />
                    ))}
                </Col>
              </Row>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please wait...' : 'Додати'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  };
  return (
    <>
      <MyForm />
    </>
  );
};

export default FormAddStreamGroups;
