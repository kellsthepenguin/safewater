import Organization from './Organization'
import UnsuitableItem from './UnsuitableItem'

export default interface Product {
  name: string
  organization: Organization
  unsuitableItems: UnsuitableItem[]
}
