import { useContext, useState } from 'react'
import { Box, Button, Stack, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import AddIcon from '@mui/icons-material/Add'
import { EntriesContext } from '@/context/entries'
import { UIContext } from '@/context/ui'

export const NewEntry: React.FC = () => {
  const { addEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setTouched(true)
  }

  const handleSave = () => {
    if (value.length === 0) return
    addEntry(value)
    setValue('')
    setIsAddingEntry(false)
    setTouched(false)
  }

  return (
    <Box sx={{ paddingX: 2, marginBottom: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            label="New entry"
            variant="outlined"
            placeholder="What do you want to do?"
            autoFocus
            multiline
            sx={{ marginBottom: 2 }}
            helperText={
              touched && value.length === 0 ? 'This field is required' : ''
            }
            error={touched && value.length === 0}
            value={value}
            onChange={handleChange}
            onBlur={() => setTouched(true)}
          />
          <Stack direction="row" justifyContent="space-between">
            <Button color="secondary" onClick={() => setIsAddingEntry(false)}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </Stack>
        </>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddingEntry(true)}
        >
          Add new entry
        </Button>
      )}
    </Box>
  )
}
