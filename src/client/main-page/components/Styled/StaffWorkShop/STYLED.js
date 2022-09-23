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
