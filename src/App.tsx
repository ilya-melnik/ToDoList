import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
    //BLL
    const todoListTitle: string = 'What to learn ?'

    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML & CSS", isDone: false,},
        {id: v1(), title: "React", isDone: true,},
        {id: v1(), title: "JS", isDone: false,},

    ])

    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false,}, ...tasks])
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((t) => t.id !== taskID))

    }

    const [filter, SetFilter] = useState<FilterValueType>('all')
    const changeFilter = (valueFilter: FilterValueType) => {
        SetFilter(valueFilter)
    }


    const getFilteredTask = (filter: FilterValueType, tasks: Array<TasksType>) => {
        switch (filter) {
            case "completed":
                return tasks = tasks.filter(t => t.isDone)
            case "active":
                return tasks = tasks.filter(t => !t.isDone)
            default:
                return tasks
        }


    }
    getFilteredTask(filter, tasks)

    return (
        <div className="App">


            <TodoList tasks={tasks}
                      title={todoListTitle}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />

        </div>
    );
}

export default App;


