import { Grid, Typography } from '@mui/material'

import styles from './SummaryStep.module.sass'

export const SummaryStep = ({ fields }) => (
  <article className={styles.root}>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography component="h6">Account</Typography>
        <Typography component="p" variant="subtitle2">
          {fields.caller.name}
        </Typography>
        {Object.entries({
          parentCompany: 'Parent',
          customerId: 'Customer ID',
          status: 'Status',
          revenue: 'Revenue',
          creditStatus: 'Credit Status',
        }).map(([field, label]) => (
          <Typography key={field} variant="body2">
            {label}: {fields.caller[field]}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={6}>
        <Typography component="h6">Contact</Typography>
        <Typography variant="body2">{fields.caller.email}</Typography>
        <Typography variant="body2">{fields.caller.businessPhone}</Typography>
        <Typography component="p" variant="subtitle2">
          Order Owners
        </Typography>
        <Typography variant="body2">
          Account manager: {fields.caller.accountManager}
        </Typography>
        <Typography variant="body2">
          Order planner: {fields.caller.orderPlanner}
        </Typography>
      </Grid>

      <Grid className={styles.totals} item xs={12}>
        <Typography component="p" variant="subtitle2">
          Total Customer Rate: $XX,XXX.XX
        </Typography>
        <Typography component="p" variant="subtitle2">
          Total Carrier Rate: $XX,XXX.XX
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component="h6">Requirements/Notes</Typography>
        <Typography>
          OK, yeah, no, I did not write this&hellip; OK, like, I didn’t even
          choose this font! It’s horrible. What kind of barnyard were you raised
          in? I don’t want to brag, but Us Weekly once described me as ‘up for
          anything.’ The idea of me life coaching another human being should
          scare you&hellip; a lot. I totally get that. We just need a body. Then
          go to the morgue.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component="h6">Load Details</Typography>
      </Grid>

      <Grid className={styles.totals} item xs={12}>
        <Typography>Total: XXXX lb, XX pieces, XX Pallets</Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component="p" variant="subtitle2">
          Commodity Description [Code #1]
        </Typography>
        <Typography>
          2,000 lbs, 6 pieces, 2 pallets, XX cube, XXXX volume
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component="h6">Pickup</Typography>
        <Typography className={styles.splitContent}>
          <strong>Location #1</strong> 12/05/24 @ 9:00 PM - 12:00 AM
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component="h6">Dropof</Typography>
        <Typography className={styles.splitContent}>
          <strong>Location #1</strong> 12/05/24 @ 9:00 PM - 12:00 AM
        </Typography>
      </Grid>
    </Grid>
  </article>
)
