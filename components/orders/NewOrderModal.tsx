'use client'

import cs from 'clsx'
import React, { ChangeEvent, Fragment, useState } from 'react'
import { v4 } from 'uuid'
import { Close as CloseIcon } from '@mui/icons-material'
import {
  FormGroup,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from '@mui/material'

import { Button } from '@/components/Button'
import { FormWizard } from '@/components/FormWizard'
import { Input } from '@/components/ui/input'

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
    <article>
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
