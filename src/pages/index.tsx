import Input from '@/components/Input'
import SearchResults from '@/components/SearchResults'
import Topbar from '@/components/Topbar'
import Product from '@/types/Product'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
  const [placeholder, setPlaceholder] = useState('')
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const waterNames = [
    '삼다수',
    '아이시스',
    '평창수',
    '백산수',
    '석수',
    '크리스탈',
    '스파클',
    '동원샘물',
    '에비앙',
    '순수',
  ]
  const {
    data: lastDataUpdated,
    isLoading,
    error,
  } = useSWR('/api/lastDataUpdated', fetcher)

  useEffect(() => {
    setPlaceholder(waterNames[Math.floor(Math.random() * waterNames.length)])
  }, [])

  const handleSearch = async () => {
    const query = inputRef.current?.value

    const result = await (await fetch('/api/search/' + query)).json()

    setIsSearchResultVisible(true)
    setProducts(result)
  }

  return (
    <div className='flex flex-col items-center'>
      <Topbar />
      <div className='flex flex-col items-center text-center'>
        <div>
          <p className='mt-14 sm:mt-28 text-4xl md:text-6xl font-bold'>
            매일 마시는 생수, 안전할까요?
          </p>
          <Input
            className='mt-8'
            placeholder={placeholder}
            innerRef={inputRef}
            onSearchTriggered={handleSearch}
          />
          <SearchResults
            isVisible={isSearchResultVisible}
            products={products}
          />
        </div>
      </div>
      <p className='fixed bottom-0 left-0 pl-1 font-mono text-sm'>
        Made with <span className='text-red-500'>♥</span> by{' '}
        <a href='https://github.com/kellsthepenguin' target='_blank'>
          kellsthepenguin
        </a>{' '}
        <span className='block'>
          이 사이트는 생수의 안전을 보증하지 않습니다.
        </span>
      </p>
      <div className='fixed bottom-0 font-mono max-md:hidden'>
        {isLoading || error ? (
          <p>로딩 중...</p>
        ) : (
          <>
            <p>마지막 제품 데이터 업데이트: {lastDataUpdated.product}</p>
            <p>마지막 제조업체 업데이트: {lastDataUpdated.org}</p>
          </>
        )}
      </div>
    </div>
  )
}
