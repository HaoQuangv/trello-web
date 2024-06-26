import Box from '@mui/system/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatter'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar({ board }) {
  return (
    <Box sx={{
      backgroundColor: 'white',
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderBottom: '1px solid white',
      paddingX: 2,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' :'#1976d2'),
      '&::-webkit-scrollbar-track': {
        m: 2
      }
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Tooltip title={board?.description}>
          <Chip
            icon={<SpaceDashboardIcon /*color='primary.main' có thể dùng cách này để thay đổi màu của icon*//>}
            label={board?.title}
            clickable
            //onClick={() => {}} Tương tự như clickable
            sx={MENU_STYLES}
          />
        </Tooltip>

        <Chip
          icon={<VpnLockIcon /*color='primary.main' có thể dùng cách này để thay đổi màu của icon*//>}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          //onClick={() => {}} Tương tự như clickable
          sx={MENU_STYLES}
        />

        <Chip
          icon={<AddToDriveIcon /*color='primary.main' có thể dùng cách này để thay đổi màu của icon*//>}
          label="Add To Google Drive"
          clickable
          //onClick={() => {}} Tương tự như clickable
          sx={MENU_STYLES}
        />

        <Chip
          icon={<BoltIcon /*color='primary.main' có thể dùng cách này để thay đổi màu của icon*//>}
          label="Automation"
          clickable
          //onClick={() => {}} Tương tự như clickable
          sx={MENU_STYLES}
        />

        <Chip
          icon={<FilterListIcon /*color='primary.main' có thể dùng cách này để thay đổi màu của icon*//>}
          label="Filter"
          clickable
          //onClick={() => {}} Tương tự như clickable
          sx={MENU_STYLES}
        />
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Button
          variant="outlined"
          startIcon={ <PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white'
            }
          }}
        >
          Invite
        </Button>
        <AvatarGroup max={7}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0de' }
            }
          }}>
          <Tooltip title='buihaoquang'>
            <Avatar
              alt="buihaoquang"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Golden_tabby_and_white_kitten_n01.jpg/1200px-Golden_tabby_and_white_kitten_n01.jpg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>

          <Tooltip title='buihaoquang'>
            <Avatar alt="Remy Sharp"
              src="https://vnp.1cdn.vn/2023/01/19/anh-meo-6(1).jpeg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>

    </Box>
  )
}

export default BoardBar
