import type { Customer } from '@olis/db/schema/platform'
import type { CustomerFormSchema } from '@olis/ui/schemas/customers-forms'
import { Modal } from '@olis/ui/components/dialogs/modal'
import { useBaseModalStore } from '@olis/ui/hooks/use-base-modal-store'
import { PutCustomerForm } from '../forms/put-customer-form'

interface Props {
  customer?: Customer
  onSubmit: (data: CustomerFormSchema) => void
}

export function PutCustomerModal({ customer, onSubmit }: Props) {
  const { isOpen, close } = useBaseModalStore()

  return (
    <Modal close={close} isOpen={isOpen} title="Create new customer" description="Add a new customer to the portal">
      <PutCustomerForm customer={customer} onSubmit={onSubmit} />
    </Modal>
  )
}
