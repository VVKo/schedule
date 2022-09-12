import React from 'react';

import styled, { keyframes, css } from 'styled-components';

export const StyledNavbar = styled.nav`
  overflow: hidden;
  background-color: #1c87c9;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;

  & > a {
    float: left;
    display: block;
    color: #eeeeee;
    text-align: center;
    padding: 15px 18px;
    text-decoration: none;
    font-size: 18px;
    &:hover {
      color: #ffffff;
    }
  }

  z-index: 100;
`;

export const Container = styled.div`
  //max-width: 768px;
  width: 100%;
  margin-top: 0px;
  padding: 0 20px;
  height: 170px;
  & > h1.header {
    font-weight: bold;
    color: aqua;
  }
  border: black solid 1px;
`;

export const ScheduleContainer = styled.div`
  //max-width: 768px;
  position: inherit;
  width: 100%;
  border: black solid 1px;
  padding-top: 3px;
`;

export const StyledMain = styled.main`
  //max-width: 768px;
  width: 100%;
  margin-top: 70px;
  padding: 0;
  //height: auto;
  //border: black solid 1px;
`;

export const Panel = styled.form`
  height: 70px;
  width: 100%;
  border-bottom-right-radius: 35px;
  border-top-left-radius: 35px;
  display: flex;
  flex-wrap: nowrap;
  //justify-content: space-between;
  align-items: center;
  margin-top: 0px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ff6a95;
  vertical-align: center;

  padding-top: 10px;
  padding-bottom: 10px;

  > select {
    //width: 15%;
    //border: black solid;
    height: 100%;
    margin: 3%;
  }
  
  }
`;

export const Header = styled.header`
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #ff6a95;
`;

export const DepartmentList = styled.div`
  padding: 0;
  margin: auto;
`;

export const DepartmentItem = styled.div`
  display: flex;
  align-items: center;
  //background-color: #f1f1f1;
  padding: 1px;
  border-radius: 10px;
  div {
    background-color: #777777;
    color: #000;
    width: 100%;
    flex-grow: inherit;

    a p {
      margin: 0;
      padding: 0;
      text-align: center;
      height: 100%;
      color: #000;
      font-family: 'Caveat';
      font-weight: bold;
      font-size: 2rem;
    }
  }
`;

export const ButtonTo = styled.div`
  margin: 0;
  padding: 0;
`;

export const StyledBox = styled.select`
  width: 100%;
  display: block;
  height: 70%;
  border: 1px solid #999;

  font-size: 18px;
  color: #1c87c9;
  background-color: #eee;
  border-radius: 5px;
  //box-shadow: 4px 4px #ccc;
  ${props =>
    props.multiple &&
    css`
      background-color: yellow;
      margin: 0;
      padding: 0;
      //position: absolute;
      top: 100%; /* align the dropdown right below the dropdown text */
      border: inherit;
      border-top: none;
      left: -1px; /* align the dropdown to the left */
      right: -1px; /* align the dropdown to the right */
      opacity: 110; /* hide the dropdown */

      transition: opacity 0.4s ease-in-out;
      height: 100px;
      overflow: visible;
      overflow-x: hidden;
      pointer-events: none; /* avoid mouse click events inside the dropdown */

      &.active {
        opacity: 1; /* display the dropdown */
        pointer-events: auto; /* make sure that the user still can select checkboxes */
      }

      & > option {
        display: flex;
        border-bottom: 1px solid silver;
        padding: 10px;

        transition: all 0.2s ease-out;
        :hover {
          background-color: #555;
          color: white;
        }
      }
    `}
`;

export const StyledButton = styled.button`
  width: 100%;
  height: 70%;
  display: block;
  border: 1px solid #999;
  font-size: 18px;
  color: #1c87c9;
  background-color: #eee;
  border-radius: 5px;
`;

export const StyledCheckBoxDropdown = styled.div`
  width: 200px;
  border: 1px solid #aaa;
  padding: 10px;
  position: relative;
  margin: 0 auto;

  user-select: none;
  :after {
    content: '';
    height: 0;
    position: absolute;
    width: 0;
    border: 6px solid transparent;
    border-top-color: #000;
    top: 50%;
    right: 10px;
    margin-top: -3px;
  }

  &.active:after {
    border-bottom-color: #000;
    border-top-color: #fff;
    margin-top: -9px;
  }
`;

export const StyledCheckBoxDropdownList = styled.select`
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100%; /* align the dropdown right below the dropdown text */
  border: inherit;
  border-top: none;
  left: -1px; /* align the dropdown to the left */
  right: -1px; /* align the dropdown to the right */
  opacity: 0; /* hide the dropdown */

  transition: opacity 0.4s ease-in-out;
  height: 100px;
  overflow: scroll;
  overflow-x: hidden;
  pointer-events: none; /* avoid mouse click events inside the dropdown */

  &.active {
    opacity: 1; /* display the dropdown */
    pointer-events: auto; /* make sure that the user still can select checkboxes */
  }

  & > li {
    & > label {
      display: block;
      border-bottom: 1px solid silver;
      padding: 10px;

      transition: all 0.2s ease-out;
      :hover {
        background-color: #555;
        color: white;
      }
    }
  }
`;

export const InfoCard = styled.div`
  flex: auto;
  flex-direction: column;
  background-color: aqua;
  font-family: 'Open Sans Condensed';
  font-weight: bold;
  font-size: 1rem;
  color: black;
`;

export const InfoDeleteButton = styled.button`
  width: 10rem;
  border: black solid 1px;
  color: red;
`;

export const InfoDivSTYLED = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  border: black solid;
`;

const breatheAnimation = keyframes`
 0% { height: 25px; width: 25px; }
 30% { height: 27px; width: 27px; opacity: 1 }
 40% { height: 30px; width: 30px; opacity: 0.3; }
 100% { height: 25px; width: 25px; opacity: 0.6; }
`

export const UpdateButtonServer = styled.button`
  position: fixed;
  height: 25px;
  width: 25px;
  left: 25px;
  top: 37px;
  border-radius: 50%;
  display: none;

  ${props =>
    props.change &&
    css`
      background-color: ${props.change ? 'red' : 'white'};
      display: block;
      animation-name: ${breatheAnimation};
      animation-duration: 2s;
      animation-iteration-count: infinite;
    `}
  opacity: 0.5;
  &:hover {
    background-color: lightblue;
    opacity: 0.9;
  }
`;

export const ShareButtonServer = styled.button`
  position: fixed;
  height: 25px;
  width: 25px;
  left: 50px;
  top: 37px;
  border-radius: 50%;
  display: none;

  ${props =>
    props.change &&
    css`
      background-color: ${props.change ? 'red' : 'white'};
      display: block;
      animation-name: ${breatheAnimation};
      animation-duration: 2s;
      animation-iteration-count: infinite;
    `}
  opacity: 0.5;
  &:hover {
    background-color: lightblue;
    opacity: 0.9;
  }
`;
