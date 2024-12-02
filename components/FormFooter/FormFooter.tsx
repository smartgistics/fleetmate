import cs from 'clsx'

import { LayoutComponentProps } from '@/types/components'

import styles from './FormFooter.module.sass'

export const FormFooter = ({ children, className }: LayoutComponentProps) => (
  <footer className={cs(styles.root, className)}>{children}</footer>
)
