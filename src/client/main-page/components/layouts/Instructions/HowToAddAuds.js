import React from 'react';
import { Table } from 'react-bootstrap';

const HowToAddAuds = ({ headers }) => {
  return (
    <>
      <h2>Інструкція як додати аудиторії</h2>
      <ol>
        <li>
          <h4>
            Сторіть таблицю (xls, xlsx, google) з наступним першим рядком як у
            зразку
          </h4>
          <Table striped bordered hover className="align-middle">
            <thead>
              <tr>
                <th scope="col">{headers[0]}</th>
                <th scope="col">{headers[1]}</th>
                <th scope="col">{headers[2]}</th>
                <th scope="col">{headers[3]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20 к.</td>
                <td>1</td>
                <td>40</td>
                <td></td>
              </tr>
              <tr>
                <td>20 к.</td>
                <td>2</td>
                <td>20</td>
                <td>КК</td>
              </tr>
              <tr>
                <td>ВК</td>
                <td>2</td>
                <td>20</td>
                <td></td>
              </tr>
              <tr>
                <td>Стадіон</td>
                <td>А</td>
                <td>200</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </li>
        <li>
          <h4>
            У чарунці "Тип аудиторії" ставите КК, якщо дана аудиторія є
            комп`ютерним класом, в іншому випадку - залишаєте порожньою
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

export default HowToAddAuds;
