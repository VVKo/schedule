import React, { useContext, useEffect } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { FaTrash } from 'react-icons/fa';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
  const { state, deleteFromTeacherFond, addToTeacherFond } = useContext(
    RozkladContext
  );
  const {
    teacherfond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
  } = state;
  useEffect(() => {}, [teacherfond]);

  const isTeacherInAcademicLoad = teacher => {
    return (
      academicloadfond[currentSemester.name].data.filter(r => r[4] === teacher)
        .length === 0
    );
  };

  const MyTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Викладач</th>
            <th scope="col">Корпоративна пошта</th>
            <th scope="col">Посада</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {teacherfond[currentSemester.name].data.map((r, idx) => {
            return (
              <tr key={`row${idx}`}>
                <th scope="row">{idx + 1}</th>
                {r.slice(0, 3).map((val, indx) => (
                  <td key={`val${idx}${indx}`}>{val}</td>
                ))}

                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      {!isTeacherInAcademicLoad(r[0])
                        ? 'Наразі видалити не можливо'
                        : 'Видалити з фонду'}
                    </Tooltip>
                  }
                >
                  <td>
                    <Button
                      variant={
                        isTeacherInAcademicLoad(r[0])
                          ? 'outline-danger'
                          : 'outline-dark'
                      }
                      disabled={!isTeacherInAcademicLoad(r[0])}
                      data-row={idx + 4}
                      onClick={event => {
                        const row = +event.currentTarget.getAttribute(
                          'data-row'
                        );
                        deleteFromTeacherFond(
                          currentSemester.name,
                          currentAcademicYear.id,
                          row
                        );
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </OverlayTrigger>
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
      <MyTable />
      <MyForm />
    </>
  );
};

export default FormAddTeacher;
