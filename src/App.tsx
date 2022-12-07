import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterTasksType = 'all' | 'active' | 'completed';

function App() {
    const TodoListPropsType_1: string = 'What to learn ?'

    let [tasks_1, setTasks_1] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML & CSS", isDone: false,},
        {id: v1(), title: "React", isDone: true,},
        {id: v1(), title: "JS", isDone: false,},
        {id: v1(), title: "JgS", isDone: false,},
    ])

    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false,}
        setTasks_1([...tasks_1, newTask])
    }

    const removeTasks = (id: string) => {
        setTasks_1(tasks_1.filter(t => t.id !== id))
    }

    let [filter, setFilter] = useState<FilterTasksType>('all')
    const changeFilter = (filter: FilterTasksType) => {
        setFilter(filter)
    }

    const filterFunction = (tasks_1: Array<TasksType>, filter: FilterTasksType) => {
        switch (filter) {
            case "active":
               return  tasks_1.filter(t => !t.isDone)

            case "completed":
                return tasks_1.filter(t => t.isDone)

            default:
               return tasks_1
        }

    }

    let filteredTasks = tasks_1
    filterFunction(tasks_1, filter)

// if(filter === 'active') {
//     filteredTasks =  tasks_1.filter(t => !t.isDone)
//     }  if(filter === 'completed') {
//         filteredTasks = tasks_1.filter(t => t.isDone)
//     }


    return (
        <div className="App">
            <TodoList tasks={filteredTasks} title={TodoListPropsType_1} changeFilter={changeFilter}
                      removeTasks={removeTasks} addTask={addTask}/>
        </div>
    );
}

export default App;


