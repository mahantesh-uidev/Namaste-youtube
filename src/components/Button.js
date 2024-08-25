import React from 'react'

const Button = ({name}) => {
  return (
    <div>
        <button className='px-5 py-2 m-1 rounded-lg bg-gray-200'>{name}</button>
    </div>
  )
}

export default Button;