import { useState } from 'react'
import { v4 } from 'uuid'
import { TabContext, TabList } from '@mui/lab'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { Grid, Tab, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { DataGrid } from '@/components'
import { Button } from '@/components/Button'
import { Input, Select } from '@/components/ui'

const initialCharge = {
  aChargeCode: '',
  quantity: '',
  rate: '',
}

const categories = {
  customer: ['Customer 1', 'Customer 2', 'Customer 3'],
  carrier: ['Carrier 1', 'Carrier 2', 'Carrier 3'],
  misc: ['Misc 1', 'Misc 2', 'Misc 3'],
}

const columns: GridColDef[] = [
  {
    field: 'aChargeCode',
    headerName: 'Type',
    flex: 0.5,
    align: 'left',
    renderCell: ({ row }) => <Typography>{row.aChargeCode}</Typography>,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    flex: 0.5,
    align: 'left',
    renderCell: ({ row }) => <Typography>{row.quantity}</Typography>,
  },
  {
    field: 'rate',
    headerName: 'Amount',
    flex: 1,
    align: 'right',
    renderCell: ({ row }) => <Typography>${(+row.rate).toFixed(2)}</Typography>,
  },
]

export const FinancialsStep = ({ fields, setFields }) => {
  const [activeTab, setActiveTab] = useState('customer')
  const [charge, setCharge] = useState(initialCharge)
  const paginationModel = {
    page: 0,
    pageSize: fields.aCharges.length,
  }

  const onAdd = () => {
    setFields({
      ...fields,
      aCharges: [...fields.aCharges, { ...charge, id: v4() }],
    })
    setCharge(initialCharge)
  }
  const onRemove = (id) => {
    setFields({
      ...fields,
      aCharges: fields.aCharges.filter((c) => c.id !== id),
    })
  }

  const handleChargeChange = ({ target: { name, value } }) =>
    setCharge({ ...charge, [name]: value })

  const changeTab = (_, tab) => {
    setCharge(initialCharge)
    setActiveTab(tab)
  }

  return (
    <article>
      <TabContext value={activeTab}>
        <TabList aria-label="Financial category" onChange={changeTab}>
          <Tab label="Customer" value="customer" />
          <Tab label="Carrier" value="carrier" />
          <Tab label="Misc." value="misc" />
        </TabList>
        <Typography component="h6">Add {activeTab} charges</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Select
              onChange={(aChargeCode) => setCharge({ ...charge, aChargeCode })}
              value={charge.aChargeCode}
            >
              <option value="">Rate Type</option>
              {categories[activeTab].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <Input
              name="quantity"
              onChange={handleChargeChange}
              placeholder="Quantity"
              value={charge.quantity}
            />
          </Grid>
          <Grid item xs={3}>
            <Input
              name="rate"
              onChange={handleChargeChange}
              placeholder="$0.00"
              value={charge.rate}
            />
          </Grid>
          <Grid item xs={2}>
            <Button color="success" onClick={onAdd}>
              Add
            </Button>
          </Grid>
        </Grid>
      </TabContext>

      <DataGrid
        columns={[
          ...columns,
          {
            headerName: '',
            flex: 0.1,
            renderCell: ({ row }) => (
              <Typography>
                <Button
                  onClick={() => onRemove(row.id)}
                  sx={{ minWidth: '0', padding: '0' }}
                  variant="text"
                >
                  <DeleteIcon color="error" />
                </Button>
              </Typography>
            ),
          } as GridColDef,
        ]}
        paginationModel={paginationModel}
        rows={fields.aCharges}
      />
    </article>
  )
}

export const financialsStepValidator = () => {
  return true
}
