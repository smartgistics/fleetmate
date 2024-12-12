import { format } from 'date-fns'

export function formatDate(
  dateString: Date | string | number,
  formatting = 'M/dd/yyyy'
) {
  if (!dateString || dateString === '0001-01-01T00:00:00') return ''
  const date = new Date(dateString)
  return format(date, formatting)
}

export const formatTime = (dateParam: Date | string | number) => {
  return format(new Date(dateParam), 'h:mmaaa')
}
