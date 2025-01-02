import React from 'react'
import Part from './Part'

function Content({parts}) {
    console.log('name',props.content.parts[0].name);
  return (
    <div>
      {/* <p>{props.content[0][0] +' '+ props.content[0][1]}</p>
      <p>{props.content[1][0] +' '+ props.content[1][1]}</p>
      <p>{props.content[2][0] +' '+ props.content[2][1]}</p> */}
      <Part part={parts[0].name} exercise={parts[0].exercises}/>
      <Part part={parts[1].name} exercise={parts[1].exercises}/>
      <Part part={parts[2].name} exercise={parts[2].exercises}/>
    </div>
  )
}

export default Content
