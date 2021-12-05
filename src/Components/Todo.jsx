import { useEffect, useState } from "react";
import TodoItems from "./TodoItems";
function Pagination({totalPage, onClickCallback, currentPage}){
    const pages = new Array(totalPage).fill(0).map((item,idx)=>idx+1===currentPage?<button style={{backgroundColor:"olive"}}>{idx+1}</button>:<button onClick={()=>onClickCallback(idx+1)} >{idx+1}</button>);
    return (
        <div>{pages}</div>
    )
}
function Todo(){
    const [data,setData] = useState([]);
    const [isLoading,setisLoading] = useState(true)
    const [isError,setisError] = useState(false)
    const [page,setpage] = useState(1)
    const [totalPage,settotalPage] = useState(null)
    function getUsers(page){
        return fetch(`http://localhost:3004/tasks?_page=${page}`)
        .then(res=>res.json())
    }
    function getPage(){
        return fetch(`http://localhost:3004/tasks`)
        .then(res=>res.json())
    }
    function handlePageChange(page){
        setpage(page)
    }
    useEffect(()=>{
        getUsers(page).then(res=>{
            setData(res)
            setisLoading(false);
            console.log(res.length);
        })
        .catch(()=>{
            setisError(true)
        })
    },[page])
    useEffect(()=>{
        getPage().then((res)=>{
            settotalPage(Math.ceil(res.length/10))
        })
    },[])
    return(
        <div>
            {isLoading?<h3>Loading...</h3>:isError?<h3>Error</h3>:data.map(item=><TodoItems key={item.id} title={item.title} description={item.description} status={item.status}/>)}
            <Pagination currentPage={page} totalPage={totalPage} onClickCallback={handlePageChange}/>
        </div>
    )
}
export default Todo;