import type { Scope } from '@olis/db/schema/platform'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@olis/ui/components/tabs'
import { useBaseModalStore } from '@olis/ui/hooks/use-base-modal-store'

import { Modal } from './modal'

interface Props {
  scope: Scope
}

export function ScopeInfoModal({ scope }: Props) {
  const { isOpen, close } = useBaseModalStore()

  return (
    <Modal close={close} isOpen={isOpen} title={scope.label} description="Scope information" className="lg:max-w-[80%] h-[80%]">
      <Tabs defaultValue="overview" className="space-y-6 grow min-h-0 overflow-y-auto">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="past-projects">Past Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div>
            {scope.description}
          </div>
        </TabsContent>

      </Tabs>
    </Modal>
  )
}
