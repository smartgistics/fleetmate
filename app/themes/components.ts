// MUI component overrides are placed here.
// https://mui.com/material-ui/customization/theme-components/#theme-style-overrides
import { lightThemeConfig } from './theme-light-config'

const outlinedButtons = [
  ['Primary', 'primaryColor'],
  ['Secondary', 'secondaryColor'],
  ['Success', 'successColor'],
  ['Warning', 'warningColor'],
  ['Error', 'errorColor'],
  ['Neutral', 'neutral57'],
].reduce((o, [key, variable]) => {
  o[`outlined${key}`] = {
    color: `var(--${variable})`,
  }
  return o
}, {})

const textButtons = [
  ['Primary', 'primaryColor'],
  ['Secondary', 'secondaryColor'],
  ['Success', 'successColor'],
  ['Warning', 'warningColor'],
  ['Error', 'errorColor'],
  ['Neutral', 'neutral57'],
].reduce((o, [key, variable]) => {
  o[`text${key}`] = {
    color: `var(--${variable})`,
  }
  return o
}, {})

const containedButtons = Object.entries({
  Secondary: {
    main: 'blue48',
    hover: 'blue58',
    active: 'blue38',
    focus: 'blue38',
  },
  Success: {
    main: 'green48',
    hover: 'green28',
    active: 'green78',
    focus: 'green78',
  },
  Warning: {
    main: 'goldenrod49',
    hover: 'goldenrod59',
    active: 'goldenrod69',
    focus: 'goldenrod69',
  },
  Error: {
    main: 'red60',
    hover: 'red50',
    active: 'red70',
    focus: 'red70',
  },
}).reduce((o, [key, colors]) => {
  o[`contained${key}`] = {
    backgroundColor: `var(--${colors.main})`,
    '&:hover': {
      backgroundColor: `var(--${colors.hover})`,
    },
    '&:active': {
      backgroundColor: `var(--${colors.active})`,
    },
    '&:focus': {
      backgroundColor: `var(--${colors.focus})`,
    },
  }
  return o
}, {})

export const componentsTheme = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: 'var(--white)',
          // If you need to access pseudo-classes, use this form:
          // '&:hover': {
          // },
        },
        containedPrimary: {
          backgroundColor: lightThemeConfig.palette.primary.main,
        },
        ...containedButtons,
        ...outlinedButtons,
        ...textButtons,
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '0.5rem 0',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-cell': {
            padding: '1rem .875rem',
          },
        },
      },
    },
  },
}
