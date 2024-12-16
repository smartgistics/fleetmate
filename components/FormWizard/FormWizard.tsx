import { CheckCircle as CheckIcon } from '@mui/icons-material'
import { Button as MuiButton, Typography } from '@mui/material'
import cs from 'clsx'
import {
  MutableRefObject,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react'

import { FormFooter } from '@/components'
import { Button } from '@/components/Button'

import styles from './FormWizard.module.sass'

export interface FormWizardStep {
  component: ReactNode
  name: ReactNode | string
  submitText?: string
  hideIcon?: boolean
  validateComplete: () => Promise<boolean>
}

export interface FormWizardProps {
  classes?: {
    activeStep?: string
    completedStep?: string
    step?: string
    stepIcon?: string
    stepItem?: string
    stepNav?: string
  }
  disableSubmit?: boolean
  disableStepSelection?: boolean
  footerControls?: ReactNode
  onCancel: () => void
  onSubmit: () => boolean
  resetSteps?: MutableRefObject<() => void>
  hideCancelButton?: boolean
  hideFooterOnLastStep?: boolean
  stepHeader?: ReactNode
  steps: FormWizardStep[]
}

export const FormWizard = ({
  classes,
  disableStepSelection = false,
  disableSubmit = false,
  footerControls,
  onCancel,
  onSubmit,
  resetSteps,
  hideCancelButton = false,
  hideFooterOnLastStep = false,
  stepHeader,
  steps,
}: FormWizardProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = steps[activeIndex] || steps[0]
  const [completedSteps, setCompletedSteps] = useState([])
  const isLastStep = activeIndex === steps.length - 1

  const handleReset = () => {
    setActiveIndex(0)
    setCompletedSteps([])
  }

  useImperativeHandle(resetSteps, () => handleReset, [])

  const onStepSubmit = async (e) => {
    e.preventDefault()
    const isValid = await activeStep.validateComplete()
    if (!isValid) {
      return
    }
    if (!completedSteps.includes(activeStep.name)) {
      setCompletedSteps((prevSteps) => [...prevSteps, activeStep.name])
    }

    const nextStepIndex = activeIndex + 1

    if (!steps[nextStepIndex]) {
      await onSubmit()
      return
    }

    setActiveIndex(nextStepIndex)
  }

  const chooseStep = (step: number) => {
    if (disableStepSelection) {
      return
    }
    setActiveIndex(step)
  }

  return (
    <form
      action=""
      className={styles.root}
      method="post"
      onSubmit={onStepSubmit}
    >
      <div className={styles.main}>
        <ol className={cs(styles.stepNav, classes?.stepNav)}>
          {stepHeader && <li>{stepHeader}</li>}
          {steps.map((step, i) => (
            <li
              className={cs(
                {
                  [styles.activeStep]: activeStep?.name === step.name,
                  [styles.completedStep]: completedSteps.includes(step.name),
                },
                classes?.stepItem,
                { [classes?.activeStep]: activeStep?.name === step.name }
              )}
              key={i}
            >
              <MuiButton onClick={() => chooseStep(i)}>
                {!step.hideIcon && (
                  <CheckIcon className={cs(styles.icon, classes?.stepIcon)} />
                )}
                <Typography component="div">{step.name}</Typography>
              </MuiButton>
            </li>
          ))}
        </ol>
        <section className={cs(styles.steps, classes?.step)}>
          {activeStep.component}
        </section>
      </div>

      {(!isLastStep || (isLastStep && !hideFooterOnLastStep)) && (
        <FormFooter>
          <Button
            color="success"
            disabled={disableSubmit}
            onClick={onStepSubmit}
            type="submit"
          >
            {activeStep.submitText || 'Next'}
          </Button>
          {!hideCancelButton && onCancel && (
            <Button
              color="neutral"
              onClick={onCancel}
              size="large"
              variant="text"
            >
              Cancel
            </Button>
          )}
          {footerControls}
        </FormFooter>
      )}
    </form>
  )
}
