import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import { Form, Row } from 'react-bootstrap';

const PrettyRozklad = props => {
  const [products, setProducts] = useState(props.products);
  const [columns, setColumns] = useState(props.columns);

  useEffect(() => {
    console.log('PrettyRozklad props.product');
    setProducts(() => props.products);
  }, [props.products]);

  useEffect(() => {
    const para = document.getElementById('para-select').value;

    para === 'ALL'
      ? setProducts(props.products)
      : setProducts(
          props.products.filter(pr => pr.id === Number(para.slice(0, 1)))
        );

    console.log('PrettyRozklad props changed');
  }, [props]);

  const handleChangePara = e => {
    e.target.value === 'ALL'
      ? setProducts(props.products)
      : setProducts(
          props.products.filter(
            pr => pr.id === Number(e.target.value.slice(0, 1))
          )
        );
  };

  const handleChangeDay = e => {
    e.target.value === 'WEEK'
      ? setColumns(props.columns)
      : setColumns([
          props.columns[0],
          ...props.columns.filter(pr => pr.text === e.target.value),
        ]);
  };

  return (
    <>
      <Form.Group as={Row} controlId="formGridState">
        <Form.Label>Виберіть пару</Form.Label>
        <Form.Control
          id={'para-select'}
          as="select"
          defaultValue="ALL"
          onChange={e => handleChangePara(e)}
        >
          <option>ALL</option>
          {['1п.', '2п.', '3п.', '4п.', '5п.', '6п.', '7п.', '8п.'].map(o => {
            return (
              <>
                <option>{o}</option>
              </>
            );
          })}
        </Form.Control>
        <Form.Label>Виберіть день</Form.Label>
        <Form.Control
          id={'day-select'}
          as="select"
          defaultValue="WEEK"
          onChange={e => handleChangeDay(e)}
        >
          <option>WEEK</option>
          {['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця"].map(o => {
            return (
              <>
                <option>{o}</option>
              </>
            );
          })}
        </Form.Control>
      </Form.Group>

      <BootstrapTable
        wrapperClasses="responsive"
        keyField="id"
        data={products}
        columns={columns}
        striped
      />
    </>
  );
};

export default PrettyRozklad;
