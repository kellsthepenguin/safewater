import Input from '@/components/Input'
import Topbar from '@/components/Topbar'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const [placeholder, setPlaceholder] = useState('')
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
  const { data, isLoading, error } = useSWR('/api/lastDataUpdated', fetcher)

  useEffect(() => {
    setPlaceholder(waterNames[Math.floor(Math.random() * waterNames.length)])
  }, [])

  return (
    <div className='flex flex-col items-center text-center'>
      <Topbar />
      <div>
        <p className='mt-14 sm:mt-28 text-4xl md:text-6xl font-bold'>
          매일 마시는 생수, 안전할까요?
        </p>
        <Input className='mt-8' placeholder={placeholder} />
      </div>
      <p className='fixed bottom-0 left-0 pl-1 font-mono text-sm max-md:hidden'>
        Made with <span className='text-red-500'>♥</span> by{' '}
        <a href='https://github.com/kellsthepenguin' target='_blank'>
          kellsthepenguin
        </a>
      </p>
      <div className='fixed bottom-0 font-mono'>
        <p>마지막 제품 데이터 업데이트: {data.product}</p>
        <p>마지막 제조업체 업데이트: {data.org}</p>
      </div>
    </div>
  )
}
