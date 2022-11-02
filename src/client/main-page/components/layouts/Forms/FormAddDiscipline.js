import React, { useContext, useEffect } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { FaTrash } from 'react-icons/fa';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import RozkladContext from '../../../context/RozkladContext';

const DisciplineSchema = Yup.object().shape({
  Дисципліна: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Обов`язкове поле'),
  'Коротка назва': Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  ОП: Yup.string(),
  Шифр: Yup.string(),
});

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

const FormAddDiscipline = () => {
  const { state, addToDisciplineFond, deleteFromDisciplineFond } = useContext(
    RozkladContext
  );

  const {
    disciplinefond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
  } = state;

  useEffect(() => {}, [disciplinefond]);


  const MyForm = () => {
    return (
      <Formik
        initialValues={{
          Дисципліна: '',
          'Коротка назва': '',
          ОП: '',
          Шифр: '',
        }}
        validationSchema={DisciplineSchema}
        onSubmit={values => {
          const arr = [...Object.values(values)];
          // same shape as initial values
          // arr.push(
          //     `${values['Дисципліна']} ${values['Коротка назва']} ауд. -- (${values['кільксть п/м']} п.м.)`
          // );
          addToDisciplineFond(
            currentSemester.name,
            currentAcademicYear.id,
            JSON.stringify(arr)
          );
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form>
            <MyTextInput
              label="Дисципліна"
              name="Дисципліна"
              type="text"
              placeholder="Назва дисципліни з навчального плану"
            />
            <MyTextInput
              label="Коротка назва або абревіатура"
              name="Коротка назва"
              type="text"
              placeholder="Коротка назва або абревіатура"
            />
            <MyTextInput
              label="Освітня програма"
              name="ОП"
              type="text"
              placeholder="Освітня програма, рік"
            />
            <MyTextInput
              label="Шифр згідно з ОП"
              name="Шифр"
              type="text"
              placeholder="ОК1.1 або ВК2.2"
            />

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

export default FormAddDiscipline;
