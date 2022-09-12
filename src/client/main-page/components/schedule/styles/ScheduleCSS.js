import React from 'react';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const px2vw = (size, width = 1440) => `${(size / width) * 100}vw`;

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section, main {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;

export const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

export const MainFrame = styled.div`
  position: relative;

  &::before {
    // never visible - this is used in js to check the current MQ
    content: 'mobile';
    display: none;
  }

  @media only screen and (min-width: 800px) {
    width: 90%;
    max-width: 1400px;
    margin: 2em auto;

    &::after {
      clear: both;
      content: '';
      display: block;
    }
    &::before {
      content: 'desktop';
    }
  }
`;

export const ParaLine = styled.div`
  display: none;
  @media only screen and (min-width: 800px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding-top: 50px;

    li {
      list-style: none;
      position: relative;
      height: 50px;
    }
    li::after {
      /* this is used to create the table horizontal lines */
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: #eaeaea;
    }
    li:last-of-type::after {
      display: none;
    }
    li span {
      display: none;
    }
  }

  @media only screen and (min-width: 1000px) {
    li::after {
      width: calc(100% - 60px);
      left: 60px;
    }
    li span {
      display: inline-block;
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    li:nth-of-type(2n) span {
      display: none;
    }
  }
`;

export const EventsLine = styled.div`
  position: relative;
  z-index: 1;
`;

export const EventsGroupLine = styled.li`
  list-style: none;
  margin-bottom: 30px;
`;

export const TopInfoLine = styled.div`
  width: 100%;
  padding: 0 5%;
  > span {
    display: inline-block;
    line-height: 1.2;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem; // ${px2vw(32)};
  max-width: 100%;

  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

export const Box = styled.div`
  display: flex;
  width: ${px2vw(320, 320)};
  min-height: ${px2vw(200, 320)};
  flex-direction: column;
  padding: ${px2vw(20)};
  margin: ${px2vw(20)};
  background-color: ${props => props.bgColor};
  height: 100%;

  @media (min-width: 768px) {
    width: ${px2vw(320, 768)};
    min-height: ${px2vw(200, 768)};
    height: 100%;
  }

  @media (min-width: 1024px) {
    width: ${px2vw(500)};
    min-height: ${px2vw(300)};
    height: 100%;
  }
`;

export const BoxTitle = styled.h3`
  color: #333;
  font-size: 2rem;
  text-align: center;

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const BoxText = styled.p`
  margin-top: ${px2vw(20)};
  color: #666;
  font-size: 1.5rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const ParaDiv = styled.div`
  margin: 0;
  padding: 0;
  border: black solid;
`
