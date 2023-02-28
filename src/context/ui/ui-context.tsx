import { createContext } from 'react'

export interface UIContextProps {
  isSidebarOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
  setIsAddingEntry: (isAdding: boolean) => void
  openSidebar: () => void
  closeSidebar: () => void
  startDragging: () => void
  endDragging: () => void
}

export const UIContext = createContext({} as UIContextProps)
