import { EntriesState } from '.'
import { Entry } from '@/interfaces'

type EntriesAction =
  | { type: 'ADD_ENTRY'; payload: Entry }
  | { type: 'UPDATE_ENTRY'; payload: Entry }
  | { type: 'REFRESH_ENTRIES'; payload: Entry[] }

export const entriesReducer = (
  state: EntriesState,
  action: EntriesAction
): EntriesState => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      }
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status
            entry.description = action.payload.description
          }
          return entry
        }),
      }
    case 'REFRESH_ENTRIES':
      return {
        ...state,
        entries: [...action.payload],
      }
    default:
      return state
  }
}
