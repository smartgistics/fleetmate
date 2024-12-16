import { Fragment } from 'react'
import { Typography } from '@mui/material'
import * as yup from 'yup'

import { Input } from '@/components/ui'
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

const sx = (s) => `${s} is required`

const requireEither = ([prop1, prop2], message) => {
  return function (val, ctx) {
    const field1 = this.parent[prop1]
    const field2 = this.parent[prop2]
    if (!field1 && !field2) return ctx.createError({ message })
    return true
  }
}

const contactMethodValidator = requireEither(
  ['phone', 'email'],
  sx('At least one contact method')
)
const orderOwnerValidator = requireEither(
  ['accountManager', 'orderPlanner'],
  sx('At least one order owner')
)

export const customersSchema = yup.object().shape({
  customerName: yup.string().required(sx('Company name')),
  customerId: yup.string().required(sx('Customer ID')),
  status: yup.string().required(sx('Status')),
  email: yup.string().test(contactMethodValidator),
  phone: yup.string().test(contactMethodValidator),
  accountManager: yup.string().test(orderOwnerValidator),
  orderPlanner: yup.string().test(orderOwnerValidator),
})
