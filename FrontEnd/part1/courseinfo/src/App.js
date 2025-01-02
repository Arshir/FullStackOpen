import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"

const App=()=> {
 
  const course ={
    id:1,
  name:'Half stack application development',
   parts: [ 
    {
      name:'Fundamentals of React',
      exercises:10
    },
    {
      name:'Using props to pass data',
      exercises:7
    },
     {
      name:'State of a component',
      exercises:14
    },
   ]
  }

  return <Course course={course}/>

 
}

export default App;
