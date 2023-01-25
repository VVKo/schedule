import styled, { keyframes, css } from 'styled-components';

export const StaffSidebar = styled.nav.attrs(() => {})`
  position: fixed;
  top: 130px;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 767.98px) {
    & {
      top: 5rem;
    }
  }

  .sidebar-sticky {
    height: calc(100vh - 48px);
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  & .nav-link {
    font-weight: 500;
    color: #333;
  }

  & .nav-link .feather {
    margin-right: 4px;
    color: #727272;
  }

  & .nav-link.active {
    color: #2470dc;
  }

  & .nav-link:hover .feather,
  & .nav-link.active .feather {
    color: inherit;
  }

  .sidebar-heading {
    font-size: 0.75rem;
  }
`;

export const StaffHeader = styled.header.attrs(() => {})`
  .navbar-brand {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
  }

  .navbar-toggler {
    top: 0.25rem;
    right: 1rem;
  }
`;

export const StaffSchedule = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: auto auto 1fr;
  margin: 2rem;
`;

export const ParasLine = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 40px);
  border: 2px black solid;
  & > div {
    font: bold 12px Sans-Serif;
    border: aliceblue 2px do;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: #369;
    color: #fff;
    padding: 5px 10px;
    margin: 0 0 10px 0;
    line-height: 24px;
  }
`;

export const DayLine = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 240px);
  border: 2px black solid;
  & > div {
    font: bold 12px Sans-Serif;
    border: aliceblue 2px do;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: #369;
    color: #fff;
    padding: 5px 10px;
    margin: 0 0 10px 0;
    line-height: 24px;
  }
`;

export const Day = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 40px);

  & > div {
    border: #aaa solid 1px;
    border-radius: 3px;
  }

  & div:nth-child(1) {
    justify-content: center;
    align-items: center;
  }
`;

export const ParaList = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 40px);

  & > div {
    border: #aaa solid 1px;
    border-radius: 3px;
    font-weight: bold;
    font-size: 1.2rem;
    justify-content: center;
    align-items: center;
  }
`;

export const Week = styled.div`
  display: grid;
  grid-gap: 1px 1px;
  grid-template-rows: 40px repeat(6, 1fr);
  grid-template-columns: 50px 75px repeat(5, 1fr);

  .weeknumber {
    grid-row-start: 1;
    grid-row-end: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background: antiquewhite;

    border: #aaa solid 1px;
    border-radius: 3px;
    font-size: 1.2rem;
    @media (max-width: 900px) {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 3;
    }
  }

  .paralist {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 2;
    grid-column-end: 3;
    display: grid;
    grid-gap: 1px 1px;
    grid-template-rows: 40px repeat(6, 1fr);
    > div {
      display: flex;
      border: #000 solid 1px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 1.2rem;
      justify-content: center;
      align-items: center;
      &.monday {
        display: none;
      }
    }
    
    @media (max-width: 900px) {
      //display: none;
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }

  .paralist.tuesday {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 2;
    grid-column-end: 3;
    display: grid;
    grid-gap: 1px 1px;
    grid-template-rows: 40px repeat(6, 1fr);
    > div {
      display: none;
      border: #000 solid 1px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 1.2rem;
      justify-content: center;
      align-items: center;
    }
    @media (max-width: 900px) {
      > div {
        display: flex;
      }
      grid-row-start: 3;
      grid-row-end: 4;
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }

  .paralist.wednesday {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 2;
    grid-column-end: 3;
    display: grid;
    grid-gap: 1px 1px;
    grid-template-rows: 40px repeat(6, 1fr);
    > div {
      display: none;
      border: #000 solid 1px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 1.2rem;
      justify-content: center;
      align-items: center;
    }
    @media (max-width: 900px) {
      > div {
        display: flex;
      }
      grid-row-start: 4;
      grid-row-end: 5;
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }

  .paralist.thursday {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 2;
    grid-column-end: 3;
    display: grid;
    grid-gap: 1px 1px;
    grid-template-rows: 40px repeat(6, 1fr);
    > div {
      display: none;
      border: #000 solid 1px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 1.2rem;
      justify-content: center;
      align-items: center;
    }
    @media (max-width: 900px) {
      > div {
        display: flex;
      }
      grid-row-start: 5;
      grid-row-end: 6;
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }

  .paralist.friday {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 2;
    grid-column-end: 3;
    display: grid;
    grid-gap: 1px 1px;
    grid-template-rows: 40px repeat(6, 1fr);
    > div {
      display: none;
      border: #000 solid 1px;
      border-radius: 3px;
      font-weight: bold;
      font-size: 1.2rem;
      justify-content: center;
      align-items: center;
    }
    @media (max-width: 900px) {
      > div {
        display: flex;
      }
      grid-row-start: 6;
      grid-row-end: 7;
      grid-column-start: 1;
      grid-column-end: 2;
    }
  }
  
  .monday {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 3;
    grid-column-end: 4;
    display: grid;
    grid-template-rows: 40px repeat(6, 1fr);
    grid-template-columns: 1fr;
    > div {
      display: flex;
      border: #aaa solid 1px;
      border-radius: 3px;
      align-items: center;
    }
    & div:nth-child(1).dayname {
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    @media (max-width: 900px) {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }

  .tuesday {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 4;
    grid-column-end: 5;
    display: grid;
    grid-template-rows: 40px repeat(6, 1fr);
    grid-template-columns: 1fr;
    > div {
      display: flex;
      border: #aaa solid 1px;
      border-radius: 3px;
      align-items: center;
    }
    & div:nth-child(1).dayname {
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    @media (max-width: 900px) {
      grid-row-start: 3;
      grid-row-end: 4;
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }

  .wednesday {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 5;
    grid-column-end: 6;
    display: grid;
    grid-template-rows: 40px repeat(6, 1fr);
    grid-template-columns: 1fr;
    > div {
      display: flex;
      border: #aaa solid 1px;
      border-radius: 3px;
      align-items: center;
    }
    & div:nth-child(1).dayname {
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    @media (max-width: 900px) {
      grid-row-start: 4;
      grid-row-end: 5;
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }

  .thursday {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 6;
    grid-column-end: 7;
    display: grid;
    grid-template-rows: 40px repeat(6, 1fr);
    grid-template-columns: 1fr;
    > div {
      display: flex;
      border: #aaa solid 1px;
      border-radius: 3px;
      align-items: center;
    }
    & div:nth-child(1).dayname {
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    @media (max-width: 900px) {
      grid-row-start: 5;
      grid-row-end: 6;
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }

  .friday {
    grid-row-start: 1;
    grid-row-end: 10;
    grid-column-start: 7;
    grid-column-end: 8;
    display: grid;
    grid-template-rows: 40px repeat(6, 1fr);
    grid-template-columns: 1fr;
    > div {
      display: flex;
      border: #aaa solid 1px;
      border-radius: 3px;
      align-items: center;
    }
    & div:nth-child(1).dayname {
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: uppercase;
    }
    @media (max-width: 900px) {
      grid-row-start: 6;
      grid-row-end: 7;
      grid-column-start: 2;
      grid-column-end: 3;
    }
  }

  @media (max-width: 900px) {
    grid-template-rows: 40px auto auto auto auto auto auto;
    grid-template-columns: 75px auto;
  }
`;

export const InfoAboutDisciplines = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoDiscipline = styled.div`
  display: grid;
  grid-template-columns: 30px 4fr 2fr 1fr 3fr 1fr 1fr 30px;
  > div {
    display: flex;
    border: #aaa solid 1px;
    border-radius: 3px;
    align-items: center;
  }
  & div:nth-child(1),
  div:nth-child(6),
  div:nth-child(7),
  div:nth-child(8) {
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

export const StaffMainSTYLED = styled.main.attrs(() => ({
  className: 'col-md-9 ms-sm-auto col-lg-10 px-md-4',
}))``;
