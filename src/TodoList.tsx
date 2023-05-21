import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';



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

                    <Checkbox   checked={task.isDone} onChange={changeTaskStatus} />

                    <EditableSpan title={task.title} classes={taskClasses} changeTitle={changeTaskTitle}  />

                    <IconButton aria-label="delete" onClick={removeTask}>
                        <DeleteIcon  />
                    </IconButton>
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

                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <DeleteIcon  />
                </IconButton>
            </h2>
            <AddItemForm titleMaxLength={25} addItem={addTask} />

            {tasksList}


            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : "contained"} color="success" onClick={() => {
                    changeFilterButtonCreator('all')
                }}>All</Button>

                <Button variant={props.filter === 'active' ? 'outlined' : "contained"} color="secondary" onClick={() => {
                    changeFilterButtonCreator('active')
                }}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : "contained"} color="error" onClick={() => {
                    changeFilterButtonCreator('completed')
                }}>completed</Button>


            </div>
            <div></div>
        </div>

    );
};

export default TodoList;
