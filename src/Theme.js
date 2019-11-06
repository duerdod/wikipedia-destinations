import { createGlobalStyle } from 'styled-components';

const theme = {
  black: '#eeeeee',
  background: '#042f4b',
  color: {
    white: {
      hex: '#F7F7F7',
      tint: [
        '#DEDEDE',
        '#C6C6C6',
        '#ADADAD',
        '#949494',
        '#7C7C7C',
        '#636363',
        '#4A4A4A',
        '#313131',
        '#191919',
        '#000000'
      ]
    },
    blue: {
      hex: '#042F4B',
      tint: [
        '#042F4B',
        '#1D445D',
        '#36596F',
        '#4F6D81',
        '#688293',
        '#8297A5',
        '#9BACB7',
        '#B4C1C9',
        '#CDD5DB',
        '#E6EAED',
        '#FFFFFF'
      ]
    },
    red: {
      hex: '#ED1250',
      tint: [
        '#ED1250',
        '#EF2A62',
        '#F14173',
        '#F25985',
        '#F47196',
        '#F689A8',
        '#F8A0B9',
        '#FAB8CB',
        '#FBD0DC',
        '#FDE7EE',
        '#FFFFFF'
      ]
    },
    beige: {
      hex: '#FBC99D',
      tint: [
        '#FBC99D',
        '#FBCEA7',
        '#FCD4B1',
        '#FCD9BA',
        '#FDDFC4',
        '#FDE4CE',
        '#FDE9D8',
        '#FEEFE2',
        '#FEF4EB',
        '#FFFAF5',
        '#FFFFFF'
      ]
    },
    green: {
      hex: '#3C9D9B',
      tint: [
        '#3C9D9B',
        '#50A7A5',
        '#63B1AF',
        '#77BAB9',
        '#8AC4C3',
        '#9ECECD',
        '#B1D8D7',
        '#C5E2E1',
        '#D8EBEB',
        '#ECF5F5',
        '#FFFFFF'
      ]
    }
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
    background: ${theme.color.blue.hex};
    background-attachment: fixed;
    height: 100%;
    color: ${theme.color.white.hex};
    font-family: ${theme.sansSerif};
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    * {
      box-sizing: border-box;
    }

    &.popup-open {
      overflow: hidden;
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
