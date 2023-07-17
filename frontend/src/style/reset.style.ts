import { css } from 'styled-components';

// prettier-ignore

export const reset = css`
  /* http://meyerweb.com/eric/tools/css/reset/
    v5.0.1 | 20191019
    License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video, dialog {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    border: 0;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }

  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }

  body {
    line-height: 1;
  }
  
  menu, ol, ul, dd {
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
    border-spacing: 0;
    border-collapse: collapse;
  }

  /****** Elad Shechter's RESET *******/
  /*** box sizing border-box for all elements ***/
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  a { 
    cursor: pointer; 
    color: inherit;
    text-decoration: none;
    outline: none;
  }

  button {
    cursor: pointer; 

    padding: 0; 

    color: inherit;

    background-color: transparent;
    border-width: 0;
  }

  input::-moz-focus-inner { 
    margin: 0; 
    padding: 0;
    border: 0;
  }
`
