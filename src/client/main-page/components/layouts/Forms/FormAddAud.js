import React, { useContext, useEffect } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { FaTrash } from 'react-icons/fa';
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

  const { audfond, currentSemester, currentAcademicYear } = state;

  useEffect(() => {
    console.log('audFOND', audfond);
  }, [audfond]);

  const MyTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Корпус</th>
            <th scope="col">Аудиторія</th>
            <th scope="col">Кількість п/м</th>
            <th scope="col">Тип аудиторії</th>
            <th scope="col">Шифр</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {audfond[currentSemester.name].data.map((r, idx) => {
            return (
              <tr key={`row${idx}`}>
                <th scope="row">{idx + 1}</th>
                {r.slice(0, 5).map((val, indx) => (
                  <td key={`val${idx}${indx}`}>{val}</td>
                ))}
                <td>
                  <FaTrash
                    data-row={idx + 4}
                    onClick={event => {
                      const row = +event.currentTarget.getAttribute('data-row');
                      deleteFromAudFond(
                        currentSemester.name,
                        currentAcademicYear.id,
                        row
                      );
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

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
      <MyTable />
      <MyForm />
    </>
  );
};

export default FormAddAud;
