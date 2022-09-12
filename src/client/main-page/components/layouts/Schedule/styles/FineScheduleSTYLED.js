import styled, { css } from 'styled-components';

export const WeekName = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;

  div {
    text-decoration: none;
    color: #000;
    display: flex;
    align-items: center;
    height: 98%;
    padding: 1em;
    box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    transition: transform 0.15s linear;
    width: 5em;
    transform: rotate(2deg);
    position: relative;
    top: 5px;
    background: #aff;
    margin-left: 2em;
    p.week-number {
      width: 100%;
      transform: rotate(270deg);
    }
    ${props =>
      props.wn === '2' &&
      css`
        background: #fca;
        transform: rotate(-2deg);
      `}
  }

  //h2 {
  //  text-decoration: none;
  //  color: #000;
  //  display: block;
  //  height: 98%;
  //  padding: 1em;
  //  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  //  transition: transform 0.15s linear;
  //  width: 5em;
  //  transform: rotate(2deg);
  //  position: relative;
  //  top: 5px;
  //  background: #aff;
  //  margin-left: 2em;
  //  span.week-number {
  //    transform: rotate(270deg);
  //  }

  //}
`;

export const Days = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const ParaContent = styled.div`
  display: flex;
  flex-direction: row;
  ////inline-size: 8em;
  //white-space: nowrap;
  //overflow: hidden;
  //text-overflow: ellipsis;

  div:nth-child(1) {
    display: flex;
    flex-grow: 2;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & > p {
    //width: 15rem;
    //padding: 0;
    //text-overflow: ellipsis;
    //word-wrap: break-word;
    width: 15rem;
    padding: 0;
    margin: auto 0;
    text-overflow: ellipsis;
    //word-wrap: break-word;
    //border: black solid 1px;
    border-radius: 0.4rem;
    align-items: center;
  }
`;

export const Para = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export const Day = styled.li`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  a {
    text-decoration: none;
    color: #000;
    ${props =>
      props.bg &&
      css`
        background: ${props.bg};
      `}
    display: block;
    height: 24em;
    width: 20em;
    padding: 1em;
    box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
    transform: rotate(-6deg);
    transition: transform 0.15s linear;
  }

  :nth-child(even) a {
    transform: rotate(4deg);
    position: relative;
    top: 5px;
  }
  :nth-child(3n) a {
    transform: rotate(-3deg);
    position: relative;
    top: -5px;
  }
  :nth-child(5n) a {
    transform: rotate(5deg);
    position: relative;
    top: -10px;
  }

  & ${Para} {
    font-family: 'Caveat';
    font-size: 2rem;
    //inline-size: 8em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    //.close,
    //.edit {
    //  position: absolute;
    //  top: 10px;
    //  right: 20px;
    //  cursor: pointer;
    //  background: none;
    //  border: none;
    //}
  }

  a:hover,
  a:focus {
    ${Para} {
      & > span {
        border: black solid 1px;
        border-radius: 0.2rem;
      }
    }
    ${ParaContent} {
      > p {
        font-size: 1.2rem;
        border: black solid 1px;
        flex-direction: column;
        > span {
          display: block;
        }

        span:nth-child(1) {
          font-size: 1.25rem;
        }
        span:nth-child(2) {
          display: flex;
          flex-grow: 2;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 1.1rem;
        }
        span:nth-child(3) {
          font-size: 1.1rem;
        }
        span:nth-child(4) {
          font-style: italic;
          font-weight: bold;
          font-size: 1.1rem;
        }
        span:nth-child(5) {
          display: flex;
          flex-grow: 2;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 1.4rem;
        }
      }
      flex-direction: column;
      white-space: normal;
      overflow: visible;
    }
    box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.7);
    transform: scale(1.5);
    position: relative;
    width: 23rem;
    overflow-y: scroll;

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
      background-color: #f5f5f5;
      border-radius: 10px;
    }

    ::-webkit-scrollbar {
      width: 10px;
      background-color: #f5f5f5;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #fff;
      background-image: -webkit-gradient(
        linear,
        40% 0%,
        75% 84%,
        from(#888),
        to(#333),
        color-stop(0.6, #555)
      );
    }
    z-index: 1005;
  }

  margin: 1em;
`;

export const WeekFineSchedule = styled.ul`
  list-style: none;
  //margin: 20px auto;
  display: flex;
  margin: 0;
  padding: 0;
  font-family: 'Open Sans Condensed';
  background: #666;
  color: #fff;
  h2 {
    font-weight: bold;
    font-size: 2rem;
  }
  p {
    font-family: 'Caveat';
    font-size: 2rem;
    //word-wrap: break-word;
    //word-break: break-all;
  }
`;
