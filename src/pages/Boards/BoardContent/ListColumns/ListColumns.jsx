import Box from '@mui/system/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
  /**
   * Thằng SortableContext yêu cầu items là một mảng dạng ['id1, 'id2', 'id3', ...] chứ không phải [{id: 'id1', ...}, {id: 'id2', ...}, {id: 'id3', ...}, ...]
   * Nếu không đúng thì vẫn kéo thả được nhưng không có hiệu ứng animation
   * https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
   */
  return (
    <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
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
    </SortableContext>
  )
}

export default ListColumns
