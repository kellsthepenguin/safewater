import Input from '@/components/Input'
import Topbar from '@/components/Topbar'
import { useEffect, useState } from 'react'

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
      <div className='fixed bottom-0 font-mono'>
        <p>
          Made with <span className='text-red-500'>♥</span> by{' '}
          <a href='https://github.com/kellsthepenguin' target='_blank'>
            kellsthepenguin
          </a>
        </p>
      </div>
    </div>
  )
}
