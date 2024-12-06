import cs from 'clsx'
import { ReactNode } from 'react'
import {
  AccountCircleOutlined,
  ContentPasteOutlined,
  MonetizationOnOutlined,
} from '@mui/icons-material'

import styles from './OrderModalTabs.module.sass'

interface Tab {
  id: string
  name: string
  icon: ReactNode
}

interface OrderModalTabsProps {
  activeTab: string
  setActiveTab: (tabId: string) => void
}

export function OrderModalTabs({
  activeTab,
  setActiveTab,
}: OrderModalTabsProps) {
  const tabs: Tab[] = [
    {
      id: 'customer',
      name: 'Customer',
      icon: <AccountCircleOutlined />,
    },
    {
      id: 'orderDetails',
      name: 'Order Details',
      icon: <ContentPasteOutlined />,
    },
    {
      id: 'financials',
      name: 'Financials',
      icon: <MonetizationOnOutlined />,
    },
  ]

  return (
    <nav aria-label="Tabs" className="flex -mb-px px-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          className={cs(
            `
            whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex items-center
            ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }
          `,
            styles.button
          )}
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}
          {tab.name}
        </button>
      ))}
    </nav>
  )
}
