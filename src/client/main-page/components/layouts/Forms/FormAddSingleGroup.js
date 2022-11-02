import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { Form, Formik, useField } from 'formik';
import RozkladContext from '../../../context/RozkladContext';

const GroupSchema = Yup.object().shape({
  Група: Yup.string()
    .trim()
    .required('Обов`язкове поле')
    .matches(/^((?!гр).)*$/, "Назва групи не повинна містити 'гр'"),
  'к-ть студентів': Yup.number()
    .min(1)
    .required('Обов`язкове поле'),
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

const FormAddSingleGroup = () => {
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
          Група: '',
          'к-ть студентів': 0,
        }}
        validationSchema={GroupSchema}
        validate={values => {
          const errors = {};
          if (
            groupfond[currentSemester.name].data
              .map(r => r[0])
              .indexOf(values.Група.trim()) !== -1
          ) {
            errors.Група = 'Така група вже є у фонді!';
          }

          return errors;
        }}
        onSubmit={values => {
          const arr = [];
          arr.push([
            values.Група.trim(),
            '',
            values['к-ть студентів'],
            `${values.Група.trim()}гр -- ${values['к-ть студентів']}`,
          ]);

          // console.log(arr);
          addToGroupFond(
            currentSemester.name,
            currentAcademicYear.id,
            JSON.stringify(arr)
          );
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <MyTextInput
              label="Введіть назву групи"
              name="Група"
              type="text"
              placeholder="Шифр групи"
            />
            <MyTextInput
              label="Кількість студентів"
              name="к-ть студентів"
              type="number"
              placeholder="Кількість студентів"
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

export default FormAddSingleGroup;
