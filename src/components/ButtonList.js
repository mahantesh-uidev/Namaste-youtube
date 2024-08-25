import React from 'react'
import Button from './Button';

const ButtonList = () => {
  const list = ['All','Live','Games','Recently Uploaded','Songs','Movies','News','Cooking','Cricket','Watched','New to you'];
  return (
    <div className='flex'>
      {list.map(l => <Button key={l} name={l} />)}
    </div>
  )
}

export default ButtonList;