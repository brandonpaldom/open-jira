import { useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Layout } from '@/components/layouts'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
  IconButton,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import { Entry, EntryStatus } from '@/interfaces'
import { dbEntries } from '@/database'
import { EntriesContext } from '@/context/entries'
import { dateFunctions } from '@/utils'

const validStatus: EntryStatus[] = ['to-do', 'in-progress', 'done']

interface Props {
  entry: Entry
}

export const EntryPage: React.FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext)

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(
    () => inputValue.length === 0 && touched,
    [inputValue, touched]
  )

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setTouched(true)
  }

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const handleSave = () => {
    if (inputValue.length === 0) {
      return
    }

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status,
    }

    updateEntry(updatedEntry, true)
  }

  return (
    <Layout title="Entry - OpenJira">
      <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={inputValue ? inputValue : 'Untitled'}
              subheader={`Created ${dateFunctions.formatDistance(
                entry.createdAt
              )}`}
            />
            <CardContent sx={{ padding: 2 }}>
              <TextField
                fullWidth
                label="Edit your entry here"
                multiline
                autoFocus
                placeholder="What did you do today?"
                rows={4}
                value={inputValue}
                onChange={onInputValueChange}
                helperText={isNotValid && 'Please enter a title for your entry'}
                onBlur={() => setTouched(true)}
                error={isNotValid}
              />
              <FormControl>
                <FormLabel sx={{ marginTop: 2 }}>
                  What is the status of this entry?
                </FormLabel>
                <RadioGroup row value={status} onChange={onStatusChange}>
                  {validStatus.map((status) => (
                    <FormControlLabel
                      key={status}
                      value={status}
                      control={<Radio />}
                      label={capitalize(status)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'end',
                paddingRight: 2,
                paddingBottom: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={inputValue.length === 0}
              >
                Update
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: 'error.dark',
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Layout>
  )
}

export default EntryPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { entry },
  }
}
