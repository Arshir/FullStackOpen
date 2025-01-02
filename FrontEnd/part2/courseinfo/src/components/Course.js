import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";


const Course=({course})=>{
 console.log('Course component props', course)

 //const {id, name ,parts} =props.course

 //console.log('name', name,parts)
 
  return (

   
    <div >
      {course.map(({id,name,parts})=>
      //console.log('name of course', name, parts)
        <>
       <Header name = {name} />
       <Content parts = {parts} />
       <Total total={parts.reduce((total,part)=> {
        console.log('reduce exercise',part.exercises)
        return total+=part.exercises
        
        },0)}/>
       </>
     /* {  <Content parts={parts} />

       <Total total={parts.reduce((total,part)=> {
        console.log('reduce exercise',part.exercises)
        return total+=part.exercises
        
        },0)}/> }*/
        
      )}
    </div> 

    
  )
     
 }
export default Course