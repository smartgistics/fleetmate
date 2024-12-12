'use client'

import cs from 'clsx'
import React, { ChangeEvent, Fragment, useState } from 'react'
import { v4 } from 'uuid'
import {
  Add as AddIcon,
  CheckCircle as CheckIcon,
  Circle as CircleIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import {
  FormGroup,
  FormControlLabel,
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
import { FormWizard } from '@/components/FormWizard'
import { Input, Select } from '@/components/ui'
import { STATES_ALL } from '@/constants'
import { formatDate, formatTime } from '@/utils'

import styles from './NewOrderModal.module.sass'

interface NewOrderModalProps {
  onClose: () => void
}

const CustomersStep = ({ fields, setFields }) => {
  const localFields = [
    [
      {
        title: 'Account Information',
        fields: {
          customerName: 'Company Name',
          parentCompany: 'Parent Company',
          customerId: 'Customer ID',
          status: 'Status',
          revenue: 'Revenue',
          creditStatus: 'Credit Status',
        },
      },
    ],
    [
      {
        title: 'Contact Information',
        fields: {
          email: 'Email',
          phone: 'Phone',
        },
      },
      {
        title: 'Order Owners',
        fields: {
          accountManager: 'Account Manager',
          orderPlanner: 'Order Planner',
        },
      },
    ],
  ]

  const handleChange = ({ target: { name, value } }) =>
    setFields({ ...fields, [name]: value })

  return (
    <article className={styles.twoCol}>
      {localFields.map((column, i) => (
        <div className={styles.column} key={`column_${i}`}>
          {column.map((section, j) => (
            <Fragment key={`section_${j}`}>
              <Typography variant="h5">{section.title}</Typography>
              {Object.entries(section.fields).map(
                ([name, label]: [name: string, label: string], k) => (
                  <Fragment key={`field_${k}`}>
                    <label htmlFor={name}>{label}</label>
                    <Input
                      id={name}
                      name={name}
                      onChange={handleChange}
                      value={fields[name]}
                    />
                  </Fragment>
                )
              )}
            </Fragment>
          ))}
        </div>
      ))}
    </article>
  )
}

const initialCommodity = {
  code: '',
  weight: 0,
  pieces: 0,
  pallets: 0,
  cube: 0,
  volume: 0,
}

const OrderDetails = ({ fields, setFields }) => {
  const [commodity, setCommodity] = useState(initialCommodity)
  const onAdd = () => {
    setFields({
      ...fields,
      commodities: [...fields.commodities, { ...commodity, id: v4() }],
    })
    setCommodity(initialCommodity)
  }
  const onRemove = (id) => {
    setFields({
      ...fields,
      commodities: fields.commodities.filter((c) => c.id !== id),
    })
  }

  const handleChange = ({ target: { name, value } }) =>
    setFields({ ...fields, [name]: value })

  const handleCommodityChange = ({ target: { name, value } }) =>
    setCommodity({ ...commodity, [name]: value })

  return (
    <article>
      <div className={styles.twoCol}>
        <Input
          name="orderType"
          onChange={handleChange}
          placeholder="Order Type"
          value={fields.orderType}
        />
        <Input
          name="serviceType"
          onChange={handleChange}
          placeholder="Service Type"
          value={fields.serviceType}
        />
        <Input
          name="equipmentType"
          onChange={handleChange}
          placeholder="Equipment Type"
          value={fields.equipmentType}
        />
        <Input
          name="serviceLevel"
          onChange={handleChange}
          placeholder="Service Level"
          value={fields.serviceLevel}
        />
      </div>

      <div className={styles.tempRange}>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={fields.temperatureControlled} />}
            label="Temperature Controlled?"
            onChange={({
              target: { checked },
            }: ChangeEvent<HTMLInputElement>) =>
              setFields({ ...fields, temperatureControlled: checked })
            }
          />
        </FormGroup>
        <label htmlFor="temperatureMin">Range:</label>
        <Input
          name="temperatureMin"
          onChange={handleChange}
          placeholder="Min"
          type="number"
          value={fields.temperatureMin}
        />
        <span>°F -</span>
        <Input
          name="temperatureMax"
          onChange={handleChange}
          placeholder="Max"
          type="number"
          value={fields.temperatureMax}
        />
        <span>°F</span>
      </div>

      <div className={styles.commodities}>
        <Typography component="p" variant="body2">
          Add the commodities attached to this order
        </Typography>

        <div className={styles.commodityFields}>
          <div>
            <label htmlFor="weight">Weight</label>
            <Input
              name="weight"
              onChange={handleCommodityChange}
              type="number"
              value={commodity.weight}
            />
            <Typography variant="caption">lbs</Typography>
          </div>
          <div>
            <label htmlFor="pieces">Pieces</label>
            <Input
              name="pieces"
              onChange={handleCommodityChange}
              type="number"
              value={commodity.pieces}
            />
          </div>
          <div>
            <label htmlFor="pallets">Pallets</label>
            <Input
              name="pallets"
              onChange={handleCommodityChange}
              type="number"
              value={commodity.pallets}
            />
          </div>
          <div>
            <label htmlFor="cube">Cube</label>
            <Input
              name="cube"
              onChange={handleCommodityChange}
              type="number"
              value={commodity.cube}
            />
          </div>
          <div>
            <label htmlFor="volume">Volume</label>
            <Input
              name="volume"
              onChange={handleCommodityChange}
              type="number"
              value={commodity.volume}
            />
          </div>
        </div>
        <div className={styles.flex}>
          <Input
            name="code"
            onChange={handleCommodityChange}
            placeholder="Commodity Code and Description"
            value={commodity.code}
          />
          <Button color="success" onClick={onAdd}>
            Add
          </Button>
        </div>

        <ul>
          {fields.commodities.map((c) => (
            <li key={c.id}>
              <Typography variant="h5">{c.code}</Typography>
              <Typography color="neutral" variant="body2">
                {c.weight} lbs, {c.pieces} pieces, {c.pallets} pallets, {c.cube}{' '}
                cube, {c.volume} volume
              </Typography>
              <IconButton onClick={() => onRemove(c.id)}>
                <CloseIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

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

const DeliveryLocation = ({ deliveryField, fields, setFields, type }) => {
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

export const NewOrderModal = (props: NewOrderModalProps) => {
  const { onClose } = props
  const [fields, setFields] = useState({
    customerName: '',
    parentCompany: '',
    customerId: '',
    status: '',
    revenue: '',
    creditStatus: '',
    email: '',
    phone: '',
    accountManager: '',
    orderPlanner: '',
    orderType: '',
    serviceType: '',
    equipmentType: '',
    serviceLevel: '',
    temperatureControlled: false,
    temperatureMin: undefined,
    temperatureMax: undefined,
    commodities: [],
    pickup: [],
    dropoff: [],
  })

  const handleSubmit = () => {
    return true
  }

  const formSteps = [
    {
      name: 'Customer',
      component: <CustomersStep fields={fields} setFields={setFields} />,
      submitText: 'Next: Order Details',
      validateComplete: () => true,
    },
    {
      name: 'Order Details',
      component: <OrderDetails fields={fields} setFields={setFields} />,
      submitText: 'Next: Pickup',
      validateComplete: () => true,
    },
    {
      name: 'Pickup',
      component: (
        <DeliveryLocation
          deliveryField="pickup"
          fields={fields}
          setFields={setFields}
          type="Pickup"
        />
      ),
      submitText: 'Next: Dropoff',
      validateComplete: () => true,
    },
    {
      name: 'Dropoff',
      component: (
        <DeliveryLocation
          deliveryField="dropoff"
          fields={fields}
          setFields={setFields}
          type="Delivery"
        />
      ),
      submitText: 'Next: Dropoff',
      validateComplete: () => true,
    },
  ]

  return (
    <div className={cs('fixed inset-0 z-50 overflow-y-auto', styles.root)}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div className="bg-white">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4 border-b">
              <Typography className="text-2xl font-semibold text-gray-900">
                Create New Order
              </Typography>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            </header>
          </div>
          <FormWizard
            onCancel={onClose}
            onSubmit={handleSubmit}
            steps={formSteps}
          />
        </div>
      </div>
    </div>
  )
}
