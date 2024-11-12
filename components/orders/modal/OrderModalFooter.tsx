interface OrderModalFooterProps {
  onClose: () => void;
  onNext: () => void;
  isLastTab: boolean;
}

export function OrderModalFooter({
  onClose,
  onNext,
  isLastTab,
}: OrderModalFooterProps) {
  return (
    <div className='mt-8 flex justify-end border-t pt-4'>
      <button
        type='button'
        onClick={onClose}
        className='mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500'
      >
        Cancel
      </button>
      {isLastTab ? (
        <button
          type='submit'
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
        >
          Create Order
        </button>
      ) : (
        <button
          type='button'
          onClick={onNext}
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
        >
          Next
        </button>
      )}
    </div>
  );
}
