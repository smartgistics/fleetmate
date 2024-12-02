import { Button } from '@/components/Button'
import { FormFooter } from '@/components/FormFooter'

interface OrderModalFooterProps {
  onClose: () => void
  onNext: () => void
  isLastTab: boolean
}

export function OrderModalFooter({
  onClose,
  onNext,
  isLastTab,
}: OrderModalFooterProps) {
  return (
    <FormFooter>
      {isLastTab ? (
        <Button color="success" type="submit">
          Create Order
        </Button>
      ) : (
        <Button onClick={onNext}>Next</Button>
      )}
      <Button color="neutral" onClick={onClose} variant="text">
        Cancel
      </Button>
    </FormFooter>
  )
}
