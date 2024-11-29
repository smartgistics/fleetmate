import { Box, Skeleton } from '@mui/material'

export function CellSkeleton() {
  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Skeleton width="80%" />
      <Skeleton width="50%" />
    </Box>
  )
}
