import { Fragment } from 'react'
import { Typography } from '@mui/material'

import { Input } from '@/components/ui'
import { NOOP } from '@/constants'
import { StepError } from './StepError'

import styles from './CustomersStep.module.sass'

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

export const CustomersStep = ({ error, fields, setFields }) => {
  const handleChange = ({ target: { name, value } }) =>
    setFields({ ...fields, [name]: value })
  console.log(error)

  return (
    <article className={styles.twoCol}>
      {error && (
        <div className={styles.error}>
          <StepError>{error}</StepError>
        </div>
      )}
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

export const customersStepValidator = (
  fields,
  setError: (str) => void = NOOP
) => {
  let isValid = true
  // Fields that need to be truthy
  const truthyErrors = Object.entries({
    customerName: 'Company Name',
    customerId: 'Customer ID',
    status: 'Status',
  }).reduce((errors, [field, label]) => {
    if (!fields[field]) {
      errors.push(label)
    }
    return errors
  }, [])
  if (truthyErrors.length) {
    setError(
      `${truthyErrors.join(', ')} ${truthyErrors.length > 1 ? 'are' : 'is'} required`
    )
    isValid = false
  }
  // Need either contact email or phone
  if (!fields.email && !fields.phone) {
    setError('At least one contact method is required')
    isValid = false
  }
  // Need either an account manager or order planner
  if (!fields.accountManager && !fields.orderPlanner) {
    setError('At least one order owner is required')
    isValid = false
  }

  if (isValid) {
    setError('')
  }
  return isValid
}
