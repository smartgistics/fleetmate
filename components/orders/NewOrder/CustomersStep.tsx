import { Fragment } from 'react'
import { Typography } from '@mui/material'
import { Input } from '@/components/ui'

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

export const CustomersStep = ({ fields, setFields }) => {
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

export const customersStepValidator = () => {
  return true
}
