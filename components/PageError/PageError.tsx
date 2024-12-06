import { Typography } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

import styles from './PageError.module.sass'

export const PageError = ({ message }: { message?: string }) => (
  <div className={styles.root} role="alert">
    <WarningAmberIcon />
    <Typography variant="h5">Error</Typography>
    <Typography>{message ?? 'Failed to load carriers'}</Typography>
  </div>
)
