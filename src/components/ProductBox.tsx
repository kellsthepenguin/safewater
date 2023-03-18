import Product from '@/types/Product'
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProductBox({ product }: { product: Product }) {
  const isOrganizationHaveUnsuitableItems =
    product.organization && product.organization.unsuitableItems.length !== 0
  const isProductHaveUnsuitableItems = product.unsuitableItems.length !== 0

  return (
    <div className='flex text-left w-[calc(65vw-12px)] h-32 min-h-[8rem] bg-white rounded-md'>
      <div className='m-2'>
        <p className='font-bold mb-2'>
          {product.name} (
          {product.organization ? product.organization.name : '제조사 불명'})
        </p>
        <p>
          업체 부적합:{' '}
          {isOrganizationHaveUnsuitableItems ? (
            <span className='text-red-500 text-lg font-semibold'>발견됨</span>
          ) : (
            <span className='text-blue-500 text-lg font-semibold'>
              발견되지 않음
            </span>
          )}
        </p>
        <p>
          제품 부적합:{' '}
          {isProductHaveUnsuitableItems ? (
            <span className='text-red-500 text-lg font-semibold'>발견됨</span>
          ) : (
            <span className='text-blue-500 text-lg font-semibold'>
              발견되지 않음
            </span>
          )}
        </p>
        {isOrganizationHaveUnsuitableItems || isProductHaveUnsuitableItems ? (
          <p className='mt-1 text-red-500 font-semibold'>
            <FontAwesomeIcon icon={faXmarkCircle} /> 안전하지 않을 수 있습니다.
          </p>
        ) : (
          <p className='mt-1 text-green-500 font-semibold'>
            <FontAwesomeIcon icon={faCheckCircle} /> 안전합니다!
          </p>
        )}
      </div>
    </div>
  )
}
