import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const TodoListPropsType_1: string = 'What to learn ?'
    const TodoListPropsType_2: string = 'What to buy ?'
    const tasks_1: Array<TasksType> = [
        {id: 1, title: "HTML & CSS", isDone: false,},
        {id: 2, title: "React", isDone: true,},
        {id: 3, title: "JS", isDone: false,},

    ];
    const tasks_2: Array<TasksType> = [
        {id: 1, title: "Bread", isDone: true,},
        {id: 2, title: "Tomato", isDone: false,},
        {id: 3, title: "Nuts", isDone: true,},

    ];

    return (
        <div className="App">


            <TodoList tasks={tasks_1} title={TodoListPropsType_1}/>
            <TodoList tasks={tasks_2} title={TodoListPropsType_2}/>
        </div>
    );
}

export default App;


