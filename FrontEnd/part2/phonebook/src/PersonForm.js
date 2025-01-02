

const PersonForm=(props)=>{
return (
<form>
<h3>add a new</h3>
<div>
    {props.nameInput}
    {props.numberInput}
 {/*  name: <input value={newName} onChange={(event)=>setNewName(event.target.value)}/>
  number:<input value={phoneNumber} onChange={(event)=>setPhoneNumber(event.target.value)} type='phone'/> */}
</div>
<div>
 {props.submitButton}
</div>
</form>
)
}

export default PersonForm