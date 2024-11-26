"use client"

import cs from 'clsx'
import { ReactNode } from 'react'

import styles from './Select.module.sass'

export interface SelectProps {
  children: ReactNode | ReactNode[]
  className?: string
  onChange: (value: string) => void
  value: string
}

export const Select = ({ children, className, onChange, value }: SelectProps) => (
  <select
    className={cs(styles.root, className)}
    value={value}
    onChange={({ target: { value } }) => onChange(value)}
  >
    {children}
  </select>
)
