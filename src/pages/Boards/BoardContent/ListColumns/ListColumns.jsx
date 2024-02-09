import Box from '@mui/system/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

function ListColumns({ columns }) {

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      bgcolor: 'inherit',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': {
        m: 2
      }
    }}>
      {/*Box column 01*/}
      {columns?.map(column => <Column key={column._id} column={column}/>)}

      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        bgcolor: '#ffffff3d',
        height: 'fit-content',
        mx: 2,
        borderRadius: '6px'
      }}>
        <Button
          startIcon={<NoteAddIcon />}
          sx={{
            color: 'white',
            justifyContent: 'flex-start',
            pl: 2.5,
            py: 1
          }}
        >
          Add new column</Button>
      </Box>
    </Box>
  )
}

export default ListColumns
