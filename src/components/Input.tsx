import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RefObject } from 'react'

export default function Input({
  className,
  placeholder,
  innerRef,
}: {
  className?: string
  placeholder?: string
  innerRef?: RefObject<HTMLInputElement>
}) {
  return (
    <div className={'flex justify-center ' + className}>
      <div className='relative'>
        <input
          type='text'
          className='h-28 w-[48rem] text-5xl font-semibold pl-4 pr-4 rounded-lg z-0 focus:outline-none bg-gray-100'
          maxLength={15}
          placeholder={placeholder}
          ref={innerRef}
        />
        <div className='absolute -translate-y-1/2 top-[50%] right-4'>
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
