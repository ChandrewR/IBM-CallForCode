import * as React from 'react';
import { Svg, Path } from 'react-native-svg';

export const HomeIcon = props => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox="0 0 32 32">
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M16.61,2.21a1,1,0,0,0-1.24,0L1,13.42,2.24,15,4,13.62V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V13.63L29.76,15,31,13.43ZM18,26H14V18h4Zm2,0h0V18a2,2,0,0,0-2-2H14a2,2,0,0,0-2,2v8H6V12.06L16,4.27l10,7.8V26Z"></Path>
    </Svg>
  );
};

export const MapIcon = props => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox="0 0 32 32">
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M16,10a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,16,8Z"></Path>
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M16,4a8.88,8.88,0,0,1,9,8.71,8.47,8.47,0,0,1-1.79,5.21l0,0,0,0L16,28.46,8.85,18l0,0,0,0A8.47,8.47,0,0,1,7,12.71,8.88,8.88,0,0,1,16,4m0-2A10.86,10.86,0,0,0,5,12.71a10.53,10.53,0,0,0,2.2,6.43L16,32l8.8-12.86A10.53,10.53,0,0,0,27,12.71,10.86,10.86,0,0,0,16,2Z"></Path>
    </Svg>
  );
};

export const DonateIcon = props => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox="0 0 32 32">
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M28.76,11.35A1,1,0,0,0,28,11H22V7a3,3,0,0,0-3-3H13a3,3,0,0,0-3,3v4H4a1,1,0,0,0-1,1.15L4.88,24.3a2,2,0,0,0,2,1.7H25.14a2,2,0,0,0,2-1.7L29,12.15A1,1,0,0,0,28.76,11.35ZM12,7a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v4H12ZM25.14,24H6.86L5.17,13H26.83Z"></Path>
    </Svg>
  );
};

export const HospitalIcon = props => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox="0 0 22 22">
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z"></Path>
    </Svg>
  );
};

export const CoronaIcon = props => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox="0 0 22 22">
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M15.573,11.624c0.568-0.478,0.947-1.219,0.947-2.019c0-1.37-1.108-2.569-2.371-2.569s-2.371,1.2-2.371,2.569c0,0.8,0.379,1.542,0.946,2.019c-0.253,0.089-0.496,0.2-0.728,0.332c-0.743-0.898-1.745-1.573-2.891-1.911c0.877-0.61,1.486-1.666,1.486-2.812c0-1.79-1.479-3.359-3.162-3.359S4.269,5.443,4.269,7.233c0,1.146,0.608,2.202,1.486,2.812c-2.454,0.725-4.252,2.998-4.252,5.685c0,0.218,0.178,0.396,0.395,0.396h16.203c0.218,0,0.396-0.178,0.396-0.396C18.497,13.831,17.273,12.216,15.573,11.624 M12.568,9.605c0-0.822,0.689-1.779,1.581-1.779s1.58,0.957,1.58,1.779s-0.688,1.779-1.58,1.779S12.568,10.427,12.568,9.605 M5.06,7.233c0-1.213,1.014-2.569,2.371-2.569c1.358,0,2.371,1.355,2.371,2.569S8.789,9.802,7.431,9.802C6.073,9.802,5.06,8.447,5.06,7.233 M2.309,15.335c0.202-2.649,2.423-4.742,5.122-4.742s4.921,2.093,5.122,4.742H2.309z M13.346,15.335c-0.067-0.997-0.382-1.928-0.882-2.732c0.502-0.271,1.075-0.429,1.686-0.429c1.828,0,3.338,1.385,3.535,3.161H13.346z"></Path>
    </Svg>
  );
};

export const ChatIcon = props => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox="0 0 32 32">
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M17.74,30,16,29l4-7h6a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2H6A2,2,0,0,0,4,8V20a2,2,0,0,0,2,2h9v2H6a4,4,0,0,1-4-4V8A4,4,0,0,1,6,4H26a4,4,0,0,1,4,4V20a4,4,0,0,1-4,4H21.16Z"></Path>
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M8 10H24V12H8zM8 16H18V18H8z"></Path>
    </Svg>
  );
};

export const SearchIcon = props => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox="0 0 32 32">
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M30,28.59,22.45,21A11,11,0,1,0,21,22.45L28.59,30ZM5,14a9,9,0,1,1,9,9A9,9,0,0,1,5,14Z"></Path>
    </Svg>
  );
};

export const CheckedIcon = props => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox="0 0 32 32">
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z"></Path>
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M14 21.5L9 16.54 10.59 15 14 18.35 21.41 11 23 12.58 14 21.5z"></Path>
    </Svg>
  );
};

export const UncheckedIcon = props => {
  const height = props.height || 28;
  const width = props.width || 28;
  const fill = props.fill || '#000';
  const stroke = props.stroke || 'none';
  const strokeWidth = props.strokeWidth || 0;

  return (
    <Svg height={height} width={width} viewBox="0 0 32 32">
      <Path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M26,4H6A2,2,0,0,0,4,6V26a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V6A2,2,0,0,0,26,4ZM6,26V6H26V26Z"></Path>
    </Svg>
  );
};
