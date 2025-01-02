import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course=({id,name, parts})=>{

  return (
    <div >
       <Header course={name}/>
       <Content parts={parts}/>
       <Total total={31}/>
    </div> 
  );

}