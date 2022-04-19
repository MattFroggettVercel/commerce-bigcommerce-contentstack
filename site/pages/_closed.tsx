import { Layout } from '@components/common'
import { Text } from '@components/ui'

export default function Closed() {
  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20 flex flex-col items-center justify-center fit">
      <Text variant="heading">We'll be back.</Text>
      <Text className="">
        We're currently preparing the store for an exciting new launch, we will be back very soon.
      </Text>
    </div>
  )
}

Closed.Layout = Layout;