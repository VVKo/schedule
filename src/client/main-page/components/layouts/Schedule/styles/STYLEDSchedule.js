import styled, { css } from 'styled-components';

const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;

export const Groups = styled.div`
  display: flex;
  flex-wrap: nowrap;
  color: antiquewhite;

  ${props =>
    props.oneGroup &&
    css`
      justify-content: space-around;
    `}
`;

export const Para = styled.div`
  display: flex;
  align-items: center;
  direction: ltr;
  flex-grow: inherit;
  border: 1px solid #999;
  border-radius: 5px;
  > div {
    &.paraNumber {
      padding: 2px;
      vertical-align: center;
      //transform: rotate(270deg);
      z-index: auto;
    }
    > div {
      border: 1px solid #999;
      border-radius: 5px;
      min-height: 30px;
    }
  }
  > div:nth-of-type(2) {
    flex-grow: 3;
  }
`;

export const Day = styled.div`
  display: flex;
 
  min-height: 200px; //${px2vw(200, 320)};
  //flex-direction: column;
  align-items:center;
  direction: ltr;
  //padding: ${px2vw(20)};
  padding: 0;
  margin: 0;
  //margin: ${px2vw(20)};
  background-color: ${props => props.bgColor};
  //height: 100%;
  border: 1px solid #999;

  font-size: 18px;
  color: #1c87c9;
  background-color: #eee;
  border-radius: 5px;
  >div {
    &.dayCaption{
      align-items: center;
      
    }
    
    
    &.no-showDay {
        display: none;
        visibility: hidden;
      }
        
    
  
  }

  >div:nth-of-type(2) {flex-grow: 3;}
  
`;

export const Week = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;

  > div {
    width: 200px;

    &.groupCaption {
      border: green solid 1px;
      position: sticky;
      top: 70px;
      z-index: auto;
    }
  }
`;

export const GroupCaption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  border: 1px solid #999;

  font-size: 18px;
  color: #1c87c9;
  background-color: #eee;
  border-radius: 5px;
`;

export const DayCaption = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;

  min-height: 50px;
  border: 1px solid #999;
  width: 50px;

  font-size: 32px;
  font-weight: bold;
  color: #1c87c9;
  background-color: rgba(0, 0, 0, 0.1274);
  border-radius: 5px;
  
`;

export const DayContent = styled.div`
  flex-direction: column;
`;
