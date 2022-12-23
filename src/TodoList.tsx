import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksType} from "./App";

type TasksForToDoList = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}


const TodoList = (props: TasksForToDoList) => {
    const tasksList = props.tasks.length
        ? <ul>{
            props.tasks.map((task: TasksType) => {
                return <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={() => props.removeTask(task.id)}>x</button>
                </li>

            })
        }</ul>
        : <span>Your list is empty </span>

    let [title, setTitle] = useState('')
    const SetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const addTitle = () => {
        props.addTask(title)
        setTitle('')
    }
    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTitle()
        }
    }
    const changeFilterButtonCreator = (filter: FilterValueType) => () => props.changeFilter(filter)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onKeyDown={onEnterAddTask} onChange={SetLocalTitle}/>
                <button onClick={addTitle}>+</button>

            </div>

            {tasksList}

            <div>
                <button onClick={() => {
                    changeFilterButtonCreator('all')
                }}>All
                </button>
                <button onClick={() => {
                    changeFilterButtonCreator('active')
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilterButtonCreator('completed')
                }}>Completed
                </button>
            </div>
            <div></div>
        </div>

    );
};

export default TodoList;
