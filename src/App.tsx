import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './components/todoList/TodoList'
import {v1} from "uuid";

export type FilterValuesType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStatetype = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to learn", filter: 'All'},
        {id: todolistID2, title: "What to bay", filter: 'All'}
    ])

    let [tasks, setTasks] = useState<TasksStatetype>({
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
        setTodolist(todolists.map(m => m.id === todoListID ? {...m, filter: value} : m))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolist(todolists.filter(f => f.id !== todolistID))
        delete tasks[todolistID]
    }

    return (
        <div className="App">
            {
                todolists.map(m => {
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
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
