import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
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
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
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
    </MuiCard>
  )
}

export default Card
