import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RefObject, useEffect, useState } from 'react'

export default function Input({
  className,
  placeholder,
  innerRef,
  onSearchTriggered,
}: {
  className?: string
  placeholder?: string
  innerRef?: RefObject<HTMLInputElement>
  onSearchTriggered?: () => void
}) {
  const [width, setWidth] = useState(0)

  useEffect(() => setWidth(window.innerWidth), [])

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  }

  return (
    <div className={'flex justify-center ' + className}>
      <div className='relative'>
        <input
          type='text'
          className='h-20 md:h-28 w-[24rem] max-sm:w-72 md:w-[48rem] text-3xl sm:text-5xl font-semibold pl-4 pr-4 rounded-lg z-0 focus:outline-none bg-gray-100'
          maxLength={width < 768 ? 6 : 15}
          placeholder={placeholder}
          ref={innerRef}
        />
        <div
          className='absolute -translate-y-1/2 top-[50%] right-4'
          onClick={onSearchTriggered}
        >
          <FontAwesomeIcon
            icon={faSearch}
            size='3x'
            className='text-blue-500'
          />
        </div>
      </div>
    </div>
  )
}
