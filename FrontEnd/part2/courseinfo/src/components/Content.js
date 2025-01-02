import React from 'react'
import Part from './Part'

function Content({parts}) {
    console.log('name part',parts);
  return (
    <div>
      {/* <p>{props.content[0][0] +' '+ props.content[0][1]}</p>
      <p>{props.content[1][0] +' '+ props.content[1][1]}</p>
      <p>{props.content[2][0] +' '+ props.content[2][1]}</p> */}
    {/*   <Part name={parts[0].name} exercise={parts[0].exercises}/>
      <Part name={parts[1].name} exercise={parts[1].exercises}/>
      <Part name={parts[2].name} exercise={parts[2].exercises}/> */}
      {parts.map((part,id)=>
        <Part key={id} name={part.name} exercise={part.exercises} />
      )}
    </div>
  )
}

export default Content
