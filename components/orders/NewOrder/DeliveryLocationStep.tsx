import { ChangeEvent } from 'react'
import * as yup from 'yup'
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from '@mui/material'
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import { Input, Select } from '@/components/ui'
import { STATES_ALL } from '@/constants'
import { StepError } from './StepError'

import styles from './DeliveryLocationStep.module.sass'

export const DeliveryLocationStep = ({
  error,
  deliveryField,
  fields,
  setFields,
  type,
}) => {
  const handleLocationChange = ({ target: { name, value } }) =>
    setFields({
      ...fields,
      [deliveryField]: { ...fields[deliveryField], [name]: value },
    })

  return (
    <article className={styles.pickup}>
      {error && (
        <div className={styles.error}>
          <StepError>{error}</StepError>
        </div>
      )}
      <Typography>
        Add {type.toLowerCase()} locations and assign appointment details. These
        marked with <mark>blue links</mark> are confirmed.
      </Typography>

      <Typography component="h5">{type} Locations</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={fields[deliveryField].confirmed} />}
              label="Confirmed"
              onChange={({
                target: { checked },
              }: ChangeEvent<HTMLInputElement>) =>
                setFields({
                  ...fields,
                  [deliveryField]: {
                    ...fields[deliveryField],
                    confirmed: checked,
                  },
                })
              }
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Input
            name="name"
            onChange={handleLocationChange}
            placeholder="Scheduler"
            value={fields[deliveryField].name}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              className={styles.datePicker}
              label={`${type} date`}
              minDate={new Date()}
              name="appointmentDate"
              onChange={(appointmentDate) =>
                setFields({
                  ...fields,
                  [deliveryField]: {
                    ...fields[deliveryField],
                    appointmentDate,
                  },
                })
              }
              slotProps={{
                textField: {
                  variant: 'standard',
                },
              }}
              value={fields[deliveryField].appointmentDate}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={`${type} start time`}
              name="appointmentWindowStart"
              onChange={(appointmentWindowStart) =>
                setFields({
                  ...fields,
                  [deliveryField]: {
                    ...fields[deliveryField],
                    appointmentWindowStart,
                  },
                })
              }
              slotProps={{
                textField: {
                  variant: 'standard',
                },
              }}
              value={fields[deliveryField].appointmentWindowStart}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={`${type} end time`}
              name="appointmentWindowEnd"
              onChange={(appointmentWindowEnd) =>
                setFields({
                  ...fields,
                  [deliveryField]: {
                    ...fields[deliveryField],
                    appointmentWindowEnd,
                  },
                })
              }
              slotProps={{
                textField: {
                  variant: 'standard',
                },
              }}
              value={fields[deliveryField].appointmentWindowEnd}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Input
            name="address1"
            onChange={handleLocationChange}
            placeholder="Address"
            value={fields[deliveryField].address1}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="address2"
            onChange={handleLocationChange}
            placeholder="Address line 2"
            value={fields[deliveryField].address2}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            name="city"
            onChange={handleLocationChange}
            placeholder="City"
            value={fields[deliveryField].city}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            onChange={(province) =>
              setFields({
                ...fields,
                [deliveryField]: { ...fields[deliveryField], province },
              })
            }
            value={fields[deliveryField].province ?? ''}
          >
            <>
              {STATES_ALL.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </>
          </Select>
        </Grid>
        <Grid item xs={4}>
          <Input
            name="postalCode"
            onChange={handleLocationChange}
            placeholder="Zip/Postal code"
            value={fields[deliveryField].postalCode}
          />
        </Grid>
      </Grid>
    </article>
  )
}

const sx = (s) => `${s} is required`

const deliveryLocationSchema = yup.object().shape({
  name: yup.string().required(sx('Scheduler')),
  appointmentDate: yup.date().required(sx('Appointment date')),
  address1: yup.string().required(sx('Address')),
  city: yup.string().required(sx('City')),
  province: yup.string().required(sx('State or province')),
  postalCode: yup.string().required(sx('Zip or postal code')),
})

export const pickupSchema = yup.object().shape({
  pickup: deliveryLocationSchema,
})

export const dropoffSchema = yup.object().shape({
  dropoff: deliveryLocationSchema,
})
