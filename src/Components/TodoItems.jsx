function TodoItems({title,description,status}){
    return(
        <div>
            <h3>{`${title}-${description}-${status}`}</h3>
        </div>
    )
}
export default TodoItems;