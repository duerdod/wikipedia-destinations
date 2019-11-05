import { createGlobalStyle } from 'styled-components';

const theme = {
  black: '#eeeeee',
  background: '#042f4b',
  color: {
    white: '#F7F7F7',
    background: '#042f4b',
    primary: '#ed1250',
    secondary: '#fbc99d',
    bodyColor: '#f5f5f5',
    titleColor: '#fbc99d'
  },
  boxShadow: '0 2px 6px 0 hsla(0, 0%, 0%, .5)',
  fontSize: {
    xsmall: '0.75rem',
    small: '0.875rem',
    normal: '1rem',
    large: '1.1rem',
    xlarge: '1.4rem'
  },
  transition: '.4s ease',
  isMobile: '@media screen and (max-width: 52em)',
  titleFont: 'Open Sans, Arial Black, sans-serif',
  font: 'Open Sans, Arial Black, sans-serif'
};

export const Reset = createGlobalStyle`
  body {
    background: ${theme.color.background};
    background-attachment: fixed;
    height: 100%;
    color: ${theme.color.bodyColor};
    font-family: ${theme.sansSerif};
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    * {
      box-sizing: border-box;
    }
  }
  html {
    text-rendering: optimizeLegibility;
    font-size: 14px;
  }
  button,
  input,
  textarea,
  ul,
  li,
  p,
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
    border: 0;
    padding: 0;
    outline: 0;
    background: transparent;
    list-style: none;
    resize: none;
    box-shadow: unset;
    font-weight: 400;
    &:not(output):-moz-ui-invalid:not(:focus),
    &:not(output):-moz-ui-invalid:focus,
    &:not(output):-moz-ui-invalid:-moz-focusring:not(:focus) {
      box-shadow: none;
    }
  }
  @media (pointer: coarse) {
    input,
    textarea {
      font-size: 16px !important;
      appearance: none;
      &::placeholder {
        font-size: 0.85rem;
      }
    }
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  /* Stupid. */
  body.menu-open {
    height: 100%;
    width: 100%;
    position: fixed;
    overflow-y: hidden;
  }
`;

export default theme;
