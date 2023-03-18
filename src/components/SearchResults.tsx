import Product from '@/types/Product'
import { ReactElement, JSXElementConstructor, ReactFragment } from 'react'
import ProductBox from './ProductBox'

export default function SearchResults({
  isVisible,
  products,
}: {
  isVisible: boolean
  products: Product[]
}) {
  const productBoxes: JSX.Element[] = []

  products.forEach((product, i) => {
    productBoxes.push(<ProductBox product={product} key={i} />)
  })

  return (
    <div
      className={`w-[65vw] mt-5 h-[calc(75vh-290px)] bg-slate-100 rounded-md overflow-auto inline-block ${
        !isVisible ? 'hidden' : ''
      }`}
    >
      <div className='flex gap-2 flex-col items-center my-2'>
        {productBoxes}
      </div>
    </div>
  )
}
