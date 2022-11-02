import React, { useContext, useEffect } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';

import RozkladContext from '../../../context/RozkladContext';

const TeacherSchema = Yup.object().shape({
  викладач: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Обов`язкове поле'),
  email: Yup.string().email('Invalid email address'),
  посада: Yup.string(),
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

const FormAddTeacher = () => {
  const { state, addToTeacherFond } = useContext(
    RozkladContext
  );
  const {
    teacherfond,
    currentSemester,
    currentAcademicYear,
  } = state;
  useEffect(() => {}, [teacherfond]);



  const MyForm = () => {
    return (
      <Formik
        initialValues={{
          викладач: '',
          email: '',
          посада: '',
        }}
        validationSchema={TeacherSchema}
        onSubmit={values => {
          const arr = [...Object.values(values)];

          addToTeacherFond(currentSemester.name, currentAcademicYear.id, arr);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <MyTextInput
              label="ПІП викладача"
              name="викладач"
              type="text"
              placeholder="ПІП викладача"
            />
            <MyTextInput
              label="Корпоративна пошта"
              name="email"
              type="text"
              placeholder="Корпоративна пошта"
            />
            <MyTextInput
              label="Посада"
              name="посада"
              type="text"
              placeholder="Посада"
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

export default FormAddTeacher;
