import { createGlobalStyle } from 'styled-components';

const theme = {
  black: '#383838',
  background: '#eeeeee',
  color: {
    greyish: '#2b2e4a',
    blue: '#1089ff',
    red: '#e84545',
    brown: '#903749',
    darkBrown: '#53354a'
  },
  boxShadow: '0 2px 6px 0 hsla(0, 0%, 0%, 0.09)',
  fontSize: {
    xsmall: '0.75rem',
    small: '0.875rem',
    normal: '1rem',
    large: '1.1rem',
    xlarge: '1.4rem'
  },
  isMobile: '@media screen and (max-width: 52em)',
  titleFont: 'Arial Black, sans-serif'
};

export const Reset = createGlobalStyle`
  body {
    background: ${theme.background};
    background-attachment: fixed;
    height: 100%;
    color: ${theme.black};
    font-family: ${theme.sansSerif};
    padding: 0;
    margin: 0;
    overflow-x: hidden;
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
