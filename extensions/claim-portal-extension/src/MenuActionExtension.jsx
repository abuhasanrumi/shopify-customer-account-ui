import {
  Button,
  reactExtension,
  useApi,
  useOrder,
  useShop,
  useStorage
} from '@shopify/ui-extensions-react/customer-account'
import { useEffect } from 'react'

export default reactExtension(
  'customer-account.order.action.menu-item.render',
  () => <MenuActionExtension />
)

function MenuActionExtension() {
  const { i18n, orderId } = useApi()
  const storage = useStorage()

  

  return <Button to={`extension:/${orderId}`}>File a claim</Button>
}
