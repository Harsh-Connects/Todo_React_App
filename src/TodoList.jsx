import { useState } from "react";
import {v4 as uuidv4} from "uuid";
export default function TodoList(){
    const [todos,setTodos]=useState([{task: "sample-task",id: uuidv4(),isDone: false}]);
    const [newTodo, setNewTodo] = useState("");

    const addNewTask=()=>{
        setTodos((prevTodos)=>{
            return [...prevTodos,{task: newTodo, id: uuidv4(),isDone: false}];
        });
        setNewTodo("");
    }
    const updateTodoValue=(event)=>{
        setNewTodo(event.target.value);
    }
    const deleteTodo=(id)=>{
        setTodos((prevTodos)=>{
            return prevTodos.filter((todo)=>todo.id!==id);
        });
    }

    const upperCaseAll=()=>{
        setTodos((prevTasks)=>{
            return prevTasks.map((todo)=>{
                return {...todo,task:todo.task.toUpperCase()};
            });
        });
    }
    const upperCaseTodo=(id)=>{
        setTodos((prevTasks)=>{
            return prevTasks.map((todo)=>{
                if(todo.id===id){
                    return {...todo,task:todo.task.toUpperCase()};
                }
                else{
                    return todo;
                }
            });
        });
    }
    const markAsDone=(id)=>{
        setTodos((prevTasks)=>{
            return prevTasks.map((todo)=>{
                if(todo.id===id){
                    return {...todo,isDone:!todo.isDone};
                }
                else{
                    return todo;
                }
            });
        });
    }
    const markAllAsDone=()=>{
        setTodos((prevTodos)=>{
            return prevTodos.map((todo)=>{
                return {...todo,isDone:true};
                });
            });
    }
    return (
        <>
            <input type="text" placeholder="Add the task" value={newTodo}  onChange={updateTodoValue} /><br /><br />
            <button onClick={addNewTask}>Add Task</button>
            <hr />
            <h1>Todo List</h1>
            <ul>
                {
                    todos.map((todo)=>(
                        <li key={todo.id} style={{marginBottom:"1rem"}}>
                            <span style={{textDecoration: todo.isDone ? "line-through" : "none"}}>{todo.task}</span>&nbsp; &nbsp;
                            <button onClick={()=>deleteTodo(todo.id)}>Delete</button>&nbsp;&nbsp;
                            <button onClick={()=>upperCaseTodo(todo.id)}>UpperCase Task</button>&nbsp;&nbsp;
                            <button onClick={() => markAsDone(todo.id)}>
                                    {todo.isDone ? "Mark as Undone" : "Mark as Done"}
                            </button>
                        </li>
                    ))
                }
            </ul>
            <br /><br />
            <button onClick={upperCaseAll}>Uppercase All Tasks</button><br /><br />
            <button onClick={markAllAsDone}>Mark Done to All</button>
            <br /><br />
            

        </>
    )
}