import React from 'react';
import './App.css';
import {TodoList} from './components/TodoList'

function App() {
  const task1=[
    { id: 1, title: "Hello world11111", isDone: true },
    { id: 2, title: "I am Happy11111", isDone: false },
    { id: 3, title: "Yo11111", isDone: false },
  ]
  const task2=[
    { id: 1, title: "Hello world222222", isDone: true },
    { id: 2, title: "I am Happy2222222", isDone: false },
    { id: 3, title: "Yo222222222", isDone: false },
  ]


  return (
      <div className="App">
        <TodoList title={'What to learn111'} tasks={task1}/>
        <TodoList title={'What to learn222'} tasks={task2}/>
        <TodoList title={'What to learn333'} tasks={task2}/>
      </div>
  );
}

export default App;
