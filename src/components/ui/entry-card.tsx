import { DragEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import { UIContext } from '@/context/ui'
import { Entry } from '@/interfaces'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { dateFunctions } from '@/utils'

interface Props {
  entry: Entry
}

export const EntryCard: React.FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)
  const router = useRouter()

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', entry._id)
    startDragging()
  }

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    endDragging()
  }

  const handleCardClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleCardClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <Typography variant="body2" color="text.secondary">
            {dateFunctions.formatDistance(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
