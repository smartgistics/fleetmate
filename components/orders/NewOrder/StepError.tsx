import { Typography } from '@mui/material'
import styles from './StepError.module.sass'

export const StepError = ({ children }) => (
  <div className={styles.root}>
    <Typography color="error">{children}</Typography>
  </div>
)
