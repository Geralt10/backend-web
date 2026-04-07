import React, { useEffect, useState } from 'react'
import axios from 'axios';
const App = () => {
  const [notes, setNotes] = useState([])


  async function fetchData() {
     const response=await axios.get("http://localhost:3000/api/notes");
     console.log("Full response:", response.data);
     console.log("Notes:", response.data.note);
     setNotes(response.data.note)
    }


  useEffect(()=>{
    fetchData()
  },[])
 

  function handleForm(e){
    e.preventDefault();
    const {title,description}=e.target.elements;

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value,
    }).then((res)=>{
      console.log("note created");
      fetchData()
    })
    
  }
  

  function handleDelete(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then((res)=>{
      console.log(res.data);
      fetchData()
    })
  }
  
  function handleDescription(e,noteId){
    e.preventDefault();
    const {description}=e.target.elements;
    axios.patch("http://localhost:3000/api/notes/"+noteId,{
      description:description.value,
    }).then((res)=>{
      console.log(res.data);
      fetchData()
    })
    
  }
  
  return (
    <>
    <form className='forms' onSubmit={handleForm}>
      <input name='title' type="text" placeholder='title' />
      <input name='description' type="text" placeholder='description' />
      <button>create notes</button>
    </form>
    <div className="notes">
      {
        notes.map(note=>{
           return <div className="note" key={note._id}>
                     <h1>{note.title}</h1>
                     <p>{note.description}</p>
                     <form onSubmit={(e)=>handleDescription(e,note._id)}>
                      <input name='description' type="text" placeholder='update description'/>
                      <button>change description</button>
                     </form>
                     <button onClick={()=>handleDelete(note._id)}>Delete</button>
                     
                  </div>
                  
        })
      }
    </div>
    </>
  )
}

export default App
