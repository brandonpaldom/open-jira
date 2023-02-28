import { DragEvent, useContext, useMemo } from 'react'
import { EntriesContext } from '@/context/entries'
import { List, Paper } from '@mui/material'
import { EntryStatus } from '@/interfaces'
import { EntryCard } from './'
import { UIContext } from '@/context/ui'
import styles from './entry-list.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: React.FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const filteredEntries = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  )

  const handleDropEntry = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const entryId = e.dataTransfer.getData('text/plain')
    const entry = entries.find((entry) => entry._id === entryId)!
    updateEntry({ ...entry, status })
    endDragging()
  }

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div
      onDrop={handleDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ''}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 200px)',
          overflow: 'scroll',
          backgroundColor: 'transparent',
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.2 : 1,
            padding: 1,
            transition: 'all 0.2s',
          }}
        >
          {filteredEntries.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  )
}
