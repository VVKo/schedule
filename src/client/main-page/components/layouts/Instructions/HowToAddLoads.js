import React from 'react';
import { Table } from 'react-bootstrap';

const HowToAddLoads = ({ headers }) => {
  return (
    <>
      <h2>Інструкція як додати навантаження</h2>
      <ol>
        <li>
          <h4>
            Сторіть таблицю (xls, xlsx, google) з наступним першим рядком як у
            зразку
          </h4>
          <Table striped bordered hover className="align-middle">
            <thead>
              <tr>
                {headers.map((h, idx) => (
                  <th key={`s${idx}`} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {headers.map((h, idx) => (
                  <th key={`s${idx}`} scope="col"></th>
                ))}
              </tr>
            </tbody>
          </Table>
        </li>
        <li>
          <h4>
            У чарунці "група" має бути шифр групи або "потоку"
          </h4>
        </li>
        <li>
          <h4>
            У чарунці "тип" має бути одне зі значень 'Лек.', 'Прак.', 'Лаб.' або 'Сем.'
          </h4>
        </li>
        <li>
          <h4>Збережіть даний файл як (.csv) вказавши як роділювач ";"</h4>
        </li>
        <li>
          <h4>Завантажте файл з розширенням (.csv)</h4>
        </li>
      </ol>
    </>
  );
};

export default HowToAddLoads;
