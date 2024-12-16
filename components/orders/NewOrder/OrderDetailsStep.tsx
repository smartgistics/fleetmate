import { ChangeEvent, useState } from 'react'
import { v4 } from 'uuid'
import * as yup from 'yup'
import {
  FormGroup,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

import { Button } from '@/components/Button'
import { Input } from '@/components/ui'
import { StepError } from './StepError'

import styles from './OrderDetailsStep.module.sass'

const initialCommodity = {
  code: '',
  weight: 0,
  pieces: 0,
  pallets: 0,
  cube: 0,
  volume: 0,
}

export const OrderDetailsStep = ({ error, fields, setFields }) => {
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
      {error && (
        <div className={styles.error}>
          <StepError>{error}</StepError>
        </div>
      )}
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

const sx = (s) => `${s} is required`

const tempValues = function (_, ctx) {
  const { temperatureControlled, temperatureMax, temperatureMin } = this.parent
  if (!temperatureControlled) {
    return true
  }
  if (isNaN(temperatureMax) || isNaN(temperatureMin)) {
    return ctx.createError({
      message: 'Temperature min and max are required if temperature controlled',
    })
  }
  return true
}

export const orderDetailsSchema = yup.object().shape({
  orderType: yup.string().required(sx('Order Type')),
  serviceType: yup.string().required(sx('Service Type')),
  equipmentType: yup.string().required(sx('Equipment Type')),
  serviceLevel: yup.string().required(sx('Service Level')),
  temperatureControlled: yup.boolean().test(tempValues),
  commodities: yup.array().min(1, sx('At least one commodity')),
})
