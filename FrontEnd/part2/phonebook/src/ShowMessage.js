const ShowMessage=({message})=>{
 if(message ==null)
  return null;

  const messageStyle ={
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    padding: 2,
    borderRadius: 5,
    marginBottom: 10
  }

  return (
    <div  style={messageStyle}>
    <br />
    <em>{message}</em>
  </div>
  )

}

export default ShowMessage;