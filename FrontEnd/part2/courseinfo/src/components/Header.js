import React from 'react'


const Header = ({name}) => {
  console.log('name object',name)
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}



export default Header
