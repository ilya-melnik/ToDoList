import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import todoList from "./TodoList";
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid} from "@mui/material";
import Paper from '@mui/material/Paper';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
type TasksStateType = {
    [todoListId: string]: Array<TasksType>
}

function App() {

    //BLL

    const id_1 = v1()
    const id_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: id_1, title: 'What to learn ?', filter: 'all'},
        {id: id_2, title: 'What to buy ?', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [id_1]: [
            {id: v1(), title: "HTML & CSS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "JS", isDone: false},
        ],
        [id_2]: [
            {id: v1(), title: "HTML & CSS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "JS", isDone: false},
        ],

    })

    const removeTask = (taskID: string, todoListId: string) => {
        let tasksForUpdate: Array<TasksType> = tasks[todoListId]
        let copy = [...tasksForUpdate]
        let updateTasks = copy.filter(t => t.id !== taskID)
        let copyTasks = {...tasks}
        copyTasks[todoListId] = updateTasks
        setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskID)})

    }
    const addTask = (title: string, todoListId: string) => {
        // let taskForUpdate: Array<TasksType> = tasks[todoListId]
        // let newTask = {id: v1(), title, isDone: false,}
        // let updatedTasks = {newTask, ...taskForUpdate}
        // let copyTask = {...tasks }
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)

        let newTask = {id: v1(), title, isDone: false,}
        setTasks({
            ...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]
        })
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListId: string) => {
        // const taskForUpdate: Array<TasksType> = tasks[todoListId]
        // const upDatedTask = taskForUpdate.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = upDatedTask
        // setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    }
    const changeTaskTitle = (taskID: string, title: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskID ? {...t, title} : t)})
    }
    const changeTodoListFilter = (nextFilterValue: FilterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: nextFilterValue} : tl))
    }
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const getFilteredTasks = (filter: FilterValueType, tasks: TasksType[]) => {
        switch (filter) {
            case "completed":
                return tasks = tasks.filter(t => t.isDone)
            case "active":
                return tasks = tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }
    const addTodoList = (title: string) => {
        const newTodo: TodoListType = {
            id: v1(),
            title,
            filter: 'all',
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl))
    }

    const todoListsComponents = todoLists.map((tl) => {
            const filteredTask = getFilteredTasks(tl.filter, tasks[tl.id])
            return (
                <Grid item key={tl.id}>
                    <Paper elevation={5} style={{padding: '10px'}}>
                    <TodoList
                        todoListId={tl.id}
                        tasks={filteredTask}
                        title={tl.title} filter={tl.filter}
                        addTask={addTask}
                        removeTodoList={removeTodoList}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                    </Paper>
                </Grid>
            )
        }
    )


    return (
        <div className="App">
            <ButtonAppBar/>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm titleMaxLength={10} addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default App;


