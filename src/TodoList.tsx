import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button} from "@mui/material";


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
    changeTaskTitle: (taskID: string, title:string, todoListId: string) => void
    changeTodoListTitle: ( title:string, todoListId: string)=> void
}

const TodoList = (props: TasksForToDoList) => {


    const addTask = (title: string) => props.addTask(title, props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)
    const tasksList = props.tasks.length
        ? <ul>{
            props.tasks.map((task: TasksType) => {
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)


                const changeTaskTitle = (title:string) => props.changeTaskTitle(task.id, title, props.todoListId)
                const removeTask = () => props.removeTask(task.id, props.todoListId)
                const taskClasses = task.isDone ? 'task-done': 'task'

                return <li key={task.id} className={task.isDone ? 'task-done' : ''}>
                    <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
                    <EditableSpan title={task.title} classes={taskClasses} changeTitle={changeTaskTitle}  />



                    <button onClick={removeTask}>x</button>
                </li>

            })
        }</ul>
        : <span>Your list is empty </span>


    const changeFilterButtonCreator = (filter: FilterValueType) => props.changeTodoListFilter(filter, props.todoListId)
    const removeTodoList = () => props.removeTodoList(props.todoListId)

    return (
        <div>
            <h2>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}  />
                <button onClick={removeTodoList}>x</button>
            </h2>
            <AddItemForm titleMaxLength={25} addItem={addTask} />

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
