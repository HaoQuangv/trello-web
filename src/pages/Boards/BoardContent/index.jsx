import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50PX'
const COLUMN_FOOTER_HEIGHT = '56PX'

function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' :'#1976d2'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex',
      p: '10px 0'
    }}>
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
        <Box sx={{
          maxWidth: '300px',
          minWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' :'#ebecf0'),
          borderRadius: '6px',
          ml: 2,
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/*Column header*/}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2
            }}>
            <Typography variant='h6 'sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Column Title</Typography>
            <Box>
              <Tooltip title="More Options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  id="basic-menu-column-dropdown"
                  aria-controls={open ? 'basic-menu-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}/
                >
              </Tooltip>
              <Menu
                id="basic-menu-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-menu-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/*Column list card*/}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} - ${theme.spacing(5)})`,
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2cf'
            }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://img.pikbest.com/ai/illus_our/20230418/0c45cdac63d556194fd60b2f0f0fd81f.jpg!w700wp"
              />
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>BuiHaoQuang MERN Stack</Typography>
              </CardContent>
              <CardActions sx={{
                p: '0 4px 8px 4px'
              }}>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
          {/*Column footer*/}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2
          }}>
            <Button sx={{ cursor: 'pointer' }} startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="Drag to move" sx={{ cursor: 'pointer' }}>
              <DragHandleIcon />
            </Tooltip>
          </Box>
        </Box>

        {/*Box column 02*/}
        <Box sx={{
          maxWidth: '300px',
          minWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' :'#ebecf0'),
          borderRadius: '6px',
          ml: 2,
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/*Column header*/}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2
            }}>
            <Typography variant='h6 'sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Column Title</Typography>
            <Box>
              <Tooltip title="More Options">
                <ExpandMoreIcon
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  id="basic-menu-column-dropdown"
                  aria-controls={open ? 'basic-menu-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}/
                >
              </Tooltip>
              <Menu
                id="basic-menu-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-menu-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCut fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/*Column list card*/}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT} - ${theme.spacing(5)})`
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://img.meta.com.vn/Data/image/2021/09/22/anh-meo-cute-de-thuong-dang-yeu-2.jpg"
              />
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>BuiHaoQuang MERN Stack</Typography>
              </CardContent>
              <CardActions sx={{
                p: '0 4px 8px 4px'
              }}>
                <Button size="small" startIcon={<GroupIcon />}>20</Button>
                <Button size="small" startIcon={<CommentIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
              </CardActions>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              overflow: 'unset',
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&: last-child': {
                    p: 1.5
                  }
                }}
              >
                <Typography>Card 01</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}
export default BoardContent
