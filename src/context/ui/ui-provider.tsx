import { useReducer } from 'react'
import { UIContext, uiReducer } from '.'

interface Props {
  children: React.ReactNode
}

export interface UIState {
  isSidebarOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  isSidebarOpen: false,
  isAddingEntry: false,
  isDragging: false,
}

export const UIProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const openSidebar = () => {
    dispatch({ type: 'UI_OPEN_SIDEBAR' })
  }

  const closeSidebar = () => {
    dispatch({ type: 'UI_CLOSE_SIDEBAR' })
  }

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: 'UI_OPEN_ADD_ENTRY', payload: isAdding })
  }

  const startDragging = () => {
    dispatch({ type: 'UI_START_DRAGGING' })
  }

  const endDragging = () => {
    dispatch({ type: 'UI_END_DRAGGING' })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        setIsAddingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
