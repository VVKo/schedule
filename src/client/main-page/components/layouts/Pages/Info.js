import React, { useContext } from 'react';
import RozkladContext from '../../../context/RozkladContext';
import {
  InfoCard,
  InfoDeleteButton,
  InfoDivSTYLED,
} from '../../Styled/StyledComponents';

const Info = ({ info }) => {
  const { gr, day, para, w } = info;
  const { data, groupsWeek, publicPanel, removeAudFromLocalData } = useContext(RozkladContext);
  console.log('groupsWeek', groupsWeek);
  const detalInfo = groupsWeek[publicPanel.semester][gr][day][para][w];

  return (
    <div>
      {detalInfo.length !== 0 ? (
        detalInfo.map(o => (
          <InfoDivSTYLED key={o.id}>
            <InfoCard>
              <div>{day}</div>

              <div>
                {para} {w}
              </div>
              <div>
                Група:{' '}
                {
                  data[publicPanel.semester].data.filter(r => r.id == o.id)[0][
                    'групаНавантаження'
                  ]
                }{' '}
              </div>
              <div>
                Дисципліна:{' '}
                {
                  data[publicPanel.semester].data.filter(r => r.id == o.id)[0][
                    'Назва дисципліни'
                  ]
                }{' '}
              </div>
              <div>
                Тип:{' '}
                {
                  data[publicPanel.semester].data.filter(r => r.id == o.id)[0][
                    'тип'
                  ]
                }
              </div>
              <div>Аудтиторія: {o.aud}</div>
              <div>
                Викладач:{' '}
                {
                  data[publicPanel.semester].data.filter(r => r.id == o.id)[0][
                    'викладач'
                  ]
                }
              </div>
            </InfoCard>
            <InfoDeleteButton onClick={()=>removeAudFromLocalData({id: o.id, gr, day, para, w, aud: o.aud})}>Видалити</InfoDeleteButton>
          </InfoDivSTYLED>
        ))
      ) : (
        <div>Вікно</div>
      )}
    </div>
  );
};

export default Info;
