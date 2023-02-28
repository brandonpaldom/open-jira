import { useEffect, useReducer } from 'react'
import { Entry } from '@/interfaces'
import { EntriesContext, entriesReducer } from '.'
import { useSnackbar } from 'notistack'
import { entriesApi } from '@/api'

interface Props {
  children: React.ReactNode
}

export interface EntriesState {
  entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)
  const { enqueueSnackbar } = useSnackbar()

  const addEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description })
    dispatch({ type: 'ADD_ENTRY', payload: data })
  }

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      })

      dispatch({ type: 'UPDATE_ENTRY', payload: data })
      if (showSnackbar) {
        enqueueSnackbar('Entry updated', {
          variant: 'success',
          autoHideDuration: 3000,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: 'REFRESH_ENTRIES', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider value={{ ...state, addEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  )
}
