import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList'
import {v1} from "uuid";



export type filterType = 'All' | 'Active' | 'Completed'

function App(props: any) {
    const [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ])

    const removeTask = (mId: string) => {
        setTasks(tasks.filter(f => f.id !== mId))
    }

    const addTask = (title:string) => {
      let newTask = {id: v1(), title: title.trim(), isDone: true}
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (idCheckBox:string, isDoneCheckBox:boolean) => {
      setTasks(tasks.map(m=>m.id === idCheckBox ? {...m, isDone: isDoneCheckBox}:m))
    }

    const [filter, setFilter] = useState<filterType>('All')

    const filterTasks = (value: filterType) => {
        setFilter(value)
    }
    let newTaskFilter = tasks

    if (filter === 'Active') {
        newTaskFilter = tasks.filter((f => f.isDone))
    }

    if (filter === 'Completed') {
        newTaskFilter = tasks.filter(f => !f.isDone)
    }


    return (
        <div className="App">
            <TodoList
                title={'What to learn111'}
                tasks={newTaskFilter}
                removeTask={removeTask}
                addTask={addTask}
                filterTasks={filterTasks}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
