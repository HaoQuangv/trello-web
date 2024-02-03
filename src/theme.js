import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { teal, deepOrange, cyan, orange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  },
  components: { // Custom lại các component của MUI
    // Name of the component
    MuiButton: { // Custom lại các button ở đây mình đang custom lại nút Create
      styleOverrides: {
        // Name of the slot
        root: { // root đại diện cho phần tử gốc của component
          // Some CSS
          textTransform: 'none' // Làm cho MUI không tự động chuyển đổi text sang uppercase
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
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#00b894' // corrected color value
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: { // Custom lại label của input
        // Name of the slot
        root: ({ theme }) => ({ // Custom lại màu và cỡ chữ
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: { // Custom lại MuiOutlinedInput
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main, // Màu chữ
          fontSize: '0.875rem', // Cỡ chữ
          '.MuiOutlinedInput-notchedOutline': { // Custom lại viền của input
            borderColor: theme.palette.primary.light
          },
          '&: hover .MuiOutlinedInput-notchedOutline': { // Custom lại viền khi hover
            borderColor: theme.palette.primary.main
          },
          // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          //   borderWidth: '1px' // Set this to the desired border thickness when the input is focused
          // }
          '& fieldset': {
            borderWidth: '1px !important'
          }
        })
      }
    }

  }
  // ...other properties
})

export default theme
