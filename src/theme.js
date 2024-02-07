import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
//import { teal, deepOrange, cyan, orange } from '@mui/material/colors'
const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50PX'
const COLUMN_FOOTER_HEIGHT = '56PX'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange
    //   }
    // }
  },
  components: { // Custom lại các component của MUI
    // Name of the component
    MuiButton: { // Custom lại các button ở đây mình đang custom lại nút Create
      styleOverrides: {
        // Name of the slot
        root: { // root đại diện cho phần tử gốc của component
          // Some CSS
          textTransform: 'none', // Làm cho MUI không tự động chuyển đổi text sang uppercase
          borderWidth: '0.5px',
          '&:hover': {
            borderWidth: '1px'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white' // corrected color value
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: { // Custom lại label của input
        // Name of the slot
        root: { // Custom lại màu và cỡ chữ
          fontSize: '0.875rem'
        }
      }
    },
    MuiOutlinedInput: { // Custom lại MuiOutlinedInput
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': {
            borderWidth: '0.5px !important'
          },
          '&:hover fieldset': {
            borderWidth: '1px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important'
          }
        }
      }
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    }

  }
  // ...other properties
})

export default theme
