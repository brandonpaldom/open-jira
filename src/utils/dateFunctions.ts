import { formatDistanceToNow } from 'date-fns'

export const formatDistance = (date: number) => {
  return formatDistanceToNow(date, { addSuffix: true })
}
