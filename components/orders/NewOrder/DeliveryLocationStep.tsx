import { ChangeEvent, useState } from 'react'
import { v4 } from 'uuid'
import {
  Add as AddIcon,
  CheckCircle as CheckIcon,
  Circle as CircleIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import {
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  Typography,
} from '@mui/material'
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'

import { Button } from '@/components/Button'
import { Input, Select } from '@/components/ui'
import { STATES_ALL } from '@/constants'
import { formatDate, formatTime } from '@/utils'

import styles from './DeliveryLocationStep.module.sass'

const initialLocation = {
  confirmed: false,
  scheduler: '',
  appointmentDate: new Date(),
  appointmentWindowStart: new Date(),
  appointmentWindowEnd: new Date(),
  address1: '',
  address2: '',
  city: '',
  province: '',
  postalCode: '',
  country: 'US',
  comment: '',
}

export const DeliveryLocationStep = ({
  deliveryField,
  fields,
  setFields,
  type,
}) => {
  const [location, setLocation] = useState(initialLocation)

  const onAdd = () => {
    setFields({
      ...fields,
      [deliveryField]: [...fields[deliveryField], { ...location, id: v4() }],
    })
    setLocation(initialLocation)
  }
  const onRemove = (id) => {
    setFields({
      ...fields,
      [deliveryField]: fields[deliveryField].filter((c) => c.id !== id),
    })
  }

  const handleLocationChange = ({ target: { name, value } }) =>
    setLocation({ ...location, [name]: value })

  return (
    <article className={styles.pickup}>
      <Typography>
        Add {type.toLowerCase()} locations and assign appointment details. These
        marked with <mark>blue links</mark> are confirmed.
      </Typography>

      <Typography component="h5">{type} Locations</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={location.confirmed} />}
              label="Confirmed"
              onChange={({
                target: { checked },
              }: ChangeEvent<HTMLInputElement>) =>
                setLocation({ ...location, confirmed: checked })
              }
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Input
            name="scheduler"
            onChange={handleLocationChange}
            placeholder="Scheduler"
            value={location.scheduler}
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
                setLocation({ ...location, appointmentDate })
              }
              slotProps={{
                textField: {
                  variant: 'standard',
                },
              }}
              value={location.appointmentDate}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={`${type} start time`}
              name="appointmentWindowStart"
              onChange={(appointmentWindowStart) =>
                setLocation({ ...location, appointmentWindowStart })
              }
              slotProps={{
                textField: {
                  variant: 'standard',
                },
              }}
              value={location.appointmentWindowStart}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label={`${type} end time`}
              name="appointmentWindowEnd"
              onChange={(appointmentWindowEnd) =>
                setLocation({ ...location, appointmentWindowEnd })
              }
              slotProps={{
                textField: {
                  variant: 'standard',
                },
              }}
              value={location.appointmentWindowEnd}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Input
            name="address1"
            onChange={handleLocationChange}
            placeholder="Address"
            value={location.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            name="address2"
            onChange={handleLocationChange}
            placeholder="Address line 2"
            value={location.address2}
          />
        </Grid>
        <Grid item xs={4}>
          <Input
            name="city"
            onChange={handleLocationChange}
            placeholder="City"
            value={location.city}
          />
        </Grid>
        <Grid item xs={4}>
          <Select
            onChange={(province) => setLocation({ ...location, province })}
            value={location.province ?? ''}
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
            value={location.postalCode}
          />
        </Grid>
        <Grid item xs={1}>
          <Button color="success" onClick={onAdd}>
            <AddIcon />
            Add
          </Button>
        </Grid>
      </Grid>

      <ul>
        {fields[deliveryField].map((l) => (
          <li key={l.id}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Typography>{l.scheduler}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  {l.confirmed ? (
                    <CheckIcon color="secondary" />
                  ) : (
                    <CircleIcon sx={{ color: 'var(--neutral57)' }} />
                  )}{' '}
                  Confirmed
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => onRemove(l.id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Pickup date: {formatDate(l.appointmentDate)} between{' '}
                  {formatTime(l.appointmentWindowStart)} and{' '}
                  {formatTime(l.appointmentWindowEnd)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography component="address">
                  {l.address1}
                  {l.address2 ? <br /> : null}
                  {l.address2}
                  <br />
                  {l.city}, {l.province} {l.postalCode}
                </Typography>
              </Grid>
            </Grid>
          </li>
        ))}
      </ul>
    </article>
  )
}

export const deliveryLocationStepValidator = () => {
  return true
}
