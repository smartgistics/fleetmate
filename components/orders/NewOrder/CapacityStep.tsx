import { useState } from 'react'
import { Email as EmailIcon } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Tab, Typography } from '@mui/material'

import { Button } from '@/components/Button'

import styles from './CapacityStep.module.sass'

export const CapacityStep = () => {
  const [activeTab, setActiveTab] = useState('history')
  return (
    <article>
      <Typography className={styles.capacityDatum}>
        Last 30 days <strong>$1200</strong>
      </Typography>
      <Typography className={styles.capacityDatum}>
        DAT 7 Day <strong>$1060</strong>
      </Typography>
      <Typography className={styles.capacityDatum}>
        Greescreens Network <strong>$1000</strong>
      </Typography>

      <TabContext value={activeTab}>
        <TabList
          aria-label="More info"
          onChange={(_, tab) => setActiveTab(tab)}
        >
          <Tab label="Lane history" value="history" />
          <Tab label="Highway" value="highway" />
          <Tab label="TT Quotes" value="quotes" />
        </TabList>
        <TabPanel value="history">Lane history content</TabPanel>
        <TabPanel value="highway">Highway content</TabPanel>
        <TabPanel value="quotes">TT quotes content</TabPanel>
      </TabContext>

      <div className={styles.capacityActions}>
        <Button>Post to DAT</Button>
        <Button>Post to TT</Button>
        <Button>
          <EmailIcon />
          Email Carriers
        </Button>
      </div>
    </article>
  )
}

export const capacityStepValidator = () => {
  return true
}
