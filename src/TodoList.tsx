import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksType} from "./App";

type TasksForToDoList = {
    todoListId: string
    removeTodoList: (todoListID: string) => void

    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
}

const TodoList = (props: TasksForToDoList) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean>(false)

    const tasksList = props.tasks.length
        ? <ul>{
            props.tasks.map((task: TasksType) => {
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
                const removeTask = () => props.removeTask(task.id, props.todoListId)

                return <li key={task.id} className={task.isDone ? 'task-done' : ''}>
                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>

            })
        }</ul>
        : <span>Your list is empty </span>

    const SetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addTitle = () => {
        const trimmedTask = title.trim()
        if (trimmedTask) {
            props.addTask(title, props.todoListId)
        } else {
            setError(true)
        }
        setTitle('')

    }
    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTitle()
        }
    }
    const changeFilterButtonCreator = (filter: FilterValueType) => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input value={title} onKeyDown={onEnterAddTask} onChange={SetLocalTitle}
                       className={error ? 'input-error' : ''}/>
                <button onClick={addTitle}>+</button>
                {error ? <div style={{fontWeight: 'bold', color: 'red'}}>Please, enter task title</div> : ''}

            </div>

            {tasksList}



            <div>
                <button className={props.filter === 'all' ? 'btn-active' : ''} onClick={() => {
                    changeFilterButtonCreator('all')
                }}>All
                </button>
                <button className={props.filter === 'active' ? 'btn-active' : ''}
                        onClick={() => {
                            changeFilterButtonCreator('active')
                        }}>Active
                </button>
                <button className={props.filter === 'completed' ? 'btn-active' : ''}
                        onClick={() => {
                            changeFilterButtonCreator('completed')
                        }}>Completed
                </button>
            </div>
            <div></div>
        </div>

    );
};

export default TodoList;
