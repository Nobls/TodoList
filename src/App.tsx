import React, {useState} from 'react';
import './App.css';
import {TodoList} from './components/TodoList'

export type filterType = 'All' | 'Active' | 'Completed'

function App(props:any) {
  const [tasks, setTasks]= useState([
      { id: 1, title: "HTML&CSS", isDone: true },
      { id: 2, title: "JS", isDone: true },
      { id: 3, title: "ReactJS", isDone: false },
  ])

    const removeTask = (mId:number) => {
      setTasks(tasks.filter(f=>f.id!== mId))
    }

    const [filter, setFilter] = useState<filterType>('All')

    const filterTasks = (value:filterType) => {
      setFilter(value)
    }
    let newTask = tasks

    if (filter==='Active'){
        newTask = tasks.filter((f=>f.isDone))
    }

    if (filter==='Completed'){
        newTask = tasks.filter(f=>!f.isDone)
    }


  return (
      <div className="App">
        <TodoList
            title={'What to learn111'}
            tasks={newTask}
            removeTask={removeTask}
            setFilter={setFilter}
        />

      </div>
  );
}

export default App;
