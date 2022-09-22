import React, { useContext, useEffect } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { FaTrash } from 'react-icons/fa';
import RozkladContext from '../../../context/RozkladContext';

const GroupSchema = Yup.object().shape({
  Група: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Обов`язкове поле'),
  'к-ть студентів': Yup.number()
    .min(1)
    .required('Обов`язкове поле'),
  підгрупи: Yup.string(),
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

const FormAddGroup = () => {
  const { state, addToGroupFond, deleteFromGroupFond } = useContext(
    RozkladContext
  );
  const { groupfond, currentSemester, currentAcademicYear } = state;
  useEffect(() => {
    console.log('groupFOND', groupfond);
  }, [groupfond]);

  const MyTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Група</th>
            <th scope="col">Підгрупа</th>
            <th scope="col">К-ть студентів</th>
            <th scope="col">Робоча назва</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {groupfond[currentSemester.name].data.map((r, idx) => {
            return (
              <tr key={`row${idx}`}>
                <th scope="row">{idx + 1}</th>
                {r.slice(0, 4).map((val, indx) => (
                  <td key={`val${idx}${indx}`}>{val}</td>
                ))}
                <td>
                  <FaTrash
                    data-row={idx + 4}
                    onClick={event => {
                      const row = +event.currentTarget.getAttribute('data-row');
                      deleteFromGroupFond(
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
          Група: '',
          'к-ть студентів': 0,
          підгрупи: '',
        }}
        validationSchema={GroupSchema}
        onSubmit={values => {
          const arr = [];
          if (values.Група.includes(',')) {
            const workGrName = values.Група
              .split(',')
              .map(r => `${r.trim()}гр`)
              .join('+').toString();
            arr.push([
              workGrName,
              '',
              values['к-ть студентів'],
              `${workGrName} -- ${values['к-ть студентів']}`,
            ]);
          } else {
            arr.push([
              values.Група,
              '',
              values['к-ть студентів'],
              `${values.Група}гр -- ${values['к-ть студентів']}`,
            ]);
            values.підгрупи.split(',').forEach(sub => {
              const [subgr, population] = sub.trim().split('--');
              arr.push([
                values.Група,
                subgr,
                +population.trim(),
                `${values.Група}гр${subgr} -- ${population}`,
              ]);
            });
          }
          console.log(JSON.stringify(arr));
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
              label="Шифр групи"
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
            <MyTextInput
              label="Підгрупи"
              name="підгрупи"
              type="text"
              placeholder="підгупа1--к-ть студентів, підгрупа2--к-ть студентів"
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
      <MyTable />
      <MyForm />
    </>
  );
};

export default FormAddGroup;
