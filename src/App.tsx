import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './components/todoList/TodoList'
import {v1} from "uuid";
import AddItemForm from "./components/addItemForm/AddItemForm";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: 'All'},
        {id: todolistID2, title: "What to bay", filter: 'All'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });

    const removeTask = (todoListID: string, id: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(f => f.id !== id)})
    }

    const addTask = (todoListID: string, title: string) => {
        let newTask = {id: v1(), title: title.trim(), isDone: true}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const changeStatus = (todoListID: string, idCheckBox: string, isDoneCheckBox: boolean) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(m => m.id === idCheckBox ? {...m, isDone: isDoneCheckBox} : m)
        })
    }

    const changeFilter = (todoListID: string, value: FilterValuesType) => {
        setTodolist(todoLists.map(m => m.id === todoListID ? {...m, filter: value} : m))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolist(todoLists.filter(f => f.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    const updateTask = (todoListID: string,id:string, title:string) => {
      setTasks({...tasks, [todoListID]:tasks[todoListID].map(m=>m.id ===id ? {...m, title:title}:m)})
    }

    const addTodolist = (title:string) => {
      let newTodolistID = v1()
        setTodolist([...todoLists, {id: newTodolistID, title: title, filter: 'All'}])
        setTasks({...tasks, [newTodolistID]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "React Book", isDone: true}
            ]})
    }

    const updateTodolist = (todolistID: string, title:string) => {
      setTodolist(todoLists.map(m=>m.id===todolistID ? {...m, title:title}: m))
    }

    return (
        <div className="App">
            <AddItemForm callBack={addTodolist}/>
            {
                todoLists.map(m => {
                    let newTaskFilter = tasks[m.id]

                    if (m.filter === 'Active') {
                        newTaskFilter = tasks[m.id].filter((f => f.isDone))
                    }

                    if (m.filter === 'Completed') {
                        newTaskFilter = tasks[m.id].filter(f => !f.isDone)
                    }

                    return (
                        <TodoList
                            key={m.id}
                            todoListID={m.id}
                            title={m.title}
                            tasks={newTaskFilter}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            filter={m.filter}
                            removeTodolist={removeTodolist}
                            updateTask={updateTask}
                            updateTodolist={updateTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
