import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValueType = 'all'|'active'|'completed'
function App() {
    //BLL
    const todoListTitle: string = 'What to learn ?'

    const [TasksForToDoList, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML & CSS", isDone: false,},
        {id: 2, title: "React", isDone: true,},
        {id: 3, title: "JS", isDone: false,},

    ])

    const removeTask = (taskID: number) => {
       setTasks(TasksForToDoList.filter((t)=>t.id !== taskID))

    }

    const [filter, SetFilter] = useState<FilterValueType>( 'all')
const changeFilter = (valueFilter: FilterValueType )=> {
        SetFilter(valueFilter)
    }

    let filteredTasks = TasksForToDoList
    if(filter === 'active'){
        filteredTasks = TasksForToDoList.filter(t => t.isDone === false)
    }
    if(filter === 'completed'){
        filteredTasks = TasksForToDoList.filter(t => t.isDone === true)
    }


    return (
        <div className="App">


            <TodoList tasks={filteredTasks}
                      title={todoListTitle}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;


