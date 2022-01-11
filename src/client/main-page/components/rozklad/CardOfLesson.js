import React from 'react';
import { Card } from 'react-bootstrap';

const CardOfLesson = props => {
  const Week = (list, bg) => {
    return list.map(o => {
      return (
        <Card
          bg={bg}
          key={`${o.col}${o.row}`}
          text={'white'}
          className="mb-2"
          row={o.row}
          col={o.col}
        >
          <Card.Header>{o.name.split('(')[0]}</Card.Header>
          <Card.Body>
            <Card.Title>
              {o.prepod
                .split(' ')
                .map((val, idx) => (idx === 0 ? val : `${val.slice(0, 1)}.`))
                .join(' ')}{' '}
            </Card.Title>
            <Card.Text>
              <h6>{o.group}</h6>
              <h5>{o.type}</h5>
              <h4>{o.aud}</h4>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
  };

  return (
    <>
      {Week(props.firstweek, 'primary')}
      {Week(props.secondweek, 'secondary')}
    </>
  );
};

export default CardOfLesson;
