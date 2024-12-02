import { Button as MuiButton } from '@mui/material'

export const Button = ({ children, ...rest }) => (
  <MuiButton color="primary" disableElevation variant="contained" {...rest}>
    {children}
  </MuiButton>
)
