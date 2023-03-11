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
  height: 100%;
  width: 100%;
  //margin-top: 90px;
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

export const SwitchButton = styled.div`
  .toggle-button-cover {
    display: table-cell;
    position: relative;
    width: 400px;
    height: 140px;
    box-sizing: border-box;
  }

  .button-cover {
    height: 100px;
    margin: 20px;
    background-color: #fff;
    box-shadow: 0 10px 20px -8px #c5d6d6;
    border-radius: 4px;
  }

  .button-cover:before {
    counter-increment: button-counter;
    //content: counter(button-counter);
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
  }

  .button-cover,
  .knobs,
  .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button {
    position: relative;
    top: 50%;
    width: 274px;
    height: 36px;
    margin: -20px auto 0 auto;
    overflow: hidden;
  }

  .button.r,
  .button.r .layer {
    border-radius: 100px;
  }

  .button.b2 {
    border-radius: 2px;
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs {
    z-index: 2;
  }

  .layer {
    width: 100%;
    background-color: #ebf7fc;
    transition: 0.3s ease all;
    z-index: 1;
  }

  /* Button 1 */
  #button-1 .knobs:before {
    content: "ГРУПА";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 50px;
    height: 28px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #03a9f4;
    border-radius: 14px;
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
  }

  #button-1 .checkbox:checked + .knobs:before {
    content: "ВИКЛАДАЧ";
    width: 70px;
    left: 202px;
    background-color: #f44336;
  }

  #button-1 .checkbox:checked ~ .layer {
    background-color: #fcebeb;
  }

  #button-1 .knobs,
  #button-1 .knobs:before,
  #button-1 .layer {
    transition: 0.3s ease all;
  }

`
