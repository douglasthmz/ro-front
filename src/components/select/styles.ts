import { StylesConfig } from 'react-select';

export const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    color: '#666360',
  }),
  control: (styles, state) => ({
    ...styles,
    height: '48px',
    backgroundColor: '#f8f8ff',
    boxShadow: 'none',
    border: 0,
    borderRadius: 'none !important',
    borderBottom: state.isFocused
      ? '2px solid #019dda !important'
      : '2px solid #d3d3d3 !important',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#b0c4de',
    textAlign: 'center',
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    color: state.isFocused ? '#019dda !important' : '#d3d3d3 !important',
  }),
  indicatorSeparator: (styles, state) => ({
    ...styles,
    width: 2,
    backgroundColor: state.isFocused
      ? '#019dda !important'
      : '#d3d3d3 !important',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#666360',
  }),
};

export const errorStyle: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    color: '#666360',
  }),
  control: (styles, state) => ({
    ...styles,
    height: '48px',
    backgroundColor: '#f8f8ff',
    boxShadow: 'none',
    border: 0,
    borderRadius: 'none !important',
    borderBottom: '2px solid #c53030 !important',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#b0c4de',
    textAlign: 'center',
  }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    color: '#c53030 !important',
  }),
  indicatorSeparator: (styles, state) => ({
    ...styles,
    width: 2,
    backgroundColor: '#c53030 !important',
  }),
};
