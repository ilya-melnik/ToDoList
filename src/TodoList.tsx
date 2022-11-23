import React from 'react';
import {FilterValueType, TasksType} from "./App";

type TasksForToDoList = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: number)=> void
    changeFilter: (filter:FilterValueType) => void
}

//dfasdfds
const TodoList = (props: TasksForToDoList) => {
    const tasksList = props.tasks.length
        ? <ul>{
            props.tasks.map((task: TasksType) => {
                return <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={()=>props.removeTask(task.id)}>x</button>
                    </li>

            })
        }</ul>
        : <span>Your list is empty </span>
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

                {tasksList}

            <div>
                <button onClick={()=> {props.changeFilter('all')}}>All</button>
                <button onClick={()=> {props.changeFilter('active')}}>Active</button>
                <button onClick={()=> {props.changeFilter('completed')}}>Completed</button>
            </div>
            <div></div>
        </div>

    );
};

export default TodoList;
