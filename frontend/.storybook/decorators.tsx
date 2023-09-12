import type { Decorator } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/style/Global.style';
import theme from '../src/style/theme.style';

const SvgIcons = () => (
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
      <symbol id="account-circle" viewBox="0 0 24 24">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="5.5" r="2.5"></circle>
          <path d="M2.73 11.9a5 5 0 0 1 8.54 0"></path>
          <circle cx="7" cy="7" r="6.5"></circle>
        </g>
      </symbol>
      <symbol id="arrow-drop-down" viewBox="0 0 24 24">
        <path d="m12 15l-5-5h10l-5 5Z"></path>
      </symbol>
      <symbol id="arrow-left" viewBox="0 0 24 24">
        <path d="m14 17l-5-5l5-5v10Z"></path>
      </symbol>
      <symbol id="arrow-right" viewBox="0 0 24 24">
        <path d="M10 17V7l5 5l-5 5Z"></path>
      </symbol>
      <symbol id="arrow-right-all" viewBox="0 0 24 24">
        <path d="M13.3 17.275q-.3-.3-.288-.725t.313-.725L16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.3 8.15q-.3-.3-.3-.713t.3-.712q.3-.3.713-.3t.712.3L19.3 11.3q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.6 4.6q-.275.275-.687.275t-.713-.3Z"></path>
      </symbol>
      <symbol id="calendar" viewBox="0 0 24 24">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 6.5h1V11m-1 0h2"></path>
          <path d="M1.5 2.5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-2m-7-2v4m7-4v4m-7-2h5"></path>
          <path d="M3.5 6.5H6l-1.5 2s1.5 0 1.5 1A1.33 1.33 0 0 1 4.5 11h-1"></path>
        </g>
      </symbol>
      <symbol id="check-box-empty" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14Z"></path>
      </symbol>
      <symbol id="check-box-fill" viewBox="0 0 24 24">
        <path d="M13 30a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3H4v-2h9a5 5 0 0 1 0 10Z"></path>
        <path d="M25 25a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3H2v-2h23a5 5 0 0 1 0 10zm-4-13H6v-2h15a3 3 0 1 0-3-3h-2a5 5 0 1 1 5 5z"></path>
      </symbol>
      <symbol id="check-circle" viewBox="0 0 24 24">
        <path d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L10.6 13.8ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path>
      </symbol>
      <symbol id="close-circle" viewBox="0 0 24 24">
        <path d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.9-2.9Zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path>
      </symbol>
      <symbol id="crown" viewBox="0 0 24 24">
        <path
          fill="#FFB636"
          d="M68.4 10.8c-.6 1.4-1 3.3-1.1 4.5c-1.6 0-2.9 1.3-2.9 2.9c0 1.6 1.3 2.9 2.9 2.9c.2 0 .4 0 .6-.1c-.2 4.3-3.7 7.7-8.1 7.7c-4.4 0-7.9-3.4-8.1-7.7c1.3-.2 2.4-1.4 2.4-2.8c0-1.6-1.3-2.9-2.9-2.9h-.3c-.4-2-1.5-5.2-2.8-5.2c-1.3 0-2.4 3.1-2.8 5.2c-.2 0-.4-.1-.6-.1c-1.6 0-2.9 1.3-2.9 2.9c0 1.4 1 2.6 2.4 2.9c-.2 4.3-3.7 7.7-8.1 7.7c-4.4 0-7.9-3.5-8.1-7.8c1.3-.3 2.2-1.4 2.2-2.8c0-1.6-1.3-2.9-2.9-2.9H27c-.4-2-1.5-5.2-2.8-5.2c-1.3 0-2.4 3.1-2.8 5.2c-.2 0-.4-.1-.6-.1c-1.6 0-2.9 1.3-2.9 2.9c0 1.5 1.1 2.7 2.6 2.9c-.2 4.3-3.8 7.7-8.1 7.7c-4.4 0-7.9-3.4-8.1-7.7c.2 0 .4.1.6.1c1.6 0 2.9-1.3 2.9-2.9c0-1.6-1.3-2.9-2.9-2.9h-.2c-.2-1.3-.5-3-.9-4.4c-.3-1.1-1.8-.9-1.8.3v46.8h68.4V11.3c-.2-1.2-1.5-1.5-2-.5z"
        ></path>
        <path
          fill="#FFD469"
          d="M70.8 43.6H1.2c-.7 0-1.2-.5-1.2-1.2V39c0-.7.5-1.2 1.2-1.2h69.5c.7 0 1.2.5 1.2 1.2v3.4c.1.7-.4 1.2-1.1 1.2zm1.2 17v-3.4c0-.7-.5-1.2-1.2-1.2H1.2c-.7 0-1.2.5-1.2 1.2v3.4c0 .7.5 1.2 1.2 1.2h69.5c.8 0 1.3-.5 1.3-1.2z"
        ></path>
        <path
          fill="#FFC7EF"
          d="M64.4 50c0 1.8-1.4 3.2-3.2 3.2S58 51.8 58 50s1.4-3.2 3.2-3.2s3.2 1.4 3.2 3.2zM36 46.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2s3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2zm-25.2 0c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2S14 51.7 14 50s-1.4-3.2-3.2-3.2z"
        ></path>
      </symbol>
      <symbol id="dictionary" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.73 4.5H10.4a2 2 0 0 0-2 2v35a2 2 0 0 0 2 2h2.33m0-39v39H37.6a2 2 0 0 0 2-2v-35a2 2 0 0 0-2-2Z"
        ></path>
        <circle
          cx="28.195"
          cy="22.671"
          r="6.329"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></circle>
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m23.723 27.142l-6.052 6.052"
        ></path>
      </symbol>
      <symbol id="flowerpot" viewBox="0 0 24 24">
        <g fill="none" fillRule="evenodd">
          <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z"></path>
          <path d="M7.047 2.026a1 1 0 0 0-1.022 1.021c.016.706.187 1.7.667 2.717c.267.566.61 1.074 1.04 1.504c.28.28.593.523.933.732H6a2 2 0 0 0-2 2v2a2 2 0 0 0 1.014 1.74c.139 3.665 1.275 6.218 1.837 7.27c.35.656 1.023.99 1.684.99h6.93c.66 0 1.334-.334 1.684-.99c.562-1.052 1.698-3.605 1.837-7.27A2 2 0 0 0 20 12v-2a2 2 0 0 0-2-2h-1.898c.217-.227.406-.477.563-.75c.212-.367.36-.765.45-1.189c.173-.798.137-1.618-.021-2.401l-.144-.57a1 1 0 0 0-1.155-.666a6.16 6.16 0 0 0-1.898.778c-.656.403-1.195.912-1.562 1.548c-.05.086-.095.173-.138.262a5.215 5.215 0 0 0-.93-1.28a5.315 5.315 0 0 0-1.503-1.04a6.906 6.906 0 0 0-2.717-.666ZM8.25 4.25c.226.07.447.15.66.25c.368.174.686.389.944.647c.257.257.472.575.646.943c.094.217.18.433.249.66a4.79 4.79 0 0 1-.66-.25a3.333 3.333 0 0 1-.943-.646A3.333 3.333 0 0 1 8.5 4.91a5.09 5.09 0 0 1-.25-.66Zm6.972.5l.006.23c0 .228-.022.45-.067.66a2.094 2.094 0 0 1-.228.61c-.185.32-.485.604-.877.845l-.279.154l-.005-.228c0-.228.022-.45.068-.661c.049-.227.124-.431.227-.61c.185-.32.485-.603.877-.845l.278-.155ZM7.028 14h9.944c-.174 3.023-1.093 5.125-1.551 6H8.579c-.458-.875-1.377-2.977-1.55-6ZM18 12H6v-2h12v2Z"></path>
        </g>
      </symbol>
      <symbol id="fragrance" viewBox="0 0 24 24">
        <path d="M226.9 19.77c-20.6 8.84-38 18.37-51.8 28.22c-.2-6.01-5.1-10.85-11.1-10.85c-6.2 0-11.2 4.99-11.2 11.14c0 5.17 3.6 9.51 8.3 10.77c-36 32.14-35.4 66.15 7.1 89.05c-1 2.1-1.6 4.5-1.6 7c0 8.7 7.1 15.7 15.8 15.7c7 0 12.9-4.5 14.9-10.7c26.3 7.8 50.8 10.2 72.9 13.3c61.8 10.3 76.9 45.6 66.1 85.1c27.1-22.6 28.9-44.3 18.4-62.9c34.6 19.9 33.7 50.7-36.6 87.5c10.1.3 19.8.4 29.1.1c67-11.7 77.5-46.3 58.8-62.3c47.9 6.4 41.2 36.2 8.2 53.6c35.2-9.8 53.2-27.6 48-51.4c3.1-2 5.1-5.4 5.1-9.3c0-6.1-5-11.1-11.2-11.1c-1.3 0-2.5.2-3.6.6c-11.7-20.6-33.1-33.4-53.1-39.7c-23-7.4-53.4-12.9-92.8-32c-53.4-23.9-58.6-43.21-33.8-58.21c1 5.1 5.5 8.9 10.9 8.9c6.2 0 11.2-5 11.2-11.1c0-2.6-.9-4.9-2.3-6.82c41.7-14.93 117.3-24.23 199.8-28.06V19.77zM125.2 48.9c-5.8 0-10.6 4.49-11 10.2c-.7-.1-1.4-.16-2.1-.16c-7.8 0-14.15 6.35-14.15 14.15c0 7.8 6.35 14.2 14.15 14.2c7.7 0 14.1-6.4 14.1-14.2c0-.7-.1-1.3-.2-2c5.8-.4 10.3-5.2 10.3-11.05c0-6.16-5-11.14-11.1-11.14zm356.7 1.97c-79.6-.35-175.4 17.32-168.1 54.43c-4.8 1.3-8.3 5.6-8.3 10.8c0 6.1 5 11.1 11.1 11.1c4.7 0 8.7-2.8 10.3-6.9c31.3 13.7 56.1 18.4 78.2 25.5c.5.1 1.1.3 1.6.5c-3.9-16.5 4.3-33.4 25-44.6c1.4 4.6 5.7 7.9 10.7 7.9c6.2 0 11.1-5 11.1-11.21c0-1.7-.3-3.3-1-4.7c11.2-3 24.5-4.8 39.9-4.9V51.02c-3.5-.1-7-.14-10.5-.15zM229 54.58c-29.4 24.11-33.8 78.42 46.3 91.22c-50.3 11-83.5-8.5-93.1-32.5c.8.2 1.7.3 2.5.3c6.2 0 11.2-5 11.2-11.1c0-6.21-5-11.21-11.2-11.21c-1.7 0-3.3.4-4.8 1.1c3.1-17.1 18.7-32.67 49.1-37.81zm239.6 55.32c-6.2 0-11.2 5-11.2 11.1c0 4.4 2.5 8.2 6.2 10c-1 2-1.6 4.2-1.6 6.6c0 8.1 6.6 14.7 14.7 14.7c8.2 0 14.7-6.6 14.7-14.7c0-7.2-5.1-13.2-11.9-14.5c.2-.6.2-1.3.2-2.1c0-6.1-5-11.1-11.1-11.1zm-350.2 9.3c-6.1 0-11.1 5-11.1 11.1c0 6.2 5 11.2 11.1 11.2s11-5 11-11.2c0-6.1-4.9-11.1-11-11.1zm317.2 6.5c-6.1 0-11.1 4.9-11.1 11.1c0 6.1 5 11.1 11.1 11.1c6.2 0 11.2-5 11.2-11.1c0-6.2-5-11.1-11.2-11.1zm-193.4 60.1c-6.2 0-11.1 5-11.1 11.1c0 6.2 4.9 11.2 11.1 11.2c6.1 0 11.1-5 11.1-11.2c0-6.1-5-11.1-11.1-11.1zm-95.8 46.1c-9.5-3.1-23.9-9-32.2-2.8c-3.8 3.1-6.2 9.4-4.3 20.1c2.2 12.2 10.3 28.4 25 44.6c17.6-23.5 52.3-33.2 81-21.4c.4-32-6.5-51.2-16.5-56.9c-20.5-11.6-39.9 2.4-53 16.4zm116.7 8.2c-12.9 6.8-26.6 18.6-38.5 36.6c14 8.2 24.9 21.1 30.5 36.6c29.3-20.3 45.4-38.3 51.8-51.4c4.5-9.2 5.6-21.2-3.2-26.2c-12.7-6.2-30.1-.9-40.6 4.4zm200.8 36.2c-6.2 0-11.2 5-11.2 11.2c0 6.1 5 11.1 11.2 11.1c6.1 0 11.1-5 11.1-11.1c0-6.2-5-11.2-11.1-11.2zm-401.95 7.1c-9.59.4-29.21 2.2-28.7 14.2c.5 7.8 11.4 23.6 34.7 35.8c13.9 7.3 31.9 13.4 53.35 17c-2.5-13.2-.9-28 3.6-39.4c-6.5-6.8-12.2-13.7-16.9-20.6c-19.05-5.1-34.35-7.2-46.05-7zM174.8 288l4.2 34.9l-25.7-21.9c-8.9 9-14.5 21.4-14.6 35.1l34.4 4.1l-28.4 20.7c6.8 12.8 19 22.3 33.5 25.6l10.8-35.9l15.5 34.9c14.6-4.4 26.3-15.2 32.1-29.1l-27.1-13.9l30.9-9.3c-.8-11-5-21-11.6-29l-27 17.4l7.5-31.8c-11.7-4.3-23.4-5-34.5-1.8zm118.5 19.5c-9.3 8.3-20.6 16.9-34.2 25.7c.4 15.1-5.5 33.2-12.8 43.8c31.4 12.2 57.3 19.2 77.3 21.9c12.3.4 49.2 5.7 54.1-10.1c5-16-28.3-34.8-37.3-39.9c20-16.4 18-32.8-.8-41.2c-15.4-6.9-31.8-4.8-46.3-.2zM82.15 359.8c-22.97 6.3-67.26 19.3-62.1 44.2c4.35 21 43.69 14.8 62.9 13.4c-4.97 12.8-13.25 34.5-4.5 45.1c4.6 5.3 13.3 8.1 24.55 6c20.9-3.9 48.2-25 55.9-69.2c-12.8-6.3-23.3-16.4-30.2-28.9c-17.3-2.1-32.85-5.8-46.55-10.6zm150.15 31.9c-5.4 4.2-11.5 7.7-18 10.1c19.8 36.8 38.2 60.3 53.1 72.9c7.5 5.8 24.7 18.7 32.7 9.2c4.8-5.5 7.3-23.4-2.1-47.4c-3.3-8.4-8-17.5-14.2-27c-15.4-4.3-32.6-10.2-51.5-17.8zm-55.5 13.5c-4.5 23.3-14.1 41.6-26 55.1c4.4 16.9 19.5 33 35.1 31.4c18.6-1.9 30.3-25.1 33.3-45c-7.8-11.6-15.8-25-23.9-40.5c-6.2.4-12.9 0-18.5-1z"></path>
      </symbol>
      <symbol id="home" viewBox="0 0 24 24">
        <path
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M.5 7L7 .5L13.5 7m-11 1.5v5h9v-5"
        ></path>
      </symbol>
      <symbol id="house" viewBox="0 0 24 24">
        <path d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10v9Zm0 2q-.825 0-1.413-.588T4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.275-.2.575-.3T12 3.5q.325 0 .625.1t.575.3l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-5v-6h-2v6H6Zm6-8.75Z"></path>
      </symbol>
      <symbol id="humidity" viewBox="0 0 24 24">
        <path d="M14.5 18q.625 0 1.063-.438T16 16.5q0-.625-.438-1.063T14.5 15q-.625 0-1.063.438T13 16.5q0 .625.438 1.063T14.5 18Zm-5.75-.75q.3.3.7.3t.7-.3l5.1-5.1q.3-.3.3-.7t-.3-.7q-.3-.3-.713-.3t-.712.3L8.75 15.825q-.3.3-.3.713t.3.712ZM9.5 13q.625 0 1.063-.438T11 11.5q0-.625-.438-1.063T9.5 10q-.625 0-1.063.438T8 11.5q0 .625.438 1.063T9.5 13Zm2.5 9q-3.175 0-5.588-2.212T4 13.8q0-2.375 1.8-5.15t5.45-6q.15-.125.35-.2t.4-.075q.2 0 .4.075t.35.2q3.65 3.225 5.45 6T20 13.8q0 3.775-2.413 5.988T12 22Z"></path>
      </symbol>
      <symbol id="info-circle" viewBox="0 0 24 24">
        <path d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.713T12 11q-.425 0-.713.288T11 12v4q0 .425.288.713T12 17Zm0-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path>
      </symbol>
      <symbol id="kakao-login-large" viewBox="0 0 24 24">
        <rect width="360" height="90" fill="url(#pattern0)" />
        <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlinkHref="#image0_540_755" transform="scale(0.00273224 0.0111111)" />
          </pattern>
          <image
            id="image0_540_755"
            width="360"
            height="90"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </symbol>
      <symbol id="line-arrow-left" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="#888888"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.15.5L4 6.65a.48.48 0 0 0 0 .7l6.15 6.15"
        ></path>
      </symbol>
      <symbol id="manage-level-정보없음" viewBox="0 0 24 24">
        <path d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8zm-6-2h4v-8H4z"></path>
      </symbol>
      <symbol id="manage-level-초보자" viewBox="0 0 24 24">
        <path d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8z"></path>
      </symbol>
      <symbol id="manage-level-경험자" viewBox="0 0 24 24">
        <path d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-10 0H2V18h8z"></path>
      </symbol>
      <symbol id="manage-level-전문가" viewBox="0 0 24 24">
        <path d="M30 30h-8V4h8zm-10 0h-8V12h8zm-10 0H2V18h8z"></path>
      </symbol>
      <symbol id="plant" viewBox="0 0 24 24">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.51 5.38c2 2.82.47 6.05-.27 7.31a1.42 1.42 0 0 1-1 .66c-1.45.25-5.06.53-7-2.29C1.33 8.4 1.41 3.72 1.58 1.49A1.05 1.05 0 0 1 3 .55c2.15.62 6.63 2.17 8.51 4.83Z"></path>
          <path d="M4.77 4.45a52.26 52.26 0 0 1 6 8.73"></path>
        </g>
      </symbol>
      <symbol id="potted-plant" viewBox="0 0 24 24">
        <path d="M200 144h-76.7l22.41-22.41a59.55 59.55 0 0 0 26.1 6.36a49.56 49.56 0 0 0 25.89-7.22c23.72-14.36 36.43-47.6 34-88.92a8 8 0 0 0-7.52-7.52c-41.32-2.43-74.56 10.28-88.93 34c-9.35 15.45-9.59 34.11-.86 52L120 124.68l-12.21-12.21c6-13.25 5.57-27-1.39-38.48C95.53 56 70.61 46.41 39.73 48.22a8 8 0 0 0-7.51 7.51C30.4 86.6 40 111.52 58 122.4a38.22 38.22 0 0 0 20 5.6a45 45 0 0 0 18.52-4.19L108.69 136l-8 8H56a8 8 0 0 0 0 16h9.59l13.21 59.47A15.89 15.89 0 0 0 94.42 232h67.17a15.91 15.91 0 0 0 15.62-12.53L190.42 160H200a8 8 0 0 0 0-16Z"></path>
      </symbol>
      <symbol id="reminder" viewBox="0 0 24 24">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="1" cy="2.5" r=".5"></circle>
          <path d="M4.5 2.5h9"></path>
          <circle cx="1" cy="7" r=".5"></circle>
          <path d="M4.5 7h9"></path>
          <circle cx="1" cy="11.5" r=".5"></circle>
          <path d="M4.5 11.5h9"></path>
        </g>
      </symbol>
      <symbol id="search" viewBox="0 0 24 24">
        <path d="M9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16Zm0-2q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"></path>
      </symbol>
      <symbol id="stopwatch" viewBox="0 0 24 24">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13.5A6.5 6.5 0 1 1 13.5 7a7.23 7.23 0 0 1-2 5"></path>
          <path d="m13.5 11.5l-2 .5l-.5-2M9 9L7 6.5H4"></path>
        </g>
      </symbol>
      <symbol id="sun" viewBox="0 0 24 24">
        <path d="M12 5q-.425 0-.713-.288T11 4V2q0-.425.288-.713T12 1q.425 0 .713.288T13 2v2q0 .425-.288.713T12 5Zm4.95 2.05q-.275-.275-.275-.687t.275-.713l1.4-1.425q.3-.3.712-.3t.713.3q.275.275.275.7t-.275.7L18.35 7.05q-.275.275-.7.275t-.7-.275ZM20 13q-.425 0-.713-.288T19 12q0-.425.288-.713T20 11h2q.425 0 .713.288T23 12q0 .425-.288.713T22 13h-2Zm-8 10q-.425 0-.713-.288T11 22v-2q0-.425.288-.713T12 19q.425 0 .713.288T13 20v2q0 .425-.288.713T12 23ZM5.65 7.05l-1.425-1.4q-.3-.3-.3-.725t.3-.7q.275-.275.7-.275t.7.275L7.05 5.65q.275.275.275.7t-.275.7q-.3.275-.7.275t-.7-.275Zm12.7 12.725l-1.4-1.425q-.275-.3-.275-.713t.275-.687q.275-.275.688-.275t.712.275l1.425 1.4q.3.275.288.7t-.288.725q-.3.3-.725.3t-.7-.3ZM2 13q-.425 0-.713-.288T1 12q0-.425.288-.713T2 11h2q.425 0 .713.288T5 12q0 .425-.288.713T4 13H2Zm2.225 6.775q-.275-.275-.275-.7t.275-.7L5.65 16.95q.275-.275.687-.275t.713.275q.3.3.3.713t-.3.712l-1.4 1.4q-.3.3-.725.3t-.7-.3ZM12 18q-2.5 0-4.25-1.75T6 12q0-2.5 1.75-4.25T12 6q2.5 0 4.25 1.75T18 12q0 2.5-1.75 4.25T12 18Zm0-2q1.65 0 2.825-1.175T16 12q0-1.65-1.175-2.825T12 8q-1.65 0-2.825 1.175T8 12q0 1.65 1.175 2.825T12 16Zm0-4Z"></path>
      </symbol>
      <symbol id="thermometer-snow" viewBox="0 0 24 24">
        <g>
          <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5z"></path>
          <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963l.495-1.85a.5.5 0 1 1 .966.26l-.237.882l1.12-.646a.5.5 0 0 1 .5.866l-1.12.646l.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963l1.849-.495a.5.5 0 1 1 .258.966l-.883.237l1.12.646a.5.5 0 0 1-.5.866l-1.12-.646l.237.883a.5.5 0 1 1-.966.258L10.67 9.83L9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z"></path>
        </g>
      </symbol>
      <symbol id="thermometer-sun" viewBox="0 0 24 24">
        <g>
          <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z"></path>
          <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5a3 3 0 1 1 0 6a.5.5 0 0 1 0-1a2 2 0 0 0 0-4a.5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z"></path>
        </g>
      </symbol>
      <symbol id="tree-plant-pot" viewBox="0 0 24 24">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.25 13.5h-4l-.5-4h5l-.5 4zm2.88-7.43a2 2 0 1 1-2.47-3.14c.86-.68 3.59-.28 3.59-.28S13 5.39 12.13 6.07Z"></path>
          <path d="M9.25 5.64a5.5 5.5 0 0 0-2 3.86c0-3-1.5-5-4-6.5"></path>
          <path d="M1.67 5a2.56 2.56 0 0 0 3.61-3.61C4.28.4.75.5.75.5S.67 4 1.67 5Z"></path>
        </g>
      </symbol>
      <symbol id="warning" viewBox="0 0 24 24">
        <path d="M2.725 21q-.275 0-.5-.138t-.35-.362q-.125-.225-.138-.488t.138-.512l9.25-16q.15-.25.388-.375T12 3q.25 0 .488.125t.387.375l9.25 16q.15.25.138.513t-.138.487q-.125.225-.35.363t-.5.137H2.725ZM12 18q.425 0 .713-.288T13 17q0-.425-.288-.713T12 16q-.425 0-.713.288T11 17q0 .425.288.713T12 18Zm0-3q.425 0 .713-.288T13 14v-3q0-.425-.288-.713T12 10q-.425 0-.713.288T11 11v3q0 .425.288.713T12 15Z"></path>
      </symbol>
      <symbol id="water" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.5 9C11.5 6.51 7 .5 7 .5S2.5 6.51 2.5 9a4.5 4.5 0 0 0 9 0Z"
        ></path>
      </symbol>
      <symbol id="wind" viewBox="0 0 24 24">
        <path d="M13 30a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3H4v-2h9a5 5 0 0 1 0 10Z"></path>
        <path d="M25 25a5.006 5.006 0 0 1-5-5h2a3 3 0 1 0 3-3H2v-2h23a5 5 0 0 1 0 10zm-4-13H6v-2h15a3 3 0 1 0-3-3h-2a5 5 0 1 1 5 5z"></path>
      </symbol>
    </svg>
  </div>
);
export const decorateGlobalStyle: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <RecoilRoot>
      <SvgIcons />
      <Story />
    </RecoilRoot>
  </ThemeProvider>
);

export const decorateToastRoot: Decorator = (Story) => (
  <>
    <div id="toast-root"></div>
    <Story />
  </>
);
