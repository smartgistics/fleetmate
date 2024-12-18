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

const TextInput = ({ label, value }) => (
  <>
    <label>{label}</label>
    <Input disabled value={value} />
  </>
)

const localFields = [
  {
    title: 'Contact Information',
    fields: {
      email: 'Email',
      businessPhone: 'Phone',
    },
  },
  {
    title: 'Order Owners',
    fields: {
      accountManager: 'Account Manager',
      orderPlanner: 'Order Planner',
    },
  },
]
export const CustomersStep = ({ error, fields, setFields }) => (
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
      {localFields.map((section, i) => (
        <Fragment key={`section_${i}`}>
          <Typography variant="h5">{section.title}</Typography>
          {Object.entries(section.fields).map(
            ([name, label]: [name: string, label: string], k) => (
              <TextInput
                key={`field_${k}`}
                label={label}
                value={fields.caller[name]}
              />
            )
          )}
        </Fragment>
      ))}
    </div>
  </article>
)

const sx = (s) => `${s} is required`

export const customersSchema = yup.object().shape({
  caller: yup.object().shape({
    clientId: yup.string().required(sx('Customer ID')),
  }),
})
