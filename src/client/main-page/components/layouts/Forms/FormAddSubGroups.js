import React, { useContext, useEffect } from 'react';
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  useField,
} from 'formik';
import * as Yup from 'yup';
import { Button, Col, Row } from 'react-bootstrap';
import RozkladContext from '../../../context/RozkladContext';

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select
        {...field}
        {...props}
        className={
          meta.touched && meta.error ? 'form-select is-invalid' : 'form-select'
        }
      />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
};

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

const FormAddSubGroups = ({ curgroup }) => {
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

  const subgroups = groupfond[currentSemester.name].data
    .filter(r => !r[0].includes('+') && r[0] === curgroup)
    .map(r => {
      const tmp = {};
      tmp.name = r[1] === '' ? curgroup : r[1];
      tmp.population = r[2];
      return tmp;
    });

  const SubGroupsSchema = Yup.object().shape({
    Підгрупи: Yup.array(
      Yup.object().shape({
        name: Yup.string().required('Обов`язкове поле'),
        population: Yup.number().required('Обов`язкове поле'),
      })
    ),
  });

  const MyForm = () => {
    return (
      <Formik
        initialValues={{ Підгрупи: subgroups }}
        validationSchema={SubGroupsSchema}
        onSubmit={values => {
          const { Підгрупи } = values;
          const subgs = subgroups.map(ss => ss.name);
          const arr = [];
          Підгрупи
            .filter(o => subgs.indexOf(o.name) === -1)
            .forEach(o => {
              arr.push([
                curgroup,
                o.name.trim(),
                o.population,
                `${curgroup}гр${o.name.trim()} -- ${o.population}`,
              ]);
            });

          arr &&
            addToGroupFond(
              currentSemester.name,
              currentAcademicYear.id,
              JSON.stringify(arr)
            );
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray
              name="Підгрупи"
              render={arrayHelpers => (
                <div>
                  {values.Підгрупи.map((friend, index) => (
                    <Row key={index}>
                      {/* <Field name={`Підгрупи[${index}].name`} /> */}
                      <Col xs={12} md={6}>
                        <MyTextInput
                          label="Підгрупа"
                          name={`Підгрупи[${index}].name`}
                          type="text"
                          placeholder="Підгрупа"
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <MyTextInput
                          label="к-ть студентів"
                          name={`Підгрупи[${index}].population`}
                          type="number"
                          placeholder="Введіть к-ть студентів"
                        />
                      </Col>
                    </Row>
                  ))}
                  <Row>
                    <Col xs={12} md={12} className="d-grid gap-2">
                      <div className="form-group">
                        <Button
                          onClick={() =>
                            arrayHelpers.push({ name: '', population: '' })
                          }
                        >
                          Додати підгрупу
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary mt-2">
                      Додати
                    </button>
                  </div>
                </div>
              )}
            />
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

export default FormAddSubGroups;
