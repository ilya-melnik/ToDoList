import React, {ChangeEvent, MouseEvent, KeyboardEvent, useState} from 'react';
import {FilterTasksType, TasksType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    changeFilter: (filter: FilterTasksType) => void
    removeTasks: (id: string) => void
    addTask: (title: string) => void
}


const TodoList = (props: TodoListPropsType) => {


    let tasksMaped = props.tasks.length ? props.tasks.map(t => <li><input type="checkbox"
                                                                          checked={t.isDone}/><span>{t.title}</span>
        <button onClick={() => props.removeTasks(t.id)}>x</button>
    </li>) : <span>Your list empty</span>


    const ValueCrietorFilter = (filter: FilterTasksType) => {
        props.changeFilter(filter)
    }


    let [title, setTitle] = useState<string>('')

    const getValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addNewTask = (e: MouseEvent<HTMLButtonElement>) => {
        props.addTask(title)
        setTitle('')
    }
    const addWithEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }

    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={getValue} onKeyDown={addWithEnter}/>
                <button onClick={addNewTask}>+</button>
            </div>

            <ul>
                {tasksMaped}

            </ul>
            <div>
                <div></div>
                <button onClick={() => ValueCrietorFilter('all')}>All</button>
                <button onClick={() => ValueCrietorFilter('active')}>Active</button>
                <button onClick={() => ValueCrietorFilter('completed')}>Completed</button>
            </div>
        </div>

    );
};

export default TodoList;
