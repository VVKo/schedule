import styled, { css } from 'styled-components';

export const FineNavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: teal;
  color: #fff;
`;

export const LogoFine = styled.div`
  font-size: 32px;
`;

export const MenuFine = styled.div`
  display: none;
  ${props =>
    props.visible &&
    css`
      display: flex;
    `}
  gap: 1em;
  font-size: 18px;
  li:hover {
    background-color: #4c9e9e;
    border-radius: 5px;
    transition: 0.3s ease;
  }
  li {
    padding: 5px 14px;
  }

  @media (max-width: 768px) {
    display: none;
    position: absolute;
    background-color: teal;
    right: 0;
    left: 0;
    text-align: center;
    padding: 16px 0;

    li:hover {
      display: inline-block;
      background-color: #4c9e9e;
      transition: 0.3s ease;
    }
    li + li {
      margin-top: 12px;
    }
  }
`;

export const NavLinksFine = styled.ul`
  a {
    color: #fff;
  }
`;

export const HumburgerCheckBoxFine = styled.input`
  display: none;
  @media (max-width: 768px) {
    :checked ~ ${MenuFine} {
      display: block;
    }
  }
`;
export const HumburgerFine = styled.label`
  display: none;
  font-size: 24px;
  user-select: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

export const NavDropdownFine = styled.ul`
  background-color: rgb(1, 139, 139);
  padding: 1em 0;
  position: absolute; /*WITH RESPECT TO PARENT*/
  display: none;
  border-radius: 8px;
  top: 35px;

  li + li {
    margin-top: 10px;
  }
  li {
    padding: 0.5em 1em;
    width: 8em;
    text-align: center;
  }
  li:hover {
    background-color: #4c9e9e;
  }

  @media (max-width: 768px) {
    //left: 90%;
    top: 28px;
    transform: translateX(35%);

    &li:hover {
      background-color: #4c9e9e;
    }
  }
`;
export const NavDropdownCaptionFine = styled.li`
  position: relative;
  &:hover ${NavDropdownFine} {
    display: block;
  }
`;

export const NavPidrozdilyFine = styled.li`
  position: relative;
  a {
    color: #fff;
  }
  :hover ${NavDropdownFine} {
    display: block;
    top: 28px;
    background-color: red;
  }
`;

export const NavMenuPidrozdily = styled.div`
  list-style: none;
  display: none;
  ${props =>
    props.visible &&
    css`
      display: flex;
    `}
  gap: 1em;
  font-size: 18px;
  & ${NavPidrozdilyFine}:hover {
    //background-color: #777;
    background-color: red;
    border-radius: 5px;
    transition: 0.3s ease;
  }
  li {
    padding: 5px 14px;
  }
  @media (max-width: 768px) {
    & ${NavPidrozdilyFine}:hover {
      display: inline-block;
      //background-color: red;
      transition: 0.2s ease;
    }
  }
`;
