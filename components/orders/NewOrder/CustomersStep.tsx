import { Fragment, useEffect, useMemo, useState } from 'react'
import {
  Autocomplete,
  FormControl,
  TextField,
  Typography,
  debounce,
} from '@mui/material'
import * as yup from 'yup'

import { Input } from '@/components/ui'
import { useCustomers } from '@/hooks/useTruckMate'
import { StepError } from './StepError'

import styles from './CustomersStep.module.sass'

const CustomerAutocomplete = ({ onChange, onClear }) => {
  const [term, setTerm] = useState('')
  const [displayValue, setDisplayValue] = useState('')
  const { customers, updateParams } = useCustomers({
    limit: 8,
    offset: 0,
    orderBy: 'name asc',
    filter: "name ne null and name ne ''",
    expand: ['contacts'],
    select: [
      'address1',
      'address2',
      'businessPhone',
      'businessPhoneExt',
      'city',
      'clientId',
      'comments',
      'country',
      'customerSince',
      'faxPhone',
      'name',
      'postalCode',
      'province',
      'status',
      'webEnabled',
    ],
  })

  // Debounced search function only handles the API call
  const debouncedSearch = useMemo(
    () =>
      debounce(() => {
        updateParams({
          filter: term
            ? `(contains(tolower(name), '${term.toLowerCase()}') or contains(tolower(clientId), '${term.toLowerCase()}'))`
            : "name ne null and name ne ''",
          offset: 0,
        })
      }, 500),
    [updateParams]
  )

  const customerOptions = useMemo(() => {
    if (!customers) return []
    return customers.map(({ clientId, name }) => ({
      label: name,
      value: clientId,
    }))
  }, [customers, term])

  useEffect(() => {
    debouncedSearch()
  }, [term])

  const handleChange = (_, value) => {
    const selected =
      customers.find(({ clientId }) => clientId === value?.value) || {}
    setDisplayValue(value.label)
    onChange(selected)
  }

  const handleInputChange = (_, value, reason) => {
    if (reason === 'clear') {
      setTerm('')
      setDisplayValue('')
      onClear()
    }
    setTerm(value)
    setDisplayValue(value)
  }

  return (
    <FormControl className={styles.autocomplete} fullWidth size="small">
      <Autocomplete
        disablePortal
        fullWidth
        inputValue={displayValue}
        isOptionEqualToValue={(option: any, value) => option.value === value}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={customerOptions}
        renderInput={(params) => (
          <TextField
            label="Company name"
            size="small"
            variant="outlined"
            {...params}
          />
        )}
        size="small"
        value={displayValue}
      />
    </FormControl>
  )
}

const ContactAutocomplete = ({ label, onChange, onClear, options = [] }) => {
  const [displayValue, setDisplayValue] = useState('')

  const localOptions = useMemo(
    () =>
      options.map(({ clientId, name }) => ({
        label: name,
        value: clientId,
      })),
    [JSON.stringify(options)]
  )

  const clearField = () => {
    setDisplayValue('')
    onClear()
  }

  useEffect(clearField, [JSON.stringify(options)])

  const handleChange = (_, value) => {
    const selected =
      options.find(({ clientId }) => clientId === value?.value) || {}
    setDisplayValue(value.label)
    onChange(selected)
  }

  const handleInputChange = (_, value, reason) => {
    if (reason === 'clear') {
      clearField()
      return
    }
    setDisplayValue(value)
  }

  return (
    <FormControl className={styles.autocomplete} fullWidth size="small">
      <Autocomplete
        disablePortal
        freeSolo
        fullWidth
        inputValue={displayValue}
        isOptionEqualToValue={(option: any, value) => option.value === value}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={localOptions}
        renderInput={(params) => (
          <TextField
            label={label}
            size="small"
            variant="outlined"
            {...params}
          />
        )}
        size="small"
        value={displayValue}
      />
    </FormControl>
  )
}

const TextInput = ({ label, value }) => (
  <>
    <label>{label}</label>
    <Input disabled value={value} />
  </>
)

export const CustomersStep = ({ error, fields, setFields }) => {
  console.log(fields)
  return (
    <article className={styles.twoCol}>
      {error && (
        <div className={styles.error}>
          <StepError>{error}</StepError>
        </div>
      )}
      <div className={styles.column}>
        <Typography variant="h5">Account Information</Typography>
        <label htmlFor="customerName">Company Name</label>
        <CustomerAutocomplete
          onChange={(caller) => {
            setFields({ ...fields, caller })
          }}
          onClear={() => {
            setFields({ ...fields, caller: {} })
          }}
        />
        <TextInput label="Parent Company" value={fields.caller.parentCompany} />
        <TextInput label="Customer ID" value={fields.caller.clientId} />
        <TextInput label="Status" value={fields.caller.status} />
        <TextInput label="Revenue" value={fields.caller.revenue} />
        <TextInput label="Credit Status" value={fields.caller.creditStatus} />
      </div>

      <div className={styles.column}>
        <Typography variant="h5">Contact Information</Typography>
        <TextInput label="Email" value={fields.caller.email} />
        <TextInput label="Phone" value={fields.caller.businessPhone} />

        <Typography variant="h5">Order Owners</Typography>
        <ContactAutocomplete
          label="Account Manager"
          onChange={(accountManager) =>
            setFields({ ...fields, accountManager })
          }
          onClear={() => setFields({ ...fields, accountManager: {} })}
          options={fields.caller.contacts}
        />
        <ContactAutocomplete
          label="Order Planner"
          onChange={(orderPlanner) => setFields({ ...fields, orderPlanner })}
          onClear={() => setFields({ ...fields, orderPlanner: {} })}
          options={fields.caller.contacts}
        />
      </div>
    </article>
  )
}

const sx = (s) => `${s} is required`

export const customersSchema = yup.object().shape({
  caller: yup.object().shape({
    clientId: yup.string().required(sx('Customer ID')),
  }),
})
