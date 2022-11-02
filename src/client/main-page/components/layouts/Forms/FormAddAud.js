import React, { useContext, useEffect } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';

import RozkladContext from '../../../context/RozkladContext';

const SignupSchema = Yup.object().shape({
  Корпус: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Обов`язкове поле'),
  аудиторія: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  'кільксть п/м': Yup.number()
    .min(1, 'Має бути хоча б одне п/м')
    .max(100)
    .required('Обов`язкове поле'),
  тип: Yup.string()
    .oneOf(['Лаб.', 'інші.'], 'Не вірний тип')
    .required('Обов`язкове поле'),
});

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

const FormAddAud = () => {
  const { state, deleteFromAudFond, addToAudFond } = useContext(RozkladContext);

  const {
    audfond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
  } = state;

  useEffect(() => {
    // console.log('audFOND', audfond);
  }, [audfond]);

  const MyForm = () => {
    return (
      <Formik
        initialValues={{
          Корпус: '',
          аудиторія: '',
          'кільксть п/м': 0,
          тип: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          const arr = [...Object.values(values)];
          // same shape as initial values
          arr.push(
            `${values['Корпус']} ${values['аудиторія']} ауд. -- (${values['кільксть п/м']} п.м.)`
          );
          addToAudFond(currentSemester.name, currentAcademicYear.id, arr);
        }}
      >
        {({ handleSubmit, errors, touched, isSubmitting, isValidating }) => (
          <Form onSubmit={handleSubmit}>
            <MyTextInput
              label="Корпус або Заклад"
              name="Корпус"
              type="text"
              placeholder="1 к. або назва закладу"
            />
            <MyTextInput
              label="Аудиторія"
              name="аудиторія"
              type="text"
              placeholder="Аудиторія"
            />
            <MyTextInput
              label="Кількість п/м"
              name="кільксть п/м"
              type="number"
            />
            <MySelect label="Тип" name="тип">
              <option value="">Оберіть тип аудиторії</option>
              <option value="Лаб.">Комп`ютерний клас</option>
              <option value="інші.">Всі інші</option>
            </MySelect>

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

export default FormAddAud;
