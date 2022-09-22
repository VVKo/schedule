import React, { useContext, useEffect } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { FaTrash } from 'react-icons/fa';
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

const FormAddAcademicLoad = () => {
  const {
    state,
    deleteFromAcademicLoadFond,
    addToAcademicLoadFond,
  } = useContext(RozkladContext);

  const {
    teacherfond,
    groupfond,
    currentSemester,
    currentAcademicYear,
    academicloadfond,
    disciplinefond,
  } = state;

  const MyTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Дисципліна</th>
            <th scope="col">Група</th>
            <th scope="col">Тип заняття</th>
            <th scope="col">К-ть годин</th>
            <th scope="col">Викладач</th>
            <th scope="col">К-ть тижнів</th>
            <th scope="col">год/тиждень</th>
            <th scope="col">Виставлено</th>
            <th scope="col">Дії</th>
          </tr>
        </thead>
        <tbody>
          {academicloadfond[currentSemester.name].data.map((r, idx) => {
            return (
              <tr key={`row${idx}`}>
                <th scope="row">{idx + 1}</th>
                {r.slice(0, 8).map((val, indx) => (
                  <td key={`val${idx}${indx}`}>{val}</td>
                ))}
                <td>
                  <FaTrash
                    data-row={idx + 4}
                    onClick={event => {
                      const row = +event.currentTarget.getAttribute('data-row');
                      deleteFromAcademicLoadFond(
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
          Дисципліна: '',
          група: '',
          тип: '',
          години: '',
          викладач: '',
          'к-ть тижнів': '',
        }}
        validationSchema={Yup.object().shape({
          Дисципліна: Yup.string()
            .oneOf(
              [...disciplinefond[currentSemester.name].data.map(r => r[0])],
              'Даної дисципліни немає у фонді, спочатку додайте її до фонду'
            )
            .required('Обов`язкове поле'),
          група: Yup.string()
            .oneOf([
              ...groupfond[currentSemester.name].data.map(
                r => r[3].split(' -- ')[0]
              ),
            ])
            .required('Обов`язкове поле'),
          тип: Yup.string()
            .oneOf(['Лек.', 'Лаб.', 'Прак.', 'Сем.'])
            .required('Обов`язкове поле'),
          години: Yup.number()
            .min(1)
            .required('Обов`язкове поле'),
          викладач: Yup.string()
            .oneOf([...teacherfond[currentSemester.name].data.map(r => r[0])])
            .required('Обов`язкове поле'),
          'к-ть тижнів': Yup.number()
            .min(1)
            .required('Обов`язкове поле'),
        })}
        onSubmit={values => {
          const arr = [...Object.values(values)];
          // same shape as initial values
          // arr.push(
          //     `${values['Дисципліна']} ${values['Коротка назва']} ауд. -- (${values['кільксть п/м']} п.м.)`
          // );
          arr.push(values.години / values['к-ть тижнів']);
          arr.push('');
          // console.log(arr);
          addToAcademicLoadFond(
            currentSemester.name,
            currentAcademicYear.id,
            JSON.stringify(arr)
          );
        }}
      >
        {({ handleSubmit, errors, touched, isSubmitting, isValidating }) => (
          <Form onSubmit={handleSubmit}>
            <MySelect label="Навчальна дисципліна" name="Дисципліна">
              <option value="">Оберіть дисципліну з фонду</option>
              {disciplinefond[currentSemester.name].data.map((r, idx) => (
                <option key={idx} value={`${r[0]}`}>
                  {r[0]}
                </option>
              ))}
            </MySelect>

            <MySelect label="Група або групи" name="група">
              <option value="">Оберіть групу з фонду</option>
              {groupfond[currentSemester.name].data.map((r, idx) => (
                <option key={idx} value={`${r[3].split(' -- ')[0]}`}>
                  {r[3].split(' -- ')[0]}
                </option>
              ))}
            </MySelect>

            <MySelect label="Тип заняття" name="тип">
              <option value="">Оберіть тип заняття</option>
              {['Лек.', 'Лаб.', 'Прак.', 'Сем.'].map((r, idx) => (
                <option key={idx} value={`${r}`}>
                  {r}
                </option>
              ))}
            </MySelect>

            <MyTextInput label="Кількість годин" name="години" type="number" />

            <MySelect label="Викладач" name="викладач">
              <option value="">Оберіть викладача з фонду</option>
              {teacherfond[currentSemester.name].data.map((r, idx) => (
                <option key={idx} value={`${r[0]}`}>
                  {r[0]}
                </option>
              ))}
            </MySelect>

            <MyTextInput
              label="Кількість тижнів"
              name="к-ть тижнів"
              type="number"
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

export default FormAddAcademicLoad;
