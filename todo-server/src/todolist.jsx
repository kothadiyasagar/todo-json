import { useEffect, useState } from "react";
import{nanoid} from 'nanoid'
import Todoitem from "./todoitem"
import './todo.css'
const TodoList =()=>{
   const[task,setTask]=useState("")
   const[todo,setTodo]=useState([])
   let[pageNo,setPage]=useState(1)
   const handal=(e)=>{
      setTask(e.target.value)
   }
//    const handclick=()=>{
//        let payload={
//            id:nanoid(),
//            title:task,
//            status:false
//        }
//     //    setTodo([payload,...todo])
//    }
     const Todoserver =async()=>{
         try{
        let response =await fetch(`http://localhost:4500/data?_page=${pageNo}`);
        let data = await response.json()
         console.log(data)
           setTodo(data)
         }catch(e){
             console.log(e)
         }
     }
     useEffect(()=>{
         Todoserver()
     },[pageNo])
     const Newtodo =async(task)=>{
         console.log(task)
         try{
             let response=await fetch("http://localhost:4500/data",{
                 method:"POST",
                 headers:{"content-type":"application/json"},
                 body:JSON.stringify({
                     title:task
                 })
             })
             let data =await response.json()
                console.log(data)
               setTodo([data,...todo])
         }catch(e){
             console.log(e)
         }
        //  Newtodo()
     }
    return (
        <>
        <input className="b" type={"text"} value={task} placeholder="Write something" onChange={handal}></input>
        <button className="c" onClick={()=>Newtodo(task)}>save</button>
          <div>
          <button onClick={()=>{
          if(pageNo>1)
         setPage((pageNo-1))}}>previous</button>
         {pageNo}
             <button onClick={()=>setPage((pageNo+1))}>Next</button>
           </div>
        {todo.map(item=>{
            return <Todoitem key={item.id} data={item}/>
        })}
        </>
    )
}
export default TodoList